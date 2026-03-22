import { useState, ChangeEvent, FormEvent } from "react";

interface KycFormData {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    dateOfBirth: string;
    businessName: string;
    vatNumber: string;
    ninNumber: string;
}

export function useSellerKyc() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Text inputs
    const [formData, setFormData] = useState<KycFormData>({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        dateOfBirth: "",
        businessName: "",
        vatNumber: "",
        ninNumber: ""
    });

    // File inputs
    const [files, setFiles] = useState({
        profilePicture: null as File | null,
        businessLicense: null as File | null,
        verifiedId: null as File | null
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileType: keyof typeof files) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [fileType]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        try {
            // Because we are sending files, we MUST use FormData, not JSON
            const submitData = new FormData();
            
            // Append all text fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value) submitData.append(key, value);
            });

            // Append all files if they exist
            if (files.profilePicture) submitData.append("profilePicture", files.profilePicture);
            if (files.businessLicense) submitData.append("businessLicense", files.businessLicense);
            if (files.verifiedId) submitData.append("verifiedId", files.verifiedId);

            const res = await fetch("/api/seller/kyc", {
                method: "POST",
                // Do NOT set Content-Type header; the browser sets it automatically with the boundary for FormData
                body: submitData
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to submit verification");

            setSuccess(true);
            alert("KYC documents submitted successfully for review!");
            
        } catch (err: any) {
            console.error("KYC Submit Error:", err);
            setError(err.message || "An error occurred during submission");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        files,
        isLoading,
        error,
        success,
        handleInputChange,
        handleFileChange,
        handleSubmit
    };
}