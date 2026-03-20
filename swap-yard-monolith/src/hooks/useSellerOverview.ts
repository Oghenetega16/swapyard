import { useState, useEffect } from "react";

export interface DashboardStats {
    totalSales: number;
    totalOrders: number;
    totalCustomers: number;
}

export interface RecentListing {
    id: string;
    name: string;
    price: number;
    category: string;
    condition: string;
    image: string | null;
}

export interface RecentOrder {
    id: string;
    orderId: string;
    buyerName: string;
    itemName: string;
    condition: string;
    price: number;
    status: string;
}

export function useSellerOverview() {
    const [stats, setStats] = useState<DashboardStats>({ totalSales: 0, totalOrders: 0, totalCustomers: 0 });
    const [recentListings, setRecentListings] = useState<RecentListing[]>([]);
    const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const res = await fetch("/api/seller/overview");
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to load dashboard data");

                setStats(data.stats || { totalSales: 0, totalOrders: 0, totalCustomers: 0 });
                setRecentListings(data.recentListings || []);
                setRecentOrders(data.recentOrders || []);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOverviewData();
    }, []);

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return {
        state: { stats, recentListings, recentOrders, isLoading, error },
        helpers: { formatPrice }
    };
}