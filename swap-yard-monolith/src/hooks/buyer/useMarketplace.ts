import { useState, useEffect, useCallback, useMemo } from "react";

export interface MarketplaceListing {
    id: string;
    name: string;
    price: number;
    condition: string;
    location: string | null;
    state: string | null;
    offersDelivery: boolean;
    category?: { id: string; name: string; image?: string | null };
    images: { url: string }[];
    seller: { id: string; firstname?: string; lastname?: string; image?: string | null };
    createdAt: string;
}

export function useMarketplace() {
    // Raw data from the backend
    const [rawListings, setRawListings] = useState<MarketplaceListing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Unified Filter State matching the Sidebar UI
    const [filters, setFilters] = useState({
        q: "",
        minPrice: 0,
        maxPrice: 1000000,
        state: "",
        categories: [] as string[],
        conditions: [] as string[],
        delivery: [] as string[],
        isVerified: false,
    });

    const [sortBy, setSortBy] = useState("Newest");
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;

    // 1. FETCH FROM BACKEND (Heavy lifting)
    const fetchListings = useCallback(async () => {
        setIsLoading(true);
        setError("");

        try {
            // We fetch a larger limit (e.g., 50) from the backend based on search/price/state
            // We omit category/condition here so we can multi-filter them locally.
            const queryParams = new URLSearchParams({
                limit: "50", 
                status: "AVAILABLE"
            });

            if (filters.q) queryParams.append("q", filters.q);
            if (filters.state) queryParams.append("state", filters.state);
            if (filters.minPrice > 0) queryParams.append("minPrice", filters.minPrice.toString());
            if (filters.maxPrice < 1000000) queryParams.append("maxPrice", filters.maxPrice.toString());

            const res = await fetch(`/api/listing?${queryParams.toString()}`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to fetch listings");

            setRawListings(data.items || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [filters.q, filters.state, filters.minPrice, filters.maxPrice]);

    // Debounce the backend fetch for typing/sliders
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchListings();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [fetchListings]);

    // 2. LOCAL FILTERING & SORTING (Fast UI updates)
    const processedListings = useMemo(() => {
        let result = [...rawListings];

        // Filter Categories
        if (filters.categories.length > 0) {
            result = result.filter(item => 
                item.category?.name && filters.categories.includes(item.category.name)
            );
        }

        // Filter Conditions
        if (filters.conditions.length > 0) {
            result = result.filter(item => filters.conditions.includes(item.condition));
        }

        // Filter Delivery
        if (filters.delivery.length > 0) {
            const wantsDelivery = filters.delivery.includes("Delivery Available");
            const wantsPickup = filters.delivery.includes("Pickup Only");
            
            if (wantsDelivery && !wantsPickup) {
                result = result.filter(item => item.offersDelivery === true);
            } else if (wantsPickup && !wantsDelivery) {
                result = result.filter(item => item.offersDelivery === false);
            }
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case "Price: Low to High": return a.price - b.price;
                case "Price: High to Low": return b.price - a.price;
                case "A-Z": return a.name.localeCompare(b.name);
                case "Oldest": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case "Newest": default: return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
        });

        return result;
    }, [rawListings, filters.categories, filters.conditions, filters.delivery, filters.isVerified, sortBy]);

    // 3. LOCAL PAGINATION
    const totalPages = Math.max(1, Math.ceil(processedListings.length / itemsPerPage));
    const paginatedListings = processedListings.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // Ensure we don't get stuck on an empty page if filters reduce the dataset
    useEffect(() => {
        if (page > totalPages) setPage(1);
    }, [totalPages, page]);

    // --- STATE SETTERS ---
    const updateFilter = (key: keyof typeof filters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPage(1);
    };

    const toggleArrayFilter = (key: "categories" | "conditions" | "delivery", value: string) => {
        setFilters(prev => {
            const arr = prev[key];
            const newArr = arr.includes(value) ? arr.filter(i => i !== value) : [...arr, value];
            return { ...prev, [key]: newArr };
        });
        setPage(1);
    };

    const clearAllFilters = () => {
        setFilters({
            q: "", minPrice: 0, maxPrice: 1000000, state: "",
            categories: [], conditions: [], delivery: [], isVerified: false
        });
        setPage(1);
    };

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency', currency: 'NGN', minimumFractionDigits: 0
        }).format(amount);
    };

    return {
        state: { 
            listings: paginatedListings, 
            totalResults: processedListings.length,
            isLoading, 
            error, 
            filters, 
            sortBy,
            page, 
            totalPages 
        },
        setters: { updateFilter, toggleArrayFilter, clearAllFilters, setSortBy, setPage },
        helpers: { formatPrice }
    };
}