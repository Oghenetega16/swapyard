"use client";

import { useState } from "react";
import { Upload, Lightbulb, ShieldCheck } from "lucide-react";

// Reusable Toggle Switch
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
        aria-label="Toggle button"
        type="button"
        onClick={onChange}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${checked ? 'bg-[#EB3B18]' : 'bg-gray-300'}`}
    >
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
);

export default function PostListingForm() {
    const [isNegotiable, setIsNegotiable] = useState(true);
    const [inAppMessaging, setInAppMessaging] = useState(true);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-[#002147] mb-8 hidden md:block">Upload Images from device</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                
                {/* LEFT COLUMN */}
                <div className="space-y-8">
                    <h2 className="text-xl font-bold text-[#002147] md:hidden">Upload Images from device</h2>
                    
                    {/* Image Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center h-72 hover:bg-gray-50 transition-colors">
                        <p className="text-sm text-gray-600 mb-1">Drag files here to upload</p>
                        <p className="text-xs text-gray-400 mb-6">Max of 6 images JPG/PNG<br/>only</p>
                        
                        <div className="flex items-center gap-4 w-full max-w-50 mb-6">
                            <div className="h-px bg-gray-300 flex-1"></div>
                            <span className="text-xs text-gray-400 font-medium">OR</span>
                            <div className="h-px bg-gray-300 flex-1"></div>
                        </div>

                        <button className="bg-[#EB3B18] text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-[#d13214] transition-colors shadow-sm">
                            <Upload size={18} />
                            Upload Images
                        </button>
                    </div>

                    {/* Category */}
                    <div>
                        <h3 className="text-xl font-bold text-[#002147] mb-4">Category</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="Item category" className="block text-sm text-gray-700 mb-1.5">Item Category</label>
                                <select id="Item category" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none">
                                    <option>Enter Item Category</option>
                                    <option>Furniture</option>
                                    <option>Electronics</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="Item condition" className="block text-sm text-gray-700 mb-1.5">Item Condition</label>
                                <select id="Item condition" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none">
                                    <option>Select Drop down</option>
                                    <option>New</option>
                                    <option>Used - Like New</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contact Preferences */}
                    <div>
                        <h3 className="text-xl font-bold text-[#002147] mb-4">Contact Preferences</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5">Whatsapp Contact</label>
                                <input type="text" placeholder="Enter Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5">Phone Contact</label>
                                <input type="text" placeholder="Enter Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm text-gray-700 font-medium">In app Messaging</span>
                                <Toggle checked={inAppMessaging} onChange={() => setInAppMessaging(!inAppMessaging)} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-8">
                    {/* Description */}
                    <div>
                        <h3 className="text-xl font-bold text-[#002147] mb-4">Description</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5">Item Title</label>
                                <input type="text" placeholder="Enter Item Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                            </div>
                            <div>
                                <textarea placeholder="Enter Item Description" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147] h-40 resize-none"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-1.5">Item Price</label>
                                <input type="text" placeholder="Enter Item Price" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm text-gray-700 font-medium">Negotiable</span>
                                <Toggle checked={isNegotiable} onChange={() => setIsNegotiable(!isNegotiable)} />
                            </div>
                        </div>
                    </div>

                    {/* Location & Delivery */}
                    <div>
                        <h3 className="text-xl font-bold text-[#002147] mb-4">Location & Delivery</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="State" className="block text-sm text-gray-700 mb-1.5">State</label>
                                <select id="State" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none">
                                    <option>Ogun</option>
                                    <option>Lagos</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="Town" className="block text-sm text-gray-700 mb-1.5">Town/City</label>
                                <select id="Town" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none">
                                    <option>Ijebu-Ode</option>
                                    <option>Ikeja</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="Delivery option" className="block text-sm text-gray-700 mb-1.5">Delivery Option</label>
                                <select id="Delivery option" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none">
                                    <option>Pick up Only</option>
                                    <option>Delivery Available</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Verification Banner */}
                    <div className="flex items-center justify-between bg-white mt-4 py-2">
                        <p className="text-sm text-gray-700 leading-tight">
                            Want more buyers to trust your listings<br/>Verified sellers get more messages
                        </p>
                        <button className="bg-[#002147] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#001733] transition-colors">
                            <ShieldCheck size={16} />
                            Get Verified
                        </button>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 space-y-4 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-[#EB3B18] text-white py-3.5 rounded-lg font-bold hover:bg-[#d13214] transition-colors">
                        Save Draft
                    </button>
                    <button className="bg-white text-[#EB3B18] border border-[#EB3B18] py-3.5 rounded-lg font-bold hover:bg-red-50 transition-colors">
                        Discard
                    </button>
                </div>
                <button className="w-full bg-[#EB3B18] text-white py-3.5 rounded-lg font-bold hover:bg-[#d13214] transition-colors">
                    Post Listing
                </button>
            </div>

            {/* Tip of the day */}
            <div className="mt-16 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={20} className="text-gray-900 fill-current" />
                    <h3 className="text-lg font-extrabold text-gray-900">Tip of the day</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm text-gray-700">
                    <div>
                        <p className="mb-3">Clear, well-lit images increase your chances of a sale!</p>
                        <p className="mb-2">Here's how:</p>
                        <ol className="list-decimal pl-4 space-y-2">
                            <li>Use natural light to highlight your product and avoid harsh shadows.</li>
                            <li>Take multiple angles to show all sides of the item.</li>
                            <li>Keep the background clean—a simple, neutral backdrop works best.</li>
                        </ol>
                    </div>
                    <div>
                        <ol className="list-decimal pl-4 space-y-2" start={4}>
                            <li>Be honest about imperfections and show them clearly.</li>
                            <li>If possible, show the item in context—like a sofa in a living room or a blender on a kitchen counter..</li>
                        </ol>
                        <p className="mt-4 italic">Bonus Tip! : Clear, honest photos help buyers trust you and make faster decisions. Take your time to showcase your items, and you'll see the results!</p>
                    </div>
                </div>
            </div>

        </div>
    );
};