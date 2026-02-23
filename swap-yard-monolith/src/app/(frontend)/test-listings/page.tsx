"use client";

import { useMemo, useState } from "react";

export default function TestCreateListing() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fileLabel = useMemo(() => {
    if (!files.length) return "No files selected";
    if (files.length === 1) return files[0].name;
    return `${files.length} images selected`;
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();

      formData.append("name", "Couch");
      formData.append("price", "35000");
      formData.append("description", "Fairly used Leather couch for sale");
      formData.append("location", "Ikeja");
      formData.append("state", "Lagos");
      formData.append("status", "AVAILABLE");
      formData.append("condition", "FAIRLYNEW");
      formData.append("negotiable", "true");

      files.forEach((file) => formData.append("images", file));

      const res = await fetch("/api/listing", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      setMessage(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setMessage(err?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900">Test Create Listing</h1>
          <p className="text-sm text-slate-600">
            Upload multiple images and create a listing (JWT cookie must exist).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Images</span>

            <div className="mt-2 flex items-center gap-3">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
                Choose files
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <span className="text-sm text-slate-600">{fileLabel}</span>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </form>

        <div className="mt-5">
          <div className="mb-2 text-sm font-medium text-slate-700">Response</div>
          <pre className="max-h-80 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
            {message || "—"}
          </pre>
        </div>
      </div>
    </div>
  );
}