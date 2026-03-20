import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

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
    
    // --- NEW: Missing Form States ---
    const [category, setCategory] = useState("");
    const [deliveryOption, setDeliveryOption] = useState("");
    const [whatsappContact, setWhatsappContact] = useState("");
    const [phoneContact, setPhoneContact] = useState("");
    const [inAppMessaging, setInAppMessaging] = useState(true);
    
    // --- Image & UI State ---
    const [images, setImages] = useState<File[]>([]);

    // --- Submission & Modal State ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // --- HANDLERS ---
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
        setCategory("");
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

        if (!name || !description || !price || !condition || !category) {
            setError("Please fill in all required fields (Title, Description, Price, Category, Condition).");
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            
            // Map strings directly
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("condition", condition);
            formData.append("category", category); // Now sending category
            
            // Map booleans to strings for FormData
            formData.append("negotiable", isNegotiable.toString());
            
            // Map UI "DeliveryOption" string to DB "offersDelivery" boolean string
            const offersDelivery = deliveryOption === "Delivery Available" ? "true" : "false";
            formData.append("offersDelivery", offersDelivery);
            
            if (stateLocation) formData.append("state", stateLocation);
            if (town) formData.append("location", town); // Note: UI uses "town", DB uses "location"

            // Send contact preferences (if backend supports them)
            if (whatsappContact) formData.append("whatsappContact", whatsappContact);
            if (phoneContact) formData.append("phoneContact", phoneContact);

            images.forEach((image) => {
                formData.append("images", image);
            });

            const res = await fetch("/api/listing", {
                method: "POST",
                credentials:"include",
                // Do not set Content-Type header when sending FormData
                body: formData, 
            });

            const data = await res.json();

            if (!res.ok) {
                // If Zod validation failed on backend, show the first specific error
                if (data.errors) {
                    const firstError = Object.values(data.errors)[0];
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
            isNegotiable, images, category, deliveryOption, whatsappContact, phoneContact,
            inAppMessaging, isSubmitting, error, showSuccessModal
        },
        setters: {
            setName, setDescription, setPrice, setCondition, setStateLocation, 
            setTown, setIsNegotiable, setCategory, setDeliveryOption, setWhatsappContact,
            setPhoneContact, setInAppMessaging, setShowSuccessModal
        },
        refs: { fileInputRef },
        handlers: { handleImageChange, removeImage, resetForm, handleSubmit, router }
    };
}