import { useState, useEffect, useMemo } from "react";

export interface SellerOrder {
    id: string; // OrderItem ID (for unique keys)
    rawOrderId: string; // Parent Order ID (needed for PATCH requests)
    displayOrderId: string; // Truncated for the UI
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
    const [isUpdating, setIsUpdating] = useState<string | null>(null); // Tracks which order is updating
    const [error, setError] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("Newest");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            // Hit the actual backend endpoint with the seller scope
            const res = await fetch("/api/orders?scope=seller&limit=50");
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to load orders");

            // The backend returns parent Orders, which contain an array of items.
            // We need to flatten this so each row in the table is an individual item.
            const flattenedOrders: SellerOrder[] = [];
            
            data.items.forEach((order: any) => {
                order.items.forEach((item: any) => {
                    flattenedOrders.push({
                        id: item.id || Math.random().toString(), // Fallback if OrderItem has no ID
                        rawOrderId: order.id,
                        displayOrderId: `#${order.id.slice(-6).toUpperCase()}`, // Keep it short for the UI
                        buyerName: `${order.buyer?.firstname || ''} ${order.buyer?.lastname || ''}`.trim() || 'Unknown Buyer',
                        itemName: item.listing?.name || 'Unknown Item',
                        condition: item.listing?.condition || 'UNKNOWN',
                        price: item.listing?.price || 0,
                        status: order.status,
                        createdAt: order.createdAt,
                    });
                });
            });

            setOrders(flattenedOrders);
        } catch (err: any) {
            setError(err.message || "An error occurred while fetching orders.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handler to update order status
    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            setIsUpdating(orderId);
            setError("");

            const res = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to update order");

            // Optimistically update the UI without needing to refetch everything
            setOrders(prev => prev.map(order => 
                order.rawOrderId === orderId ? { ...order, status: newStatus } : order
            ));

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsUpdating(null);
        }
    };

    // Local Search and Sort
    const filteredOrders = useMemo(() => {
        let result = [...orders];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(order => 
                order.itemName.toLowerCase().includes(query) ||
                order.buyerName.toLowerCase().includes(query) ||
                order.displayOrderId.toLowerCase().includes(query)
            );
        }

        result.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortBy === "Newest" ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [orders, searchQuery, sortBy]);

    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return {
        state: { orders: filteredOrders, isLoading, isUpdating, error, searchQuery, sortBy },
        setters: { setSearchQuery, setSortBy },
        handlers: { updateOrderStatus },
        helpers: { formatPrice }
    };
}