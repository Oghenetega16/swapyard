"use client";

import { useEffect, useRef, useState } from "react";

export type EditingSection = "personal" | "address" | "payment" | "notifications" | null;

export type SellerAccountFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: "BUYER" | "SELLER" | "";
  bio: string;
  deliveryAddress: string;
  stateCountry: string;
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  accountType: "Savings" | "Current" | string;
};

const initialFormData: SellerAccountFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  role: "",
  bio: "",
  deliveryAddress: "",
  stateCountry: "",
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  accountType: "",
};

export function useSellerAccount() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE: UI CONTROL ---
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingSection, setEditingSection] = useState<EditingSection>(null);

  // --- STATE: NOTIFICATION PREFERENCES ---
  const [notifyOrderConfirm, setNotifyOrderConfirm] = useState(true);
  const [notifyOrderStatus, setNotifyOrderStatus] = useState(false);
  const [notifyOrderDelivered, setNotifyOrderDelivered] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(false);

  // --- STATE: PROFILE IMAGE ---
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  // --- STATE: FORM DATA ---
  const [formData, setFormData] = useState<SellerAccountFormData>(initialFormData);
  const [originalFormData, setOriginalFormData] = useState<SellerAccountFormData>(initialFormData);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setError("");
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load profile");
        }

        const user = data.user;
        const sellerAcc = user.sellerAccount || {};

        const nextFormData: SellerAccountFormData = {
          firstName: user.firstname || "",
          lastName: user.lastname || "",
          phone: user.phoneNumber || "",
          email: user.email || "",
          role: user.role || "",
          bio: user.bio || "",
          deliveryAddress: user.deliveryAddress || "",
          stateCountry: user.state || "",
          
          // Map the nested SellerAccount data
          bankName: sellerAcc.bankName || "",
          accountHolder: sellerAcc.accountName || `${user.firstname || ""} ${user.lastname || ""}`.trim(),
          accountNumber: sellerAcc.accountNumber || "",
          accountType: sellerAcc.accountType || "Savings",
        };

        setFormData(nextFormData);
        setOriginalFormData(nextFormData);
        setProfileImageUrl(user.image || null);
        
      } catch (err: any) {
        setError(err.message || "Failed to connect to backend");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (profileImageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  // --- HANDLERS ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    setProfileImageFile(file);

    if (profileImageUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(profileImageUrl);
    }

    setProfileImageUrl(URL.createObjectURL(file));
  };

  const handleCancelEdit = () => {
    setFormData(originalFormData);
    setError("");
    setSuccess("");
    setEditingSection(null);
  };

  const handleSave = async (section: EditingSection) => {
    if (!section) return;

    if (section === 'notifications') {
      setEditingSection(null);
      // Note: Notification preferences will need a separate endpoint or payload update later
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      // Send the complete payload mapped to the DB schema
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
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.errors) {
          const firstError = Object.values(data.errors).flat()[0];
          throw new Error(typeof firstError === "string" ? firstError : "Validation failed");
        }
        throw new Error(data.message || "Failed to save changes");
      }

      setOriginalFormData(formData); // Sync original data so cancel works correctly
      setSuccess("Profile updated successfully!");
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
      formData,
      originalFormData,
      isLoading,
      isSaving,
      error,
      success,
      editingSection,
      profileImageFile,
      profileImageUrl,
      notifyOrderConfirm, 
      notifyOrderStatus, 
      notifyOrderDelivered, 
      notifyEmail
    },
    setters: {
      setEditingSection,
      setFormData,
      setError,
      setSuccess,
      setNotifyOrderConfirm, 
      setNotifyOrderStatus, 
      setNotifyOrderDelivered, 
      setNotifyEmail
    },
    refs: { fileInputRef },
    handlers: {
      handleInputChange,
      handleSave,
      handleImageChange,
      handleCancelEdit,
    },
  };
}