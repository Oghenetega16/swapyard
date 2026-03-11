// seller/store/hooks/useSellerStore.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface Listing {
    id: string;
    name: string;
    price: number;
    condition: string;
    status: string;
    category?: string; 
    views?: number;    
    images: { url: string }[];
}

export interface SellerProfile {
    firstName: string;
    lastName: string;
    bio: string;
    profileImageUrl: string | null;
}

export function useSellerStore() {
    const router = useRouter();
    const [listings, setListings] = useState<Listing[]>([]);
    const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null); 
    
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [error, setError] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        Promise.all([fetchStoreItems(), fetchSellerProfile()]).finally(() => {
            setIsLoading(false);
        });
    }, []);

    // NEW: Fetch Profile Data
    const fetchSellerProfile = async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (!res.ok) return;
            const data = await res.json();
            
            setSellerProfile({
                firstName: data.user.firstname || "",
                lastName: data.user.lastname || "",
                bio: data.user.bio || "",
                profileImageUrl: data.user.avatarUrl || null 
            });
        } catch (err) {
            console.error("Failed to fetch profile data for store header", err);
        }
    };

    const fetchStoreItems = async () => {
        try {
            setError("");
            const res = await fetch("/api/listing?limit=50");
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to fetch store items");

            setListings(data.items || []);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/seller/edit-listing/${id}`);
    };

    const confirmDelete = (id: string) => setItemToDelete(id);
    const cancelDelete = () => setItemToDelete(null);

    const executeDelete = async () => {
        if (!itemToDelete) return;

        try {
            setIsDeleting(true);
            setError("");

            const res = await fetch(`/api/listing/${itemToDelete}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to delete listing");
            }

            setListings(prev => prev.filter(item => item.id !== itemToDelete));
            setItemToDelete(null);

        } catch (err: any) {
            console.error("Delete error:", err);
            setError(err.message);
        } finally {
            setIsDeleting(false);
        }
    };

    const filteredItems = listings.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const mappedStatus = item.status === "AVAILABLE" ? "Active" : 
                            item.status === "SOLD" ? "Sold" : "Draft";
        const matchesStatus = statusFilter === "All" || mappedStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return {
        state: { 
            searchQuery, statusFilter, filteredItems, isLoading, 
            isDeleting, itemToDelete, error, sellerProfile 
        },
        setters: { setSearchQuery, setStatusFilter },
        handlers: { handleEdit, confirmDelete, cancelDelete, executeDelete },
        helpers: { formatPrice }
    };
}