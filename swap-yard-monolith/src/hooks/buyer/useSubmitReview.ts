import { useState } from "react";

interface SubmitReviewParams {
    sellerId: string;
    existingReviewId?: string;
    initialRating?: number;
    initialComment?: string;
    onSuccess?: () => void;
}

export function useSubmitReview({ 
    sellerId, 
    existingReviewId, 
    initialRating = 5, 
    initialComment = "",
    onSuccess
}: SubmitReviewParams) {
    const [rating, setRating] = useState<number>(initialRating);
    const [comment, setComment] = useState(initialComment);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError("");
        setSuccessMsg("");
        
        if (!sellerId && !existingReviewId) {
            setError("Seller ID is missing.");
            return;
        }

        try {
            setIsSubmitting(true);

            const isEditing = !!existingReviewId;
            const url = isEditing ? `/api/review/${existingReviewId}` : `/api/review`;
            const method = isEditing ? "PUT" : "POST";

            const payload = isEditing 
                ? { rating, comment } 
                : { rating, comment, sellerId };

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                // Handle Zod validation errors
                if (data.errors) {
                    const firstError = Object.values(data.errors).flat()[0];
                    throw new Error(typeof firstError === "string" ? firstError : "Validation failed");
                }
                // Handle custom backend errors (like "You have already reviewed this seller")
                throw new Error(data.message || "Failed to submit review");
            }

            setSuccessMsg(isEditing ? "Review updated successfully!" : "Review posted successfully!");
            if (onSuccess) onSuccess();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (reviewId: string) => {
        if(!confirm("Are you sure you want to delete this review?")) return;
        
        try {
            setIsSubmitting(true);
            setError("");
            
            const res = await fetch(`/api/review/${reviewId}`, { method: "DELETE" });
            const data = await res.json();
            
            if(!res.ok) throw new Error(data.message || "Failed to delete review");
            
            if (onSuccess) onSuccess();
            
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        state: { rating, comment, isSubmitting, error, successMsg },
        setters: { setRating, setComment },
        handlers: { handleSubmit, handleDelete }
    };
}