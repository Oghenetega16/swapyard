import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export function usePostListing() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [condition, setCondition] = useState("");
    const [stateLocation, setStateLocation] = useState("");
    const [town, setTown] = useState("");
    const [isNegotiable, setIsNegotiable] = useState(false);
    
    // Image & UI State
    const [images, setImages] = useState<File[]>([]);
    const [category, setCategory] = useState("");
    const [inAppMessaging, setInAppMessaging] = useState(true);

    // Submission & Modal State
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
        setShowSuccessModal(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !description || !price || !condition) {
            setError("Please fill in all required fields (Title, Description, Price, Condition).");
            return;
        }

        try {
            setIsSubmitting(true);
            const formData = new FormData();
            
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("condition", condition);
            formData.append("negotiable", isNegotiable.toString());
            
            if (stateLocation) formData.append("state", stateLocation);
            if (town) formData.append("location", town);

            images.forEach((image) => {
                formData.append("images", image);
            });

            const res = await fetch("/api/listing", {
                method: "POST",
                credentials:"include",
                body: formData, 
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to post listing");
            }

            setShowSuccessModal(true);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Return everything the UI needs to render and interact
    return {
        state: {
            name, description, price, condition, stateLocation, town, 
            isNegotiable, images, category, inAppMessaging, 
            isSubmitting, error, showSuccessModal
        },
        setters: {
            setName, setDescription, setPrice, setCondition, setStateLocation, 
            setTown, setIsNegotiable, setCategory, setInAppMessaging, setShowSuccessModal
        },
        refs: { fileInputRef },
        handlers: { handleImageChange, removeImage, resetForm, handleSubmit, router }
    };
}