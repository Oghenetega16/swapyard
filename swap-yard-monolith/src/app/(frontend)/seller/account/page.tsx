"use client";

import Image from "next/image";
import { CheckCircle2, Pencil, Save, X, Camera } from "lucide-react";
import { useSellerAccount } from "@/hooks/useSellerAccount";

export default function SellerAccount() {
  const { state, setters, refs, handlers } = useSellerAccount();

  if (state.isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#002147]" />
      </div>
    );
  }

  const getInitials = () => {
    const first = state.formData.firstName?.charAt(0) || "";
    const last = state.formData.lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  const fullName =
    `${state.formData.firstName} ${state.formData.lastName}`.trim() || "Unauthorized";

  return (
    <div className="relative max-w-4xl rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:p-10">
      {state.error && (
        <div
          className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-600"
          role="alert"
        >
          {state.error}
        </div>
      )}

      {state.success && (
        <div
          className="mb-6 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-700"
          role="status"
        >
          {state.success}
        </div>
      )}

      <div className="mb-12 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div
          className="group relative shrink-0 cursor-pointer"
          onClick={() => refs.fileInputRef.current?.click()}
        >
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-gray-50 bg-[#002147] text-white shadow-sm">
            {state.profileImageUrl ? (
              <Image
                src={state.profileImageUrl}
                alt={`${fullName}'s Avatar`}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-3xl font-bold tracking-wider">{getInitials()}</span>
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="text-white" size={24} aria-hidden="true" />
            </div>
          </div>

          <input
            type="file"
            ref={refs.fileInputRef}
            onChange={handlers.handleImageChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            aria-hidden="true"
          />

          <div className="absolute bottom-0 right-0 rounded-full bg-white">
            <CheckCircle2 size={24} className="fill-white text-[#2ECC71]" aria-hidden="true" />
          </div>
        </div>

        <div className="pt-2 text-center sm:text-left">
          <h2 className="mb-1 text-xl font-bold text-gray-900">{fullName}</h2>
          <p className="mb-2 text-sm font-medium text-gray-600">
            {state.formData.role === "SELLER" ? "Seller" : "Buyer"}
          </p>

          <p className="hidden max-w-md truncate text-xs text-gray-500 sm:block">
            {state.formData.bio || "No store description added."}
          </p>
        </div>
      </div>

      <div className="space-y-10">
        <div>
          <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
            {state.editingSection === "personal" ? (
              <div className="flex gap-2">
                <button
                  onClick={handlers.handleCancelEdit}
                  aria-label="Cancel editing personal info"
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <X size={14} /> Cancel
                </button>
                <button
                  disabled={state.isSaving}
                  onClick={() => handlers.handleSave("personal")}
                  aria-label="Save personal info"
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#002147] bg-[#002147] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#001733] disabled:opacity-70"
                >
                  <Save size={14} /> {state.isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setters.setEditingSection("personal")}
                aria-label="Edit personal info"
                className="flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Edit <Pencil size={12} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-xs text-gray-500">
                First Name
              </label>
              {state.editingSection === "personal" ? (
                <input
                  id="firstName"
                  name="firstName"
                  value={state.formData.firstName}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.firstName || "—"}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="mb-1 block text-xs text-gray-500">
                Last Name
              </label>
              {state.editingSection === "personal" ? (
                <input
                  id="lastName"
                  name="lastName"
                  value={state.formData.lastName}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.lastName || "—"}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-xs text-gray-500">
                Phone number
              </label>
              {state.editingSection === "personal" ? (
                <input
                  id="phone"
                  name="phone"
                  value={state.formData.phone}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.phone || "—"}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-xs text-gray-500">
                Email Address
              </label>
              {state.editingSection === "personal" ? (
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={state.formData.email}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.email || "—"}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-gray-50 pt-6">
            <label htmlFor="bio" className="mb-2 block text-xs text-gray-500">
              Store Description / Bio
            </label>
            {state.editingSection === "personal" ? (
              <textarea
                id="bio"
                name="bio"
                value={state.formData.bio}
                onChange={handlers.handleInputChange}
                placeholder="Tell buyers a little about yourself and what you sell..."
                className="min-h-25 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
              />
            ) : (
              <p className="max-w-3xl leading-relaxed text-sm font-medium text-gray-900">
                {state.formData.bio || "No description added yet."}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-900">Address</h3>
            {state.editingSection === "address" ? (
              <div className="flex gap-2">
                <button
                  onClick={handlers.handleCancelEdit}
                  aria-label="Cancel editing address"
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <X size={14} /> Cancel
                </button>
                <button
                  disabled={state.isSaving}
                  onClick={() => handlers.handleSave("address")}
                  aria-label="Save address"
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#002147] bg-[#002147] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#001733] disabled:opacity-70"
                >
                  <Save size={14} /> {state.isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setters.setEditingSection("address")}
                aria-label="Edit address"
                className="flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Edit <Pencil size={12} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="deliveryAddress" className="mb-1 block text-xs text-gray-500">
                Delivery Address
              </label>
              {state.editingSection === "address" ? (
                <input
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={state.formData.deliveryAddress}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.deliveryAddress || "—"}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="stateCountry" className="mb-1 block text-xs text-gray-500">
                State/ Country
              </label>
              {state.editingSection === "address" ? (
                <input
                  id="stateCountry"
                  name="stateCountry"
                  value={state.formData.stateCountry}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.stateCountry || "—"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-900">Security</h3>
            <button
              aria-label="Edit security settings"
              className="flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              Edit <Pencil size={12} />
            </button>
          </div>

          <div>
            <p className="mb-1 text-xs text-gray-500">Change your password</p>
            <p className="text-sm font-medium text-gray-900">********</p>
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-gray-900">
              Payment Information for automatic payouts
            </h3>

            {state.editingSection === "payment" ? (
              <div className="flex gap-2">
                <button
                  onClick={handlers.handleCancelEdit}
                  aria-label="Cancel editing payment info"
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <X size={14} /> Cancel
                </button>
                <button
                  disabled={state.isSaving}
                  onClick={() => handlers.handleSave("payment")}
                  aria-label="Save payment info"
                  className="flex cursor-pointer items-center gap-1.5 rounded-md border border-[#002147] bg-[#002147] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#001733] disabled:opacity-70"
                >
                  <Save size={14} /> {state.isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setters.setEditingSection("payment")}
                aria-label="Edit payment information"
                className="flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
              >
                Edit <Pencil size={12} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="bankName" className="mb-1 block text-xs text-gray-500">
                Bank Name
              </label>
              {state.editingSection === "payment" ? (
                <input
                  id="bankName"
                  name="bankName"
                  value={state.formData.bankName}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.bankName || "—"}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="accountHolder" className="mb-1 block text-xs text-gray-500">
                Account Holder Name
              </label>
              {state.editingSection === "payment" ? (
                <input
                  id="accountHolder"
                  name="accountHolder"
                  value={state.formData.accountHolder}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.accountHolder || "—"}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="accountNumber" className="mb-1 block text-xs text-gray-500">
                Account Number
              </label>
              {state.editingSection === "payment" ? (
                <input
                  id="accountNumber"
                  name="accountNumber"
                  value={state.formData.accountNumber}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.accountNumber || "—"}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="accountType" className="mb-1 block text-xs text-gray-500">
                Account Type
              </label>
              {state.editingSection === "payment" ? (
                <select
                  id="accountType"
                  name="accountType"
                  value={state.formData.accountType}
                  onChange={handlers.handleInputChange}
                  className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#002147]"
                >
                  <option value="">Select account type</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {state.formData.accountType || "—"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}