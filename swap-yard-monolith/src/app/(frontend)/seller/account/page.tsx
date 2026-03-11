"use client";

import Image from "next/image";
import { CheckCircle2, Pencil, Save, X, Camera } from "lucide-react";
import { Toggle } from "@/components/seller/Toggle"; 
import { useSellerAccount } from "@/hooks/useSellerAccount";

export default function SellerAccount() {
    const { state, setters, refs, handlers } = useSellerAccount();

    if (state.isLoading) {
        return (
            <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147]"></div>
            </div>
        );
    }

    // Helper to get initials
    const getInitials = () => {
        const first = state.formData.firstName?.charAt(0) || "";
        const last = state.formData.lastName?.charAt(0) || "";
        return (first + last).toUpperCase() || "U";
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 max-w-4xl relative">
            
            {state.error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium" role="alert">
                    {state.error}
                </div>
            )}

            {/* Header / Avatar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
                <div className="relative shrink-0 group cursor-pointer" onClick={() => refs.fileInputRef.current?.click()}>
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 bg-[#002147] flex items-center justify-center text-white shadow-sm relative">
                        {state.profileImageUrl ? (
                            <Image 
                                src={state.profileImageUrl} 
                                alt={`${state.formData.firstName}'s Avatar`} 
                                fill 
                                className="object-cover" 
                            />
                        ) : (
                            <span className="text-3xl font-bold tracking-wider">{getInitials()}</span>
                        )}
                        
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={24} aria-hidden="true" />
                        </div>
                    </div>

                    <input 
                        type="file" 
                        ref={refs.fileInputRef} 
                        onChange={handlers.handleImageChange} 
                        accept="image/jpeg, image/png" 
                        className="hidden" 
                        aria-hidden="true"
                    />

                    <div className="absolute bottom-0 right-0 bg-white rounded-full">
                        <CheckCircle2 size={24} className="text-[#2ECC71] fill-white" aria-hidden="true" />
                    </div>
                </div>

                <div className="text-center sm:text-left pt-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{state.formData.firstName} {state.formData.lastName}</h2>
                    <p className="text-sm text-gray-600 font-medium mb-2">Buyer & Seller</p>
                    
                    <p className="text-xs text-gray-500 max-w-md hidden sm:block truncate">
                        {state.formData.bio || "No store description added."}
                    </p>
                </div>
            </div>

            <div className="space-y-10">
                
                {/* 1. Personal Information */}
                <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                        {state.editingSection === 'personal' ? (
                            <div className="flex gap-2">
                                <button onClick={() => setters.setEditingSection(null)} aria-label="Cancel editing personal info" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"><X size={14} /> Cancel</button>
                                <button disabled={state.isSaving} onClick={() => handlers.handleSave('personal')} aria-label="Save personal info" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#002147] bg-[#002147] rounded-md text-xs font-medium text-white hover:bg-[#001733] transition-colors cursor-pointer disabled:opacity-70"><Save size={14} /> {state.isSaving ? "Saving..." : "Save"}</button>
                            </div>
                        ) : (
                            <button onClick={() => setters.setEditingSection('personal')} aria-label="Edit personal info" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                Edit <Pencil size={12} />
                            </button>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <label htmlFor="firstName" className="block text-xs text-gray-500 mb-1">First Name</label>
                            {state.editingSection === 'personal' ? <input id="firstName" name="firstName" value={state.formData.firstName} onChange={handlers.handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{state.formData.firstName}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-xs text-gray-500 mb-1">Last Name</label>
                            {state.editingSection === 'personal' ? <input id="lastName" name="lastName" value={state.formData.lastName} onChange={handlers.handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{state.formData.lastName}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-xs text-gray-500 mb-1">Phone number</label>
                            {state.editingSection === 'personal' ? <input id="phone" name="phone" value={state.formData.phone} onChange={handlers.handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{state.formData.phone}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs text-gray-500 mb-1">Email Address</label>
                            <p className="text-sm font-medium text-gray-900 opacity-70">{state.formData.email}</p>
                        </div>
                    </div>

                    {/* NEW BIO FIELD */}
                    <div className="mt-6 pt-6 border-t border-gray-50">
                        <label htmlFor="bio" className="block text-xs text-gray-500 mb-2">Store Description / Bio</label>
                        {state.editingSection === 'personal' ? (
                            <textarea 
                                id="bio" 
                                name="bio" 
                                value={state.formData.bio} 
                                onChange={handlers.handleInputChange} 
                                placeholder="Tell buyers a little about yourself and what you sell..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147] min-h-25 resize-y"
                            />
                        ) : (
                            <p className="text-sm font-medium text-gray-900 leading-relaxed max-w-3xl">
                                {state.formData.bio || "No description added yet."}
                            </p>
                        )}
                    </div>
                </div>

                {/* 2. Address */}
                <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                        <h3 className="text-lg font-bold text-gray-900">Address</h3>
                        {state.editingSection === 'address' ? (
                            <div className="flex gap-2">
                                <button onClick={() => setters.setEditingSection(null)} aria-label="Cancel editing address" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"><X size={14} /> Cancel</button>
                                <button disabled={state.isSaving} onClick={() => handlers.handleSave('address')} aria-label="Save address" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#002147] bg-[#002147] rounded-md text-xs font-medium text-white hover:bg-[#001733] transition-colors cursor-pointer disabled:opacity-70"><Save size={14} /> {state.isSaving ? "Saving..." : "Save"}</button>
                            </div>
                        ) : (
                            <button onClick={() => setters.setEditingSection('address')} aria-label="Edit address" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                Edit <Pencil size={12} />
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <label htmlFor="deliveryAddress" className="block text-xs text-gray-500 mb-1">Delivery Address</label>
                            {state.editingSection === 'address' ? <input id="deliveryAddress" name="deliveryAddress" value={state.formData.deliveryAddress} onChange={handlers.handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{state.formData.deliveryAddress}</p>}
                        </div>
                        <div>
                            <label htmlFor="stateCountry" className="block text-xs text-gray-500 mb-1">State/ Country</label>
                            {state.editingSection === 'address' ? <input id="stateCountry" name="stateCountry" value={state.formData.stateCountry} onChange={handlers.handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{state.formData.stateCountry}</p>}
                        </div>
                    </div>
                </div>

                {/* 3. Security */}
                <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                        <h3 className="text-lg font-bold text-gray-900">Security</h3>
                        <button aria-label="Edit security settings" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                            Edit <Pencil size={12} />
                        </button>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Change your password</p>
                        <p className="text-sm font-medium text-gray-900">********</p>
                    </div>
                </div>

                {/* 4. Payment Information */}
                <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                        <h3 className="text-lg font-bold text-gray-900">Payment Information for automatic payouts</h3>
                        {state.editingSection === 'payment' ? (
                            <div className="flex gap-2">
                                <button onClick={() => setters.setEditingSection(null)} aria-label="Cancel editing payment info" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"><X size={14} /> Cancel</button>
                                <button disabled={state.isSaving} onClick={() => handlers.handleSave('payment')} aria-label="Save payment info" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#002147] bg-[#002147] rounded-md text-xs font-medium text-white hover:bg-[#001733] transition-colors cursor-pointer disabled:opacity-70"><Save size={14} /> {state.isSaving ? "Saving..." : "Save"}</button>
                            </div>
                        ) : (
                            <button onClick={() => setters.setEditingSection('payment')} aria-label="Edit payment information" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                Edit <Pencil size={12} />
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <label htmlFor="bankName" className="block text-xs text-gray-500 mb-1">Bank Name</label>
                            {state.editingSection === 'payment' ? <input id="bankName" name="bankName" value={state.formData.bankName} onChange={handlers.handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{state.formData.bankName}</p>}
                        </div>
                        <div>
                            <label htmlFor="accountHolder" className="block text-xs text-gray-500 mb-1">Account Holder Name</label>
                            {state.editingSection === 'payment' ? <input id="accountHolder" name="accountHolder" value={state.formData.accountHolder} onChange={handlers.handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{state.formData.accountHolder}</p>}
                        </div>
                        <div>
                            <label htmlFor="accountNumber" className="block text-xs text-gray-500 mb-1">Account Number</label>
                            {state.editingSection === 'payment' ? <input id="accountNumber" name="accountNumber" value={state.formData.accountNumber} onChange={handlers.handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{state.formData.accountNumber}</p>}
                        </div>
                        <div>
                            <label htmlFor="accountType" className="block text-xs text-gray-500 mb-1">Account Type</label>
                            {state.editingSection === 'payment' ? <input id="accountType" name="accountType" value={state.formData.accountType} onChange={handlers.handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{state.formData.accountType}</p>}
                        </div>
                    </div>
                </div>

                {/* 5. Notification Preferences */}
                <div>
                    <div className="border-b border-gray-100 pb-3 mb-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Notifications Preferences</h3>
                        <p className="text-sm text-gray-500">Modify how you receive notifications on the platform</p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 mb-1">Order Confirmation</p>
                                <p className="text-xs text-gray-500">You will be notified when a customer orders any product</p>
                            </div>
                            <Toggle ariaLabel="Toggle order confirmation notifications" checked={state.notifyOrderConfirm} onChange={() => { setters.setNotifyOrderConfirm(!state.notifyOrderConfirm); handlers.handleSave('notifications'); }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 mb-1">Order Status Changed</p>
                                <p className="text-xs text-gray-500">You will be notified when a customer makes changes to the order</p>
                            </div>
                            <Toggle ariaLabel="Toggle order status notifications" checked={state.notifyOrderStatus} onChange={() => { setters.setNotifyOrderStatus(!state.notifyOrderStatus); handlers.handleSave('notifications'); }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 mb-1">Order Delivered</p>
                                <p className="text-xs text-gray-500">You will be notified once the order is received</p>
                            </div>
                            <Toggle ariaLabel="Toggle order delivered notifications" checked={state.notifyOrderDelivered} onChange={() => { setters.setNotifyOrderDelivered(!state.notifyOrderDelivered); handlers.handleSave('notifications'); }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 mb-1">Email Notifications</p>
                                <p className="text-xs text-gray-500">Turn on email notifications to get updates through email</p>
                            </div>
                            <Toggle ariaLabel="Toggle email notifications" checked={state.notifyEmail} onChange={() => { setters.setNotifyEmail(!state.notifyEmail); handlers.handleSave('notifications'); }} />
                        </div>
                    </div>
                </div>

                {/* Delete Account */}
                <div className="pt-6">
                    <button aria-label="Delete Account" className="bg-[#EB3B18] hover:bg-[#d13214] text-white px-6 py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer">
                        Delete Account
                    </button>
                </div>

            </div>
        </div>
    );
}