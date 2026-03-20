import { useState, useEffect, useMemo } from "react";

export interface SellerOrder {
    id: string; 
    orderId: string; 
    buyerName: string;
    itemName: string;
    condition: string;
    price: number;
    status: string; 
    createdAt: string;
}

export function useSellerOrders() {
    const [orders, setOrders] = useState<SellerOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Newest");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Endpoint the backend team will build
                const res = await fetch("/api/seller/orders");
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to load orders");

                setOrders(data.orders || []);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching orders.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Local Search and Sort
    const filteredOrders = useMemo(() => {
        let result = [...orders];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(order => 
                order.itemName.toLowerCase().includes(query) ||
                order.buyerName.toLowerCase().includes(query) ||
                order.orderId.toLowerCase().includes(query)
            );
        }

        result.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortBy === "Newest" ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [orders, searchQuery, sortBy]);

    // Format currency helper
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return {
        state: { orders: filteredOrders, isLoading, error, searchQuery, sortBy },
        setters: { setSearchQuery, setSortBy },
        helpers: { formatPrice }
    };
}