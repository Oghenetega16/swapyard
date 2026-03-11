"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Pencil, Save, X } from "lucide-react";

// Reusable Toggle Component
const Toggle = ({ checked, onChange, ariaLabel }: { checked: boolean; onChange: () => void; ariaLabel: string }) => (
    <button
        type="button"
        onClick={onChange}
        aria-label={ariaLabel}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${checked ? 'bg-[#EB3B18]' : 'bg-gray-300'}`}
    >
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);

export default function SellerAccount() {
    // --- STATE: NOTIFICATION PREFERENCES ---
    const [notifyOrderConfirm, setNotifyOrderConfirm] = useState(true);
    const [notifyOrderStatus, setNotifyOrderStatus] = useState(false);
    const [notifyOrderDelivered, setNotifyOrderDelivered] = useState(true);
    const [notifyEmail, setNotifyEmail] = useState(false);

    // --- STATE: EDIT MODES ---
    const [editingSection, setEditingSection] = useState<string | null>(null);

    // --- STATE: FORM DATA ---
    const [formData, setFormData] = useState({
        firstName: "Olajide",
        lastName: "Mobilade",
        phone: "+ 234 678 890 007",
        email: "OlajjiM21@gmail.com",
        deliveryAddress: "123, Other Street Igando",
        stateCountry: "Lagos, Nigeria",
        bankName: "Guaranty Trust Bank",
        accountHolder: "Olajide Mobilade",
        accountNumber: "0123456767",
        accountType: "Savings"
    });

    // Handle Input Changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Mock Save Function
    const handleSave = async (section: string) => {
        console.log(`Saving ${section} data to backend:`, formData);
        setEditingSection(null);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 max-w-4xl">
            
            {/* Header / Avatar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12">
                <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50">
                        <Image src="https://i.pravatar.cc/150?img=47" alt="Olajide Mobilade" width={96} height={96} className="object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-white rounded-full">
                        <CheckCircle2 size={24} className="text-[#2ECC71] fill-white" />
                    </div>
                </div>
                <div className="text-center sm:text-left pt-2">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{formData.firstName} {formData.lastName}</h2>
                    <p className="text-sm text-gray-600 font-medium">Buyer & Seller</p>
                </div>
            </div>

            <div className="space-y-10">
                
                {/* 1. Personal Information */}
                <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                        <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                        {editingSection === 'personal' ? (
                            <div className="flex gap-2">
                                <button onClick={() => setEditingSection(null)} aria-label="Cancel editing personal info" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"><X size={14} /> Cancel</button>
                                <button onClick={() => handleSave('personal')} aria-label="Save personal info" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#002147] bg-[#002147] rounded-md text-xs font-medium text-white hover:bg-[#001733] transition-colors cursor-pointer"><Save size={14} /> Save</button>
                            </div>
                        ) : (
                            <button onClick={() => setEditingSection('personal')} aria-label="Edit personal info" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                Edit <Pencil size={12} />
                            </button>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <label htmlFor="firstName" className="block text-xs text-gray-500 mb-1">First Name</label>
                            {editingSection === 'personal' ? <input id="firstName" name="firstName" aria-label="First Name" placeholder="First Name" title="First Name" value={formData.firstName} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.firstName}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-xs text-gray-500 mb-1">Last Name</label>
                            {editingSection === 'personal' ? <input id="lastName" name="lastName" aria-label="Last Name" placeholder="Last Name" title="Last Name" value={formData.lastName} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.lastName}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-xs text-gray-500 mb-1">Phone number</label>
                            {editingSection === 'personal' ? <input id="phone" name="phone" aria-label="Phone number" placeholder="Phone number" title="Phone number" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.phone}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs text-gray-500 mb-1">Email Address</label>
                            {editingSection === 'personal' ? <input id="email" name="email" type="email" aria-label="Email Address" placeholder="Email Address" title="Email Address" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.email}</p>}
                        </div>
                    </div>
                </div>

                {/* 2. Address */}
                <div>
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-5">
                        <h3 className="text-lg font-bold text-gray-900">Address</h3>
                        {editingSection === 'address' ? (
                            <div className="flex gap-2">
                                <button onClick={() => setEditingSection(null)} aria-label="Cancel editing address" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"><X size={14} /> Cancel</button>
                                <button onClick={() => handleSave('address')} aria-label="Save address" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#002147] bg-[#002147] rounded-md text-xs font-medium text-white hover:bg-[#001733] transition-colors cursor-pointer"><Save size={14} /> Save</button>
                            </div>
                        ) : (
                            <button onClick={() => setEditingSection('address')} aria-label="Edit address" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                Edit <Pencil size={12} />
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <label htmlFor="deliveryAddress" className="block text-xs text-gray-500 mb-1">Delivery Address</label>
                            {editingSection === 'address' ? <input id="deliveryAddress" name="deliveryAddress" aria-label="Delivery Address" placeholder="Delivery Address" title="Delivery Address" value={formData.deliveryAddress} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.deliveryAddress}</p>}
                        </div>
                        <div>
                            <label htmlFor="stateCountry" className="block text-xs text-gray-500 mb-1">State/ Country</label>
                            {editingSection === 'address' ? <input id="stateCountry" name="stateCountry" aria-label="State/ Country" placeholder="State/ Country" title="State/ Country" value={formData.stateCountry} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.stateCountry}</p>}
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
                        {editingSection === 'payment' ? (
                            <div className="flex gap-2">
                                <button onClick={() => setEditingSection(null)} aria-label="Cancel editing payment info" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"><X size={14} /> Cancel</button>
                                <button onClick={() => handleSave('payment')} aria-label="Save payment info" className="flex items-center gap-1.5 px-3 py-1.5 border border-[#002147] bg-[#002147] rounded-md text-xs font-medium text-white hover:bg-[#001733] transition-colors cursor-pointer"><Save size={14} /> Save</button>
                            </div>
                        ) : (
                            <button onClick={() => setEditingSection('payment')} aria-label="Edit payment information" className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                Edit <Pencil size={12} />
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <label htmlFor="bankName" className="block text-xs text-gray-500 mb-1">Bank Name</label>
                            {editingSection === 'payment' ? <input id="bankName" name="bankName" aria-label="Bank Name" placeholder="Bank Name" title="Bank Name" value={formData.bankName} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.bankName}</p>}
                        </div>
                        <div>
                            <label htmlFor="accountHolder" className="block text-xs text-gray-500 mb-1">Account Holder Name</label>
                            {editingSection === 'payment' ? <input id="accountHolder" name="accountHolder" aria-label="Account Holder Name" placeholder="Account Holder Name" title="Account Holder Name" value={formData.accountHolder} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.accountHolder}</p>}
                        </div>
                        <div>
                            <label htmlFor="accountNumber" className="block text-xs text-gray-500 mb-1">Account Number</label>
                            {editingSection === 'payment' ? <input id="accountNumber" name="accountNumber" aria-label="Account Number" placeholder="Account Number" title="Account Number" value={formData.accountNumber} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.accountNumber}</p>}
                        </div>
                        <div>
                            <label htmlFor="accountType" className="block text-xs text-gray-500 mb-1">Account Type</label>
                            {editingSection === 'payment' ? <input id="accountType" name="accountType" aria-label="Account Type" placeholder="Account Type" title="Account Type" value={formData.accountType} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#002147]" /> : <p className="text-sm font-medium text-gray-900">{formData.accountType}</p>}
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
                            <Toggle ariaLabel="Toggle order confirmation notifications" checked={notifyOrderConfirm} onChange={() => { setNotifyOrderConfirm(!notifyOrderConfirm); handleSave('notifications'); }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 mb-1">Order Status Changed</p>
                                <p className="text-xs text-gray-500">You will be notified when a customer makes changes to the order</p>
                            </div>
                            <Toggle ariaLabel="Toggle order status notifications" checked={notifyOrderStatus} onChange={() => { setNotifyOrderStatus(!notifyOrderStatus); handleSave('notifications'); }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 mb-1">Order Delivered</p>
                                <p className="text-xs text-gray-500">You will be notified once the order is received</p>
                            </div>
                            <Toggle ariaLabel="Toggle order delivered notifications" checked={notifyOrderDelivered} onChange={() => { setNotifyOrderDelivered(!notifyOrderDelivered); handleSave('notifications'); }} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 mb-1">Email Notifications</p>
                                <p className="text-xs text-gray-500">Turn on email notifications to get updates through email</p>
                            </div>
                            <Toggle ariaLabel="Toggle email notifications" checked={notifyEmail} onChange={() => { setNotifyEmail(!notifyEmail); handleSave('notifications'); }} />
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