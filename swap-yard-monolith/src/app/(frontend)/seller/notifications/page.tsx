"use client";

import { useState } from "react";
import { Package, MessageSquare, ShieldCheck, Info, CheckCircle2 } from "lucide-react";

// Mock Data
const INITIAL_NOTIFICATIONS = [
    {
        id: 1,
        type: "order",
        title: "New Order Received!",
        message: "Madam B just placed an order for 'Blender. Kenwood blender'. Please prepare it for shipping.",
        time: "2 minutes ago",
        unread: true,
        icon: Package,
        color: "bg-blue-100 text-[#3498DB]"
    },
    {
        id: 2,
        type: "message",
        title: "New Message from Sarah John",
        message: "Hi, I will come pick it up tomorrow. Is 10 AM okay?",
        time: "1 hour ago",
        unread: true,
        icon: MessageSquare,
        color: "bg-orange-100 text-[#EB3B18]"
    },
    {
        id: 3,
        type: "verification",
        title: "Account Verified Successfully",
        message: "Your identity verification has been approved. You now have the verified seller badge!",
        time: "Yesterday, 2:30 PM",
        unread: false,
        icon: ShieldCheck,
        color: "bg-green-100 text-[#2ECC71]"
    },
    {
        id: 4,
        type: "system",
        title: "Welcome to SwapYard!",
        message: "Welcome to the Seller's Hub. Start by posting your first listing to reach local buyers.",
        time: "Mon, 10:00 AM",
        unread: false,
        icon: Info,
        color: "bg-gray-100 text-gray-600"
    }
];

export default function SellerNotifications() {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 max-w-4xl">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Notifications</h2>
                    <p className="text-sm text-gray-500">
                        You have <span className="font-bold text-[#EB3B18]">{unreadCount} unread</span> messages
                    </p>
                </div>
                
                {unreadCount > 0 && (
                    <button 
                        onClick={markAllAsRead}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-bold transition-colors border border-gray-200"
                    >
                        <CheckCircle2 size={16} /> Mark all as read
                    </button>
                )}
            </div>

            {/* Notifications List */}
            <div className="flex flex-col gap-4">
                {notifications.length > 0 ? (
                    notifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                            <div 
                                key={notification.id} 
                                onClick={() => markAsRead(notification.id)}
                                className={`relative flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer ${
                                    notification.unread 
                                    ? "bg-blue-50/50 border-blue-100 hover:bg-blue-50" 
                                    : "bg-white border-gray-100 hover:bg-gray-50"
                                }`}
                            >
                                {/* Unread Indicator Dot */}
                                {notification.unread && (
                                    <div className="absolute top-6 right-6 w-2.5 h-2.5 bg-[#EB3B18] rounded-full shadow-sm"></div>
                                )}

                                {/* Icon */}
                                <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${notification.color}`}>
                                    <Icon size={20} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 pr-6">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`text-sm ${notification.unread ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                                            {notification.title}
                                        </h3>
                                    </div>
                                    <p className={`text-sm mb-2 leading-relaxed ${notification.unread ? 'text-gray-700' : 'text-gray-500'}`}>
                                        {notification.message}
                                    </p>
                                    <span className="text-xs font-medium text-gray-400">
                                        {notification.time}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Info className="text-gray-400" size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">You're all caught up!</h3>
                        <p className="text-gray-500 text-sm">You don't have any new notifications at the moment.</p>
                    </div>
                )}
            </div>

        </div>
    );
};