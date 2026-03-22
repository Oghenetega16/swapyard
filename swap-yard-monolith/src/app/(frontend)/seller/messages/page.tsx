"use client";

import { Search, Send, Paperclip, MoreVertical, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useSellerMessages } from "@/hooks/seller/useSellerMessages";

export default function SellerMessages() {
    const { state, setters, handlers } = useSellerMessages();

    if (state.isLoadingChats) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center h-162.5">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147]"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row h-162.5">
            
            {/* LEFT PANE: Chat List */}
            <div className="w-full md:w-1/3 flex flex-col border-r border-gray-100 bg-white h-full shrink-0">
                {/* Header & Search */}
                <div className="p-4 md:p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#002147] mb-4">Messages</h2>
                    <div className="relative w-full">
                        <input 
                            type="text" 
                            placeholder="Search messages..." 
                            aria-label="Search messages"
                            value={state.searchQuery}
                            onChange={(e) => setters.setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} aria-hidden="true" />
                    </div>
                </div>

                {/* List of Conversations */}
                <div className="flex-1 overflow-y-auto">
                    {state.chats.length === 0 ? (
                        <div className="p-6 text-center text-sm text-gray-500">No conversations found.</div>
                    ) : (
                        state.chats.map((chat) => (
                            <button 
                                key={chat.id}
                                onClick={() => setters.setActiveChatId(chat.id)}
                                aria-label={`Open chat with ${chat.name}`}
                                className={`w-full flex items-start gap-3 p-4 border-b border-gray-50 transition-colors text-left hover:bg-gray-50 cursor-pointer ${
                                    state.activeChat?.id === chat.id ? "bg-gray-50 border-l-4 border-l-[#EB3B18]" : "border-l-4 border-l-transparent"
                                }`}
                            >
                                {/* Avatar */}
                                <div className="relative shrink-0">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[#002147] text-white flex items-center justify-center font-bold">
                                        {chat.avatar ? (
                                            <Image src={chat.avatar} alt={`Avatar for ${chat.name}`} width={48} height={48} className="object-cover h-full w-full" />
                                        ) : (
                                            chat.name.charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    {chat.unread > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-[#EB3B18] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>

                                {/* Chat Preview */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-sm font-bold text-gray-900 truncate pr-2">{chat.name}</h3>
                                        <span className={`text-xs whitespace-nowrap ${chat.unread > 0 ? 'text-[#EB3B18] font-bold' : 'text-gray-400'}`}>
                                            {chat.time}
                                        </span>
                                    </div>
                                    <p className={`text-sm truncate ${chat.unread > 0 ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
                                        {chat.lastMessage}
                                    </p>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* RIGHT PANE: Active Chat */}
            <div className="hidden md:flex w-2/3 flex-col bg-gray-50 h-full">
                
                {state.activeChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-20 px-6 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#002147] text-white flex items-center justify-center font-bold shrink-0">
                                    {state.activeChat.avatar ? (
                                        <Image src={state.activeChat.avatar} alt={`Avatar`} width={40} height={40} className="object-cover h-full w-full" />
                                    ) : (
                                        state.activeChat.name.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-gray-900">{state.activeChat.name}</h3>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        Online
                                    </div>
                                </div>
                            </div>
                            <button aria-label="More options" className="text-gray-400 hover:text-gray-600 p-2 cursor-pointer">
                                <MoreVertical size={20} aria-hidden="true" />
                            </button>
                        </div>

                        {/* Related Item Banner */}
                        <div className="bg-white/60 border-b border-gray-100 p-3 px-6 flex items-center gap-3 shrink-0 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded bg-gray-200 overflow-hidden relative shrink-0">
                                {state.activeChat.itemImage ? (
                                    <Image src={state.activeChat.itemImage} alt="Item" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <ImageIcon size={16} className="text-gray-400" aria-hidden="true" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium">Inquiring about:</p>
                                <p className="text-sm font-bold text-gray-900 truncate">{state.activeChat.item}</p>
                            </div>
                        </div>

                        {/* Message Thread Area */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                            {state.isLoadingMessages ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                                </div>
                            ) : state.messages.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                                    No messages yet. Say hi!
                                </div>
                            ) : (
                                state.messages.map((msg) => {
                                    const isMe = msg.sender === "me";
                                    return (
                                        <div key={msg.id} className={`flex flex-col max-w-[75%] ${isMe ? "self-end items-end" : "self-start items-start"}`}>
                                            <div 
                                                className={`px-4 py-2.5 rounded-2xl ${
                                                    isMe 
                                                    ? "bg-[#002147] text-white rounded-tr-sm" 
                                                    : "bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm"
                                                }`}
                                            >
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                            </div>
                                            <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                            {state.error && <p className="text-xs text-red-500 mb-2 px-2">{state.error}</p>}
                            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-2 py-2">
                                <button aria-label="Attach file" className="p-2 text-gray-400 hover:text-[#002147] transition-colors rounded-full hover:bg-gray-200 cursor-pointer">
                                    <Paperclip size={20} aria-hidden="true" />
                                </button>
                                
                                <input 
                                    type="text" 
                                    placeholder="Type a message..." 
                                    aria-label="Message input"
                                    value={state.messageInput}
                                    onChange={(e) => setters.setMessageInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handlers.handleSendMessage();
                                    }}
                                    className="flex-1 bg-transparent text-sm focus:outline-none text-gray-800 placeholder:text-gray-400"
                                />
                                
                                <button 
                                    onClick={handlers.handleSendMessage}
                                    aria-label="Send message"
                                    className={`p-2 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                                        state.messageInput.trim() 
                                        ? "bg-[#EB3B18] text-white hover:bg-[#d13214] cursor-pointer" 
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                                >
                                    <Send size={18} className={state.messageInput.trim() ? "translate-x-0.5" : ""} aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <Send size={48} className="mb-4 opacity-20" />
                        <p>Select a conversation to start messaging</p>
                    </div>
                )}
            </div>
        </div>
    );
}