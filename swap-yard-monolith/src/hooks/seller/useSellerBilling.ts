import { useState, useEffect, useMemo } from "react";

export interface Transaction {
    id: string;
    orderId: string;
    itemName: string;
    buyerName: string;
    date: string;
    amount: number;
    status: "PENDING" | "PROCESSING" | "PAID" | "FAILED" | "REVERSED" | "ON_HOLD";
}

export function useSellerBilling() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Newest");

    const [stats, setStats] = useState({
        totalSales: 0,
        pendingPayments: 0,
        totalEarned: 0
    });
    
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchBillingData = async () => {
            try {
                // Fetching from the new endpoint the backend team will build
                const res = await fetch("/api/seller/billing");
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to load billing data");

                setStats(data.stats || { totalSales: 0, pendingPayments: 0, totalEarned: 0 });
                setTransactions(data.transactions || []);
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBillingData();
    }, []);

    // Local Search and Sort logic
    const filteredTransactions = useMemo(() => {
        let result = [...transactions];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(t => 
                t.itemName.toLowerCase().includes(query) || 
                t.orderId.toLowerCase().includes(query) || 
                t.buyerName.toLowerCase().includes(query)
            );
        }

        result.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortBy === "Newest" ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [transactions, searchQuery, sortBy]);

    return {
        isLoading,
        error,
        stats,
        transactions: filteredTransactions,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy
    };
}