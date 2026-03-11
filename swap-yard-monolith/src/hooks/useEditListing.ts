// seller/edit-listing/[id]/hooks/useEditListing.ts
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useEditListing(listingId: string) {
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
    const [newImages, setNewImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<{url: string}[]>([]);
    const [category, setCategory] = useState("");
    const [inAppMessaging, setInAppMessaging] = useState(true);

    // Status State
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Fetch existing listing data on load
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(`/api/listing/${listingId}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Failed to fetch listing");

                const item = data.listing;
                setName(item.name);
                setDescription(item.description);
                setPrice(item.price.toString());
                setCondition(item.condition);
                setStateLocation(item.state || "");
                setTown(item.location || "");
                setIsNegotiable(item.negotiable);
                setExistingImages(item.images || []);
                
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (listingId) fetchListing();
    }, [listingId]);

    // Handlers
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            const combined = [...newImages, ...selectedFiles].slice(0, 6);
            setNewImages(combined);
        }
    };

    const removeNewImage = (indexToRemove: number) => {
        setNewImages(newImages.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !description || !price || !condition) {
            setError("Please fill in all required fields.");
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

            newImages.forEach((image) => {
                formData.append("images", image);
            });

            // Use PUT as defined in your backend
            const res = await fetch(`/api/listing/${listingId}`, {
                method: "PUT",
                body: formData, 
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Failed to update listing");

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
            isNegotiable, newImages, existingImages, category, inAppMessaging, 
            isLoading, isSubmitting, error, showSuccessModal
        },
        setters: {
            setName, setDescription, setPrice, setCondition, setStateLocation, 
            setTown, setIsNegotiable, setCategory, setInAppMessaging, setShowSuccessModal
        },
        refs: { fileInputRef },
        handlers: { handleImageChange, removeNewImage, handleSubmit, router }
    };
}