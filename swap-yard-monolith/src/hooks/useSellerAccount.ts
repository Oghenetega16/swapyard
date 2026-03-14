"use client";

import { useEffect, useRef, useState } from "react";

type EditingSection = "personal" | "address" | "payment" | null;

type SellerAccountFormData = {
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
  accountType: "Savings" | "Current" | "";
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

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingSection, setEditingSection] = useState<EditingSection>(null);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

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

        const nextFormData: SellerAccountFormData = {
          firstName: user.firstname || "",
          lastName: user.lastname || "",
          phone: user.phoneNumber || "",
          email: user.email || "",
          role: user.role || "",
          bio: user.bio || "",
          deliveryAddress: user.deliveryAddress || "",
          stateCountry: user.state || "",
          bankName: user.sellerAccount?.bankName || "",
          accountHolder: user.sellerAccount?.accountName || "",
          accountNumber: user.sellerAccount?.accountNumber || "",
          accountType: user.sellerAccount?.accountType || "",
        };

        setFormData(nextFormData);
        setOriginalFormData(nextFormData);
        setProfileImageUrl(user.image || null);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    return () => {
      if (profileImageUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

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

  const handleSave = async (section: Exclude<EditingSection, null>) => {
    try {
      setIsSaving(true);
      setError("");
      setSuccess("");

      let payload: Record<string, string> = {};

      if (section === "personal") {
        payload = {
          firstname: formData.firstName,
          lastname: formData.lastName,
          phoneNumber: formData.phone,
          email: formData.email,
          bio: formData.bio,
        };
      }

      if (section === "address") {
        payload = {
          deliveryAddress: formData.deliveryAddress,
          state: formData.stateCountry,
        };
      }

      if (section === "payment") {
        payload = {
          bankName: formData.bankName,
          accountName: formData.accountHolder,
          accountNumber: formData.accountNumber,
          accountType: formData.accountType,
        };
      }

      const res = await fetch("/api/auth/me", {
        method: "PATCH",
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

      const updatedUser = data.user;

      const nextFormData: SellerAccountFormData = {
        firstName: updatedUser.firstname || "",
        lastName: updatedUser.lastname || "",
        phone: updatedUser.phoneNumber || "",
        email: updatedUser.email || "",
        role: updatedUser.role || "",
        bio: updatedUser.bio || "",
        deliveryAddress: updatedUser.deliveryAddress || "",
        stateCountry: updatedUser.state || "",
        bankName: updatedUser.sellerAccount?.bankName || "",
        accountHolder: updatedUser.sellerAccount?.accountName || "",
        accountNumber: updatedUser.sellerAccount?.accountNumber || "",
        accountType: updatedUser.sellerAccount?.accountType || "",
      };

      setFormData(nextFormData);
      setOriginalFormData(nextFormData);
      setSuccess(data.message || "Profile updated successfully");
      setEditingSection(null);
    } catch (err: any) {
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
    },
    setters: {
      setEditingSection,
      setFormData,
      setError,
      setSuccess,
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