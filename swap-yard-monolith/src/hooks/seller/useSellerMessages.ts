import { useState, useEffect, useMemo } from "react";

export interface Chat {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    item: string;
    itemImage: string;
}

export interface Message {
    id: string;
    sender: "me" | "them";
    text: string;
    time: string;
}

// Fallback Mock Data while backend builds the endpoints
const MOCK_CHATS: Chat[] = [
    { id: "1", name: "Olajide Mobilade", avatar: "https://i.pravatar.cc/150?img=32", lastMessage: "Is the price negotiable?", time: "10:42 AM", unread: 2, item: "Blender. Kenwood blender", itemImage: "/assets/images/landing/electronics-1.jpg" },
    { id: "2", name: "Sarah John", avatar: "https://i.pravatar.cc/150?img=12", lastMessage: "I will come pick it up tomorrow.", time: "Yesterday", unread: 0, item: "White Leather Sofa", itemImage: "/assets/images/landing/furniture-1.jpg" },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
    "1": [
        { id: "m1", sender: "them", text: "Hi there! I'm interested in the Kenwood blender.", time: "10:30 AM" },
        { id: "m2", sender: "me", text: "Hello Olajide! Yes, it's still available. It's in great condition.", time: "10:35 AM" },
        { id: "m3", sender: "them", text: "Awesome. Does it come with all the extra milling cups?", time: "10:38 AM" },
        { id: "m4", sender: "me", text: "Yes, it includes the 2 milling attachments and the original box.", time: "10:40 AM" },
        { id: "m5", sender: "them", text: "Is the price negotiable?", time: "10:42 AM" },
    ],
    "2": [
        { id: "m6", sender: "them", text: "Is the sofa still available?", time: "Yesterday" },
        { id: "m7", sender: "me", text: "Yes it is!", time: "Yesterday" },
        { id: "m8", sender: "them", text: "I will come pick it up tomorrow.", time: "Yesterday" },
    ]
};

export function useSellerMessages() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    
    const [isLoadingChats, setIsLoadingChats] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [error, setError] = useState("");
    
    const [searchQuery, setSearchQuery] = useState("");
    const [messageInput, setMessageInput] = useState("");

    // 1. Fetch Chat List
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await fetch("/api/messages/conversations");
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to load chats");
                
                setChats(data.conversations || []);
                if (data.conversations?.length > 0) {
                    setActiveChatId(data.conversations[0].id);
                }
            } catch (err) {
                console.warn("Backend not ready, using mock chats.");
                setChats(MOCK_CHATS);
                setActiveChatId(MOCK_CHATS[0].id);
            } finally {
                setIsLoadingChats(false);
            }
        };

        fetchChats();
    }, []);

    // 2. Fetch Messages when active chat changes
    useEffect(() => {
        if (!activeChatId) return;

        const fetchMessages = async () => {
            setIsLoadingMessages(true);
            try {
                const res = await fetch(`/api/messages/${activeChatId}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.message);
                setMessages(data.messages || []);
            } catch (err) {
                console.warn("Backend not ready, using mock messages.");
                setMessages(MOCK_MESSAGES[activeChatId] || []);
            } finally {
                setIsLoadingMessages(false);
            }
        };

        fetchMessages();
    }, [activeChatId]);

    // 3. Send Message
    const handleSendMessage = async () => {
        if (!messageInput.trim() || !activeChatId) return;

        const newMsgText = messageInput.trim();
        setMessageInput(""); // Clear input immediately for UI responsiveness

        // Optimistic UI update
        const tempMsg: Message = {
            id: `temp-${Date.now()}`,
            sender: "me",
            text: newMsgText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            const res = await fetch(`/api/messages/${activeChatId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: newMsgText })
            });
            
            if (!res.ok) throw new Error("Failed to send message");
            
            // Optional: Replace temp ID with real ID from backend response here if needed
        } catch (err) {
            console.error("Failed to send:", err);
            // Revert optimistic update if failed
            setMessages(prev => prev.filter(m => m.id !== tempMsg.id));
            setMessageInput(newMsgText); // Put text back in input
            setError("Failed to send message. Please try again.");
        }
    };

    // Filter chats locally
    const filteredChats = useMemo(() => {
        if (!searchQuery) return chats;
        return chats.filter(chat => 
            chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.item.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [chats, searchQuery]);

    const activeChat = chats.find(c => c.id === activeChatId) || null;

    return {
        state: { 
            chats: filteredChats, 
            activeChat, 
            messages, 
            isLoadingChats, 
            isLoadingMessages, 
            error, 
            searchQuery, 
            messageInput 
        },
        setters: { setActiveChatId, setSearchQuery, setMessageInput },
        handlers: { handleSendMessage }
    };
}