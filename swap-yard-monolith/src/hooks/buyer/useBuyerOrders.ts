import { useState, useEffect } from "react";

export interface BuyerOrder {
    id: string; // The parent Order ID
    displayId: string;
    subtotal: number;
    deliveryFee: number;
    totalAmount: number;
    status: string;
    createdAt: string;
    items: {
        listingId: string;
        listingName: string;
        unitPrice: number;
        quantity: number;
        seller: { firstname: string; lastname: string };
    }[];
}

export function useBuyerOrders() {
    const [orders, setOrders] = useState<BuyerOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            // Scope is defaulted to "buyer" in your backend, but it's good to be explicit
            const res = await fetch("/api/orders?scope=buyer&limit=50");
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to load orders");

            // Format the orders for the UI
            const formattedOrders = data.items.map((order: any) => ({
                id: order.id,
                displayId: `#${order.id.slice(-6).toUpperCase()}`,
                subtotal: order.subtotal,
                deliveryFee: order.deliveryFee,
                totalAmount: order.totalAmount,
                status: order.status,
                createdAt: order.createdAt,
                items: order.items
            }));

            setOrders(formattedOrders);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: "COMPLETED" | "CANCELLED") => {
        if (!confirm(`Are you sure you want to mark this order as ${newStatus.toLowerCase()}?`)) return;

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

            // Optimistic UI update
            setOrders(prev => prev.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            ));

        } catch (err: any) {
            setError(err.message);
            alert(err.message);
        } finally {
            setIsUpdating(null);
        }
    };

    const helpers = {
        formatPrice: (amount: number) => {
            return new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
                minimumFractionDigits: 0
            }).format(amount);
        }
    };

    return {
        state: { orders, isLoading, isUpdating, error },
        handlers: { updateOrderStatus },
        helpers
    };
}