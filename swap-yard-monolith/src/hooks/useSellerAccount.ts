import { useState, useEffect, useRef } from "react";

export function useSellerAccount() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- STATE: UI CONTROL ---
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [editingSection, setEditingSection] = useState<string | null>(null);

    // --- STATE: NOTIFICATION PREFERENCES ---
    const [notifyOrderConfirm, setNotifyOrderConfirm] = useState(true);
    const [notifyOrderStatus, setNotifyOrderStatus] = useState(false);
    const [notifyOrderDelivered, setNotifyOrderDelivered] = useState(true);
    const [notifyEmail, setNotifyEmail] = useState(false);

    // --- STATE: PROFILE IMAGE ---
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

    // --- STATE: FORM DATA ---
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        bio: "", 
        deliveryAddress: "", 
        stateCountry: "",
        bankName: "",
        accountHolder: "",
        accountNumber: "",
        accountType: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to load profile");

                const user = data.user;
                // Safely extract nested seller account data
                const sellerAcc = user.sellerAccount || {};

                setFormData(prev => ({
                    ...prev,
                    firstName: user.firstname || "",
                    lastName: user.lastname || "",
                    phone: user.phoneNumber || "",
                    email: user.email || "",
                    bio: user.bio || "", 
                    stateCountry: user.state || "",
                    deliveryAddress: user.deliveryAddress || "",
                    
                    // Map the nested SellerAccount data
                    bankName: sellerAcc.bankName || "",
                    accountHolder: sellerAcc.accountName || `${user.firstname || ""} ${user.lastname || ""}`.trim(),
                    accountNumber: sellerAcc.accountNumber || "",
                    accountType: sellerAcc.accountType || "Savings" // Provide fallback if none exists
                }));

            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfileImageFile(file);
            setProfileImageUrl(URL.createObjectURL(file)); 
        }
    };

    const handleSave = async (section: string) => {
        if (section === 'notifications') {
            setEditingSection(null);
            // Note: Notification preferences will need a separate endpoint or payload update later
            return;
        }

        try {
            setIsSaving(true);
            setError("");

            // Ensure ALL form fields are sent to the backend, regardless of which section was edited
            const payload = {
                firstname: formData.firstName,
                lastname: formData.lastName,
                phoneNumber: formData.phone,
                state: formData.stateCountry,
                bio: formData.bio,
                deliveryAddress: formData.deliveryAddress,
                bankName: formData.bankName,
                accountHolder: formData.accountHolder,
                accountNumber: formData.accountNumber,
                accountType: formData.accountType
            };

            const res = await fetch("/api/auth/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Failed to save changes");
            }

            alert("Profile updated successfully!");
            setEditingSection(null);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to connect to backend");
        } finally {
            setIsSaving(false);
        }
    };

    return {
        state: {
            formData, isLoading, isSaving, error, editingSection,
            notifyOrderConfirm, notifyOrderStatus, notifyOrderDelivered, notifyEmail,
            profileImageUrl
        },
        setters: {
            setEditingSection, setNotifyOrderConfirm, setNotifyOrderStatus, 
            setNotifyOrderDelivered, setNotifyEmail
        },
        refs: { fileInputRef },
        handlers: {
            handleInputChange, handleSave, handleImageChange
        }
    };
}