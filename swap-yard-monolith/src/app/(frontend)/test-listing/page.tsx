"use client";

import { useState } from "react";

export default function TestCreateListing() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Uploading...");

    const formData = new FormData();

    formData.append("name", "Test Product");
    formData.append("price", "15000");
    formData.append("description", "Test description");
    formData.append("location", "Ikeja");
    formData.append("state", "Lagos");
    formData.append("status", "AVAILABLE");
    formData.append("condition", "USED");
    formData.append("negotiable", "true");

    files.forEach((file) => {
      formData.append("images", file);
    });

    const res = await fetch("/api/listing", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await res.json();
    setMessage(JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Test Create Listing</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />

        <br /><br />

        <button type="submit">Create Listing</button>
      </form>

      <pre style={{ marginTop: 20 }}>{message}</pre>
    </div>
  );
}