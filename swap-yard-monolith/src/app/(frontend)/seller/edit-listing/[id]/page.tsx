// seller/edit-listing/[id]/page.tsx
"use client";

import { use } from "react";
import { Upload, X, Check, ArrowLeft, Info } from "lucide-react";
import { useEditListing } from "@/hooks/useEditListing";
import { Toggle } from "@/components/seller/Toggle";
import Image from "next/image";

export default function EditListingPage({ params }: { params: Promise<{ id: string }> }) {
    // Next 15+ unwrap params
    const resolvedParams = use(params);
    const { state, setters, refs, handlers } = useEditListing(resolvedParams.id);

    if (state.isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002147]"></div>
            </div>
        );
    }

    return (
        <>
            <form onSubmit={handlers.handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 w-full max-w-5xl mx-auto relative">
                
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        type="button" 
                        onClick={() => handlers.router.back()}
                        aria-label="Go back"
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-bold text-[#002147]">Edit Listing</h2>
                </div>
                
                {state.error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium" role="alert">
                        {state.error}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {/* LEFT COLUMN */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-[#002147]">Update Images</h3>
                            </div>
                            
                            {/* Image Replacement Warning */}
                            {state.existingImages.length > 0 && state.newImages.length === 0 && (
                                <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                                    <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                    <div className="text-xs text-blue-800 leading-relaxed">
                                        You currently have <strong>{state.existingImages.length} images</strong> saved. 
                                        Uploading new images will permanently replace your existing ones. Leave this blank to keep your current images.
                                    </div>
                                </div>
                            )}

                            <div 
                                onClick={() => refs.fileInputRef.current?.click()}
                                aria-label="Upload new images"
                                className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center h-64 hover:bg-gray-50 transition-colors cursor-pointer"
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
                                <p className="text-sm text-gray-600 mb-1">Click or drag files here to replace images</p>
                                <p className="text-xs text-gray-400 mb-6">Max of 6 images JPG/PNG</p>
                                
                                <button type="button" className="bg-[#EB3B18] text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-[#d13214] transition-colors shadow-sm cursor-pointer">
                                    <Upload size={18} aria-hidden="true" />
                                    Upload New Images
                                </button>
                            </div>

                            {/* Image Previews (New vs Existing) */}
                            {state.newImages.length > 0 ? (
                                <div className="mt-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">New Images to upload:</p>
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {state.newImages.map((img, idx) => (
                                            <div key={idx} className="relative w-16 h-16 shrink-0 rounded border border-gray-200 overflow-hidden">
                                                <img src={URL.createObjectURL(img)} alt={`New upload ${idx + 1}`} className="w-full h-full object-cover" />
                                                <button 
                                                    type="button"
                                                    aria-label="Close option"
                                                    onClick={(e) => { e.stopPropagation(); handlers.removeNewImage(idx); }}
                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-0.5 cursor-pointer"
                                                >
                                                    <X size={12} aria-hidden="true" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : state.existingImages.length > 0 ? (
                                <div className="mt-4">
                                    <p className="text-xs font-bold text-gray-500 uppercase mb-2">Currently saved images:</p>
                                    <div className="flex gap-2 overflow-x-auto pb-2 opacity-70">
                                        {state.existingImages.map((img, idx) => (
                                            <div key={idx} className="relative w-16 h-16 shrink-0 rounded border border-gray-200 overflow-hidden bg-gray-100">
                                                <Image src={img.url} alt={`Saved image ${idx + 1}`} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {/* Category */}
                        <div>
                            <h3 className="text-xl font-bold text-[#002147] mb-4">Category</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="category" className="block text-sm text-gray-700 mb-1.5">Item Category</label>
                                    <select id="category" value={state.category} onChange={(e) => setters.setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white cursor-pointer">
                                        <option value="">Enter Item Category</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Electronics">Electronics</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="condition" className="block text-sm text-gray-700 mb-1.5">Item Condition</label>
                                    <select id="condition" value={state.condition} onChange={(e) => setters.setCondition(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white cursor-pointer">
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
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-[#002147] mb-4">Description</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm text-gray-700 mb-1.5">Item Title</label>
                                    <input id="name" type="text" value={state.name} onChange={(e) => setters.setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                                </div>
                                <div>
                                    <label htmlFor="description" className="sr-only">Item Description</label>
                                    <textarea id="description" value={state.description} onChange={(e) => setters.setDescription(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147] h-40 resize-none"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="price" className="block text-sm text-gray-700 mb-1.5">Item Price</label>
                                    <input id="price" type="number" value={state.price} onChange={(e) => setters.setPrice(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm text-gray-700 font-medium">Negotiable</span>
                                    <Toggle ariaLabel="Toggle price negotiability" checked={state.isNegotiable} onChange={() => setters.setIsNegotiable(!state.isNegotiable)} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-[#002147] mb-4">Location & Delivery</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="State" className="block text-sm text-gray-700 mb-1.5">State</label>
                                    <select id="State" value={state.stateLocation} onChange={(e) => setters.setStateLocation(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white cursor-pointer">
                                        <option value="">Select State</option>
                                        <option value="Ogun">Ogun</option>
                                        <option value="Lagos">Lagos</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="Town" className="block text-sm text-gray-700 mb-1.5">Town/City</label>
                                    <select id="Town" value={state.town} onChange={(e) => setters.setTown(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147] bg-white cursor-pointer">
                                        <option value="">Select Town/City</option>
                                        <option value="Ijebu-Ode">Ijebu-Ode</option>
                                        <option value="Ikeja">Ikeja</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 space-y-4 max-w-2xl">
                    <button 
                        type="submit" 
                        disabled={state.isSubmitting}
                        className="w-full bg-[#002147] text-white py-3.5 rounded-lg font-bold hover:bg-[#001733] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {state.isSubmitting ? "Saving Changes..." : "Save Changes"}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => handlers.router.back()} 
                        className="w-full bg-white text-gray-700 border border-gray-300 py-3.5 rounded-lg font-bold hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {/* Success Modal */}
            {state.showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative text-center">
                        <div className="w-24 h-24 bg-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-[#2ECC71]/20">
                            <Check size={48} strokeWidth={4} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-8">
                            Changes saved successfully!
                        </h3>
                        <button 
                            onClick={() => handlers.router.push('/seller/store')} 
                            className="w-full bg-[#EB3B18] text-white py-3.5 rounded-lg font-bold hover:bg-[#d13214] transition-colors cursor-pointer"
                        >
                            Back to My Store
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}