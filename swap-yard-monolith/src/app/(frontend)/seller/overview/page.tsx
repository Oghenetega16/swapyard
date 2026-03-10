"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, ShoppingCart, Package } from "lucide-react";

export default function SellerOverview() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-[#002147] mb-6">Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {/* Total Sales */}
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Sales</p>
                        <p className="text-2xl font-extrabold text-gray-900">₦0.00</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white font-bold shrink-0">
                        ₦
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                        <p className="text-2xl font-extrabold text-gray-900">3</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white shrink-0">
                        <ShoppingCart size={16} />
                    </div>
                </div>

                {/* Customers */}
                <div className="bg-gray-50 rounded-xl p-5 flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Customers</p>
                        <p className="text-2xl font-extrabold text-gray-900">5</p>
                    </div>
                    <div className="h-8 w-8 bg-[#002147] rounded flex items-center justify-center text-white shrink-0">
                        <Package size={16} />
                    </div>
                </div>

                {/* Post New Listing Button */}
                <Link 
                    href="/seller/post-listing" 
                    className="bg-[#EB3B18] hover:bg-[#d13214] text-white rounded-xl p-5 flex items-center justify-center gap-2 transition-colors shadow-sm h-full"
                >
                    <Plus size={20} />
                    <span className="font-bold text-lg leading-tight text-center">Post New<br/>Listing</span>
                </Link>
            </div>

            {/* Posted Listings Section */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Posted Listings</h3>
                    <Link href="/seller/store" className="text-sm font-bold text-[#EB3B18] hover:underline">View All</Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Item 1 */}
                    <div className="flex gap-4 items-center">
                        <div className="h-24 w-24 relative rounded-lg overflow-hidden shrink-0 bg-gray-100">
                            <Image src="/assets/images/landing/electronics-1.jpg" alt="Blender" fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Electronics</p>
                            <p className="font-bold text-gray-900">₦54,000</p>
                            <p className="text-sm text-gray-800">Blender</p>
                            <p className="text-sm text-gray-500 truncate">Kenwood Blender (Good...)</p>
                            <p className="text-sm text-gray-500">Black</p>
                        </div>
                    </div>
                    {/* Item 2 */}
                    <div className="flex gap-4 items-center">
                        <div className="h-24 w-24 relative rounded-lg overflow-hidden shrink-0 bg-gray-100">
                            <Image src="/assets/images/landing/furniture-1.jpg" alt="Sofa" fill className="object-cover" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Furniture</p>
                            <p className="font-bold text-gray-900">₦54,000</p>
                            <p className="text-sm text-gray-800">Sofa</p>
                            <p className="text-sm text-gray-500 truncate">White Leather Sofa(Good...)</p>
                            <p className="text-sm text-gray-500">White</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order History Section */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Order History</h3>
                    <Link href="/seller/orders" className="text-sm font-bold text-[#EB3B18] hover:underline">View All</Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-200">
                        <thead>
                            <tr className="bg-[#002147] text-white text-sm">
                                <th className="px-4 py-3 rounded-tl-lg font-medium">Order ID</th>
                                <th className="px-4 py-3 font-medium">Item</th>
                                <th className="px-4 py-3 font-medium">Buyers</th>
                                <th className="px-4 py-3 font-medium">Item Condition</th>
                                <th className="px-4 py-3 font-medium">Price</th>
                                <th className="px-4 py-3 rounded-tr-lg font-medium">Order Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4">#12345</td>
                                <td className="px-4 py-4">Blender. Kenwood blender</td>
                                <td className="px-4 py-4">Madam B</td>
                                <td className="px-4 py-4">Used</td>
                                <td className="px-4 py-4 font-bold">₦50,000</td>
                                <td className="px-4 py-4">
                                    <span className="px-3 py-1 rounded text-blue-600 border border-blue-200 text-xs font-medium">Shipped</span>
                                </td>
                            </tr>
                            <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4">#12345</td>
                                <td className="px-4 py-4">Blender. Kenwood blender</td>
                                <td className="px-4 py-4">Sarah John</td>
                                <td className="px-4 py-4">Barely Used</td>
                                <td className="px-4 py-4 font-bold">₦40,000</td>
                                <td className="px-4 py-4">
                                    <span className="px-3 py-1 rounded text-yellow-600 border border-yellow-300 text-xs font-medium">In Progress</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4">#12345</td>
                                <td className="px-4 py-4">White Leather Funiture</td>
                                <td className="px-4 py-4">Emily Dada</td>
                                <td className="px-4 py-4">New</td>
                                <td className="px-4 py-4 font-bold">₦50,000</td>
                                <td className="px-4 py-4">
                                    <span className="px-3 py-1 rounded text-green-600 border border-green-300 text-xs font-medium">Delivered</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};