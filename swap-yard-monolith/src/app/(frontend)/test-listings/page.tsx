"use client";

import { useMemo, useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export default function TestListings() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState<string>("—");
  const [loading, setLoading] = useState(false);

  const [listingId, setListingId] = useState("");

  const [name, setName] = useState("Couch");
  const [price, setPrice] = useState("35000");
  const [description, setDescription] = useState("Fairly used Leather couch for sale");
  const [location, setLocation] = useState("Ikeja");
  const [stateVal, setStateVal] = useState("Lagos");
  const [status, setStatus] = useState("AVAILABLE");
  const [condition, setCondition] = useState("FAIRLYNEW");
  const [negotiable, setNegotiable] = useState(true);

  const [q, setQ] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCondition, setFilterCondition] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("12");

  const fileLabel = useMemo(() => {
    if (!files.length) return "No files selected";
    if (files.length === 1) return files[0].name;
    return `${files.length} images selected`;
  }, [files]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const pretty = (data: any) => JSON.stringify(data, null, 2);

  const run = async (method: HttpMethod, url: string, body?: BodyInit) => {
    setLoading(true);
    setMessage("Loading...");

    try {
      const res = await fetch(url, {
        method,
        body,
        credentials: "include",
      });

      const text = await res.text();
      let data: any;

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { raw: text };
      }

      if (method === "POST" && data?.listing?.id) {
        setListingId(data.listing.id);
      }

      setMessage(
        pretty({
          status: res.status,
          ok: res.ok,
          url,
          response: data,
        })
      );
    } catch (err: any) {
      setMessage(err?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const buildCreateOrUpdateFormData = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("state", stateVal);
    formData.append("status", status);
    formData.append("condition", condition);
    formData.append("negotiable", negotiable ? "true" : "false");

    files.forEach((file) => formData.append("images", file));

    return formData;
  };

  const buildQuery = () => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set("q", q.trim());
    if (filterState.trim()) sp.set("state", filterState.trim());
    if (filterStatus.trim()) sp.set("status", filterStatus.trim());
    if (filterCondition.trim()) sp.set("condition", filterCondition.trim());
    if (sellerId.trim()) sp.set("sellerId", sellerId.trim());
    if (minPrice.trim()) sp.set("minPrice", minPrice.trim());
    if (maxPrice.trim()) sp.set("maxPrice", maxPrice.trim());
    if (page.trim()) sp.set("page", page.trim());
    if (limit.trim()) sp.set("limit", limit.trim());
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
  };

  const base = "/api/listing";

  const getIdUrl = () => `${base}/${listingId}`;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900">Listings API Tester</h1>
          <p className="text-sm text-slate-600">Tests POST/GET/PUT/DELETE with JWT cookie.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="text-sm font-semibold text-slate-800">Create / Update payload</div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Name" value={name} onChange={setName} />
              <Input label="Price" value={price} onChange={setPrice} />
            </div>

            <Input label="Description" value={description} onChange={setDescription} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Location" value={location} onChange={setLocation} />
              <Input label="State" value={stateVal} onChange={setStateVal} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="Status" value={status} onChange={setStatus} />
              <Input label="Condition" value={condition} onChange={setCondition} />
            </div>

            <div className="flex items-center justify-between rounded-xl bg-white px-3 py-2 ring-1 ring-slate-200">
              <div>
                <div className="text-sm font-medium text-slate-800">Negotiable</div>
                <div className="text-xs text-slate-500">Sends true/false</div>
              </div>
              <button
                type="button"
                onClick={() => setNegotiable((v) => !v)}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                  negotiable ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-800"
                }`}
              >
                {negotiable ? "True" : "False"}
              </button>
            </div>

            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
              <div className="mb-2 text-sm font-medium text-slate-800">Images</div>
              <div className="flex items-center gap-3">
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
                {files.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setFiles([])}
                    className="ml-auto rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => run("POST", base, buildCreateOrUpdateFormData())}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-70"
              >
                Create (POST)
              </button>

              <button
                type="button"
                disabled={loading || !listingId}
                onClick={() => run("PUT", getIdUrl(), buildCreateOrUpdateFormData())}
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-70"
              >
                Update (PUT)
              </button>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="text-sm font-semibold text-slate-800">Fetch / Delete</div>

            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
              <div className="mb-2 text-sm font-medium text-slate-800">Listing ID</div>
              <div className="flex gap-2">
                <input
                  value={listingId}
                  onChange={(e) => setListingId(e.target.value)}
                  placeholder="Paste listing id here"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setListingId("")}
                  className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300"
                >
                  Clear
                </button>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                After Create, ID auto-fills.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => run("GET", base + buildQuery())}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
              >
                Get All (GET)
              </button>

              <button
                type="button"
                disabled={loading || !listingId}
                onClick={() => run("GET", getIdUrl())}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
              >
                Get One (GET)
              </button>
            </div>

            <button
              type="button"
              disabled={loading || !listingId}
              onClick={() => run("DELETE", getIdUrl())}
              className="w-full rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-500 disabled:opacity-70"
            >
              Delete (DELETE)
            </button>

            <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
              <div className="mb-3 text-sm font-semibold text-slate-800">GET All Filters</div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="q" value={q} onChange={setQ} />
                <Input label="state" value={filterState} onChange={setFilterState} />
                <Input label="status" value={filterStatus} onChange={setFilterStatus} />
                <Input label="condition" value={filterCondition} onChange={setFilterCondition} />
                <Input label="sellerId" value={sellerId} onChange={setSellerId} />
                <Input label="minPrice" value={minPrice} onChange={setMinPrice} />
                <Input label="maxPrice" value={maxPrice} onChange={setMaxPrice} />
                <Input label="page" value={page} onChange={setPage} />
                <Input label="limit" value={limit} onChange={setLimit} />
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                    setFilterState("");
                    setFilterStatus("");
                    setFilterCondition("");
                    setSellerId("");
                    setMinPrice("");
                    setMaxPrice("");
                    setPage("1");
                    setLimit("12");
                  }}
                  className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300"
                >
                  Reset filters
                </button>

                <div className="ml-auto rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-600">
                  GET {base}
                  {buildQuery()}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              PUT replaces images if you choose new files.
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 text-sm font-medium text-slate-700">Response</div>
          <pre className="max-h-105 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
            {message}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold text-slate-600">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
      />
    </label>
  );
}