"use client";

import { CheckCircle2, FileText, Shield, Upload } from "lucide-react";

export default function SellerGetVerified() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10 w-full max-w-4xl">
            
            {/* Top Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 size={20} className="text-gray-900" aria-hidden="true" />
                        <h3 className="font-bold text-gray-900">Why Verify?</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Verification helps buyers trust you. Verified sellers get more views and faster responses. Build credibility and stand out from the crowd.
                    </p>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <FileText size={20} className="text-gray-900" aria-hidden="true" />
                        <h3 className="font-bold text-gray-900">What We Need?</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Just a quick ID check or phone number confirmation. We'll never share your info—it's just to keep things safe. It only takes 2 minutes.
                    </p>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Shield size={20} className="text-gray-900" aria-hidden="true" />
                        <h3 className="font-bold text-gray-900">Security Note</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Just a quick ID check or phone number confirmation. We'll never share your info—it's just to keep things safe. It only takes 2 minutes.
                    </p>
                </div>
            </div>

            <form className="space-y-10">
                {/* Personal Information */}
                <div className="space-y-5">
                    <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Personal Information</h3>
                    
                    <div>
                        <label htmlFor="fullName" className="block text-sm text-gray-700 mb-1.5">Full Name</label>
                        <input id="fullName" type="text" placeholder="Enter your Full Name" aria-label="Full Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                    </div>
                    <div>
                        <label htmlFor="emailAddress" className="block text-sm text-gray-700 mb-1.5">Email Address</label>
                        <input id="emailAddress" type="email" placeholder="Enter Email Address" aria-label="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm text-gray-700 mb-1.5">Phone Number</label>
                        <input id="phoneNumber" type="tel" placeholder="Enter Phone Number" aria-label="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm text-gray-700 mb-1.5">Date of Birth</label>
                        <input id="dateOfBirth" type="date" aria-label="Date of Birth" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1.5">Upload Profile Picture</label>
                        <button type="button" aria-label="Upload profile picture" className="w-full bg-[#374151] hover:bg-[#1f2937] text-white rounded-lg py-3.5 flex items-center justify-center gap-2 transition-colors text-sm font-medium cursor-pointer">
                            Upload <Upload size={16} aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Business Information */}
                <div className="space-y-5">
                    <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Business Information</h3>
                    
                    <div>
                        <label htmlFor="businessName" className="block text-sm text-gray-700 mb-1.5">Business Name</label>
                        <input id="businessName" type="text" placeholder="Enter Business Name" aria-label="Business Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                    </div>
                    <div>
                        <label htmlFor="vatNumber" className="block text-sm text-gray-700 mb-1.5">VAT Number</label>
                        <input id="vatNumber" type="text" placeholder="Enter VAT Number" aria-label="VAT Number" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1.5">Upload Business License</label>
                        <button type="button" aria-label="Upload business license" className="w-full bg-[#374151] hover:bg-[#1f2937] text-white rounded-lg py-3.5 flex items-center justify-center gap-2 transition-colors text-sm font-medium cursor-pointer">
                            Upload <Upload size={16} aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Identity Verification */}
                <div className="space-y-5">
                    <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Identity Verification</h3>
                    
                    <div>
                        <label htmlFor="ninNumber" className="block text-sm text-gray-700 mb-1.5">NIN</label>
                        <input id="ninNumber" type="text" placeholder="Enter NIN Number" aria-label="National Identification Number" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#002147]" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1.5">Upload any verified ID</label>
                        <button type="button" aria-label="Upload verified identification document" className="w-full bg-[#374151] hover:bg-[#1f2937] text-white rounded-lg py-3.5 flex items-center justify-center gap-2 transition-colors text-sm font-medium mb-2 cursor-pointer">
                            Upload <Upload size={16} aria-hidden="true" />
                        </button>
                        <p className="text-xs text-gray-500 flex items-center gap-1.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold" aria-hidden="true">!</span>
                            Document Review time: 24hours
                        </p>
                    </div>
                </div>

                {/* Footer / Submit */}
                <div className="pt-4">
                    <p className="text-center text-sm font-bold text-gray-900 mb-6">
                        You can still sell without verifying - But verified sellers get priority in search
                    </p>
                    <button type="submit" aria-label="Submit verification for review" className="w-full border border-[#EB3B18] text-[#EB3B18] bg-white rounded-lg py-3.5 font-bold hover:bg-red-50 transition-colors cursor-pointer">
                        Submit For Review
                    </button>
                </div>
            </form>

        </div>
    );
};