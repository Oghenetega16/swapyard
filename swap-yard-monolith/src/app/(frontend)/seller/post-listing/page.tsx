"use client";

import { Upload, Lightbulb, ShieldCheck, X, Check } from "lucide-react";
import { usePostListing } from "@/hooks/usePostListing";
import { Toggle } from "@/components/seller/Toggle";

export default function PostListingForm() {
    const { state, setters, refs, handlers } = usePostListing();

    return (
        <>
            <form onSubmit={handlers.handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 w-full max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-[#002147] mb-8 hidden md:block">Upload Images from device</h2>
                
                {state.error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium" role="alert">
                        {state.error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {/* LEFT COLUMN */}
                    <div className="space-y-8">
                        <h2 className="text-xl font-bold text-[#002147] md:hidden">Upload Images from device</h2>
                        
                        {/* Image Upload Area */}
                        <div>
                            <div 
                                onClick={() => refs.fileInputRef.current?.click()}
                                aria-label="Click to open file browser and upload images"
                                className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center h-72 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <input 
                                    type="file" 
                                    ref={refs.fileInputRef} 
                                    onChange={handlers.handleImageChange} 
                                    accept="image/jpeg, image/png" 
                                    multiple 
                                    className="hidden" 
                                    aria-hidden="true"
                                />
                                <p className="text-sm text-gray-600 mb-1">Click or drag files here to upload</p>
                                <p className="text-xs text-gray-400 mb-6">Max of 6 images JPG/PNG<br/>only</p>
                                
                                <div className="flex items-center gap-4 w-full max-w-50 mb-6">
                                    <div className="h-px bg-gray-300 flex-1"></div>
                                    <span className="text-xs text-gray-400 font-medium">OR</span>
                                    <div className="h-px bg-gray-300 flex-1"></div>
                                </div>

                                <button 
                                    type="button" 
                                    aria-label="Select images from your device"
                                    className="bg-[#EB3B18] text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-[#d13214] transition-colors shadow-sm cursor-pointer"
                                >
                                    <Upload size={18} aria-hidden="true" />
                                    Upload Images
                                </button>
                            </div>

                            {/* Image Previews */}
                            {state.images.length > 0 && (
                                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                                    {state.images.map((img, idx) => (
                                        <div key={idx} className="relative w-16 h-16 shrink-0 rounded border border-gray-200 overflow-hidden">
                                            <img src={URL.createObjectURL(img)} alt={`Upload preview ${idx + 1}`} className="w-full h-full object-cover" />
                                            <button 
                                                type="button" 
                                                aria-label="Remove uploaded image"
                                                onClick={(e) => { e.stopPropagation(); handlers.removeImage(idx); }}
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-0.5 cursor-pointer hover:bg-red-600 transition-colors"
                                            >
                                                <X size={12} aria-hidden="true" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div>
                            <h3 className="text-xl font-bold text-[#002147] mb-4">Category</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="category" className="block text-sm text-gray-700 mb-1.5">Item Category</label>
                                    <select 
                                        id="category" 
                                        value={state.category}
                                        onChange={(e) => setters.setCategory(e.target.value)}
                                        aria-label="Select item category"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none cursor-pointer"
                                    >
                                        <option value="">Enter Item Category</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Electronics">Electronics</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="condition" className="block text-sm text-gray-700 mb-1.5">Item Condition</label>
                                    <select 
                                        id="condition" 
                                        value={state.condition}
                                        onChange={(e) => setters.setCondition(e.target.value)}
                                        aria-label="Select item condition"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Drop down</option>
                                        <option value="NEW">New</option>
                                        <option value="FAIRLYNEW">Used - Like New</option>
                                        <option value="SECONDHAND">Second Hand</option>
                                        <option value="FAIR">Fair</option>
                                        <option value="GOOD">Good</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Contact Preferences */}
                        <div>
                            <h3 className="text-xl font-bold text-[#002147] mb-4">Contact Preferences</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="whatsappContact" className="block text-sm text-gray-700 mb-1.5">Whatsapp Contact</label>
                                    <input id="whatsappContact" type="text" placeholder="Enter Phone Number" aria-label="Whatsapp Contact Number" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                                </div>
                                <div>
                                    <label htmlFor="phoneContact" className="block text-sm text-gray-700 mb-1.5">Phone Contact</label>
                                    <input id="phoneContact" type="text" placeholder="Enter Phone Number" aria-label="Phone Contact Number" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm text-gray-700 font-medium">In app Messaging</span>
                                    <Toggle 
                                        ariaLabel="Toggle in-app messaging preference"
                                        checked={state.inAppMessaging} 
                                        onChange={() => setters.setInAppMessaging(!state.inAppMessaging)} 
                                    />
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
                                    <label htmlFor="name" className="block text-sm text-gray-700 mb-1.5">Item Title</label>
                                    <input 
                                        id="name"
                                        type="text" 
                                        value={state.name}
                                        onChange={(e) => setters.setName(e.target.value)}
                                        placeholder="Enter Item Name" 
                                        aria-label="Item Title"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description" className="sr-only">Item Description</label>
                                    <textarea 
                                        id="description"
                                        value={state.description}
                                        onChange={(e) => setters.setDescription(e.target.value)}
                                        placeholder="Enter Item Description" 
                                        aria-label="Item Description"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147] h-40 resize-none"
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm text-gray-700 mb-1.5">Item Price</label>
                                    <input 
                                        id="price"
                                        type="number" 
                                        value={state.price}
                                        onChange={(e) => setters.setPrice(e.target.value)}
                                        placeholder="Enter Item Price" 
                                        aria-label="Item Price"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" 
                                    />
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm text-gray-700 font-medium">Negotiable</span>
                                    <Toggle 
                                        ariaLabel="Toggle price negotiability"
                                        checked={state.isNegotiable} 
                                        onChange={() => setters.setIsNegotiable(!state.isNegotiable)} 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location & Delivery */}
                        <div>
                            <h3 className="text-xl font-bold text-[#002147] mb-4">Location & Delivery</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="State" className="block text-sm text-gray-700 mb-1.5">State</label>
                                    <select 
                                        id="State" 
                                        value={state.stateLocation}
                                        onChange={(e) => setters.setStateLocation(e.target.value)}
                                        aria-label="Select state location"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none cursor-pointer"
                                    >
                                        <option value="">Select State</option>
                                        <option value="Ogun">Ogun</option>
                                        <option value="Lagos">Lagos</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="Town" className="block text-sm text-gray-700 mb-1.5">Town/City</label>
                                    <select 
                                        id="Town" 
                                        value={state.town}
                                        onChange={(e) => setters.setTown(e.target.value)}
                                        aria-label="Select town or city"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none cursor-pointer"
                                    >
                                        <option value="">Select Town/City</option>
                                        <option value="Ijebu-Ode">Ijebu-Ode</option>
                                        <option value="Ikeja">Ikeja</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="Delivery option" className="block text-sm text-gray-700 mb-1.5">Delivery Option</label>
                                    <select 
                                        id="Delivery option" 
                                        aria-label="Select delivery option"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white appearance-none cursor-pointer"
                                    >
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
                            <button 
                                type="button" 
                                aria-label="Navigate to verification page"
                                className="bg-[#002147] text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#001733] transition-colors cursor-pointer"
                            >
                                <ShieldCheck size={16} aria-hidden="true" />
                                Get Verified
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-12 space-y-4 max-w-2xl">
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            type="button" 
                            aria-label="Save listing as draft"
                            className="bg-[#EB3B18] text-white py-3.5 rounded-lg font-bold hover:bg-[#d13214] transition-colors cursor-pointer"
                        >
                            Save Draft
                        </button>
                        <button 
                            type="button" 
                            aria-label="Discard listing changes"
                            onClick={handlers.resetForm} 
                            className="bg-white text-[#EB3B18] border border-[#EB3B18] py-3.5 rounded-lg font-bold hover:bg-red-50 transition-colors cursor-pointer"
                        >
                            Discard
                        </button>
                    </div>
                    <button 
                        type="submit" 
                        aria-label="Submit and post listing"
                        disabled={state.isSubmitting}
                        className="w-full bg-[#EB3B18] text-white py-3.5 rounded-lg font-bold hover:bg-[#d13214] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {state.isSubmitting ? "Posting Listing..." : "Post Listing"}
                    </button>
                </div>

                {/* Tip of the day */}
                <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                        <Lightbulb size={20} className="text-gray-900 fill-current" aria-hidden="true" />
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
            </form>

            {/* Custom Success Modal */}
            {state.showSuccessModal && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative text-center">
                        <button 
                            onClick={() => setters.setShowSuccessModal(false)} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-2 cursor-pointer"
                            aria-label="Close success modal"
                        >
                            <X size={24} aria-hidden="true" />
                        </button>

                        <div className="w-24 h-24 bg-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-[#2ECC71]/20">
                            <Check size={48} strokeWidth={4} className="text-white" aria-hidden="true" />
                        </div>

                        <h3 id="modal-title" className="text-xl font-bold text-gray-900 mb-8">
                            Congratulations, your item is now live
                        </h3>

                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={handlers.resetForm} 
                                aria-label="Post another item"
                                className="w-full bg-[#EB3B18] text-white py-3.5 rounded-lg font-bold hover:bg-[#d13214] transition-colors shadow-sm cursor-pointer"
                            >
                                Post another Item
                            </button>
                            <button 
                                onClick={() => handlers.router.push('/seller/overview')} 
                                aria-label="Go to seller dashboard overview"
                                className="w-full bg-white text-[#EB3B18] border border-[#EB3B18] py-3.5 rounded-lg font-bold hover:bg-red-50 transition-colors cursor-pointer"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}