import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface Category {
    id: string; // The CUID
    name: string;
}

export function usePostListing() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Form State ---
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [condition, setCondition] = useState("");
    const [stateLocation, setStateLocation] = useState("");
    const [town, setTown] = useState("");
    const [isNegotiable, setIsNegotiable] = useState(false);
    
    // --- NEW: Category & Contact States ---
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState("");
    const [deliveryOption, setDeliveryOption] = useState("");
    const [whatsappContact, setWhatsappContact] = useState("");
    const [phoneContact, setPhoneContact] = useState("");
    const [inAppMessaging, setInAppMessaging] = useState(true);
    
    // --- Image & UI State ---
    const [images, setImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Fetch dynamic categories on mount so we can send valid CUIDs
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Assuming you have a category endpoint. Adjust URL if needed.
                const res = await fetch("/api/category");
                const data = await res.json();
                if (res.ok) {
                    setCategories(data.categories || data.items || []);
                }
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const combined = [...images, ...selectedFiles].slice(0, 6);
            setImages(combined);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const resetForm = () => {
        setName("");
        setDescription("");
        setPrice("");
        setCondition("");
        setStateLocation("");
        setTown("");
        setIsNegotiable(false);
        setImages([]);
        setCategoryId("");
        setDeliveryOption("");
        setWhatsappContact("");
        setPhoneContact("");
        setInAppMessaging(true);
        setShowSuccessModal(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !description || !price || !condition || !categoryId) {
            setError("Please fill in all required fields (Title, Description, Price, Category, Condition).");
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            
            // Map exact fields matching your backend schema.ts
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("condition", condition);
            formData.append("categoryId", categoryId); 
            formData.append("negotiable", isNegotiable.toString());
            
            const offersDelivery = deliveryOption === "Delivery Available" ? "true" : "false";
            formData.append("offersDelivery", offersDelivery);
            
            if (stateLocation) formData.append("state", stateLocation);
            if (town) formData.append("location", town);

            // Consolidate contacts into the single 'contact' field expected by schema
            const finalContact = phoneContact || whatsappContact;
            if (finalContact) formData.append("contact", finalContact);

            images.forEach((image) => {
                formData.append("images", image);
            });

            const res = await fetch("/api/listing", {
                method: "POST",
                body: formData, 
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    const firstError = Object.values(data.errors).flat()[0];
                    throw new Error(firstError ? String(firstError) : "Validation failed");
                }
                throw new Error(data.message || "Failed to post listing");
            }

            setShowSuccessModal(true);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        state: {
            name, description, price, condition, stateLocation, town, 
            isNegotiable, images, categoryId, categories, deliveryOption, whatsappContact, phoneContact,
            inAppMessaging, isSubmitting, error, showSuccessModal
        },
        setters: {
            setName, setDescription, setPrice, setCondition, setStateLocation, 
            setTown, setIsNegotiable, setCategoryId, setDeliveryOption, setWhatsappContact,
            setPhoneContact, setInAppMessaging, setShowSuccessModal
        },
        refs: { fileInputRef },
        handlers: { handleImageChange, removeImage, resetForm, handleSubmit, router }
    };
}