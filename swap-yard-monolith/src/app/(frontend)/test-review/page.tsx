"use client";

import { useState } from "react";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export default function TestReviews() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("—");

  const [sellerId, setSellerId] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("Great seller");

  const [reviewId, setReviewId] = useState("");

  const [filterSellerId, setFilterSellerId] = useState("");
  const [filterBuyerId, setFilterBuyerId] = useState("");
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("12");

  const pretty = (x: any) => JSON.stringify(x, null, 2);

  const request = async (method: Method, url: string, body?: any) => {
    setLoading(true);
    setOutput("Loading...");

    try {
      const res = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
      });

      const text = await res.text();
      let data: any;

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { raw: text };
      }

      if (method === "POST" && data?.review?.id) {
        setReviewId(data.review.id);
      }

      setOutput(
        pretty({
          status: res.status,
          ok: res.ok,
          url,
          response: data,
        })
      );
    } catch (err: any) {
      setOutput(err?.message ?? "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const buildQuery = () => {
    const sp = new URLSearchParams();
    if (filterSellerId.trim()) sp.set("sellerId", filterSellerId.trim());
    if (filterBuyerId.trim()) sp.set("buyerId", filterBuyerId.trim());
    if (page.trim()) sp.set("page", page.trim());
    if (limit.trim()) sp.set("limit", limit.trim());
    const qs = sp.toString();
    return qs ? `?${qs}` : "";
  };

  const base = "/api/review";

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-slate-900">Reviews API Tester</h1>
          <p className="text-sm text-slate-600">
            Make sure you are logged in as a BUYER (cookie: session).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="text-sm font-semibold text-slate-800">Create / Update</div>

            <Field label="Seller ID" value={sellerId} onChange={setSellerId} placeholder="seller userId" />
            <Field label="Rating (1-5)" value={rating} onChange={setRating} placeholder="5" />
            <Field label="Comment (optional)" value={comment} onChange={setComment} placeholder="Great seller" />

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  request("POST", base, {
                    sellerId,
                    rating: Number(rating),
                    comment,
                  })
                }
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-70"
              >
                Create (POST)
              </button>

              <button
                type="button"
                disabled={loading || !reviewId}
                onClick={() =>
                  request("PUT", `${base}/${reviewId}`, {
                    rating: Number(rating),
                    comment,
                  })
                }
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-70"
              >
                Update (PUT)
              </button>
            </div>

            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
              <div className="mb-2 text-sm font-medium text-slate-800">Review ID</div>
              <div className="flex gap-2">
                <input
                  value={reviewId}
                  onChange={(e) => setReviewId(e.target.value)}
                  placeholder="auto-filled after create"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setReviewId("")}
                  className="rounded-xl bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-300"
                >
                  Clear
                </button>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                PUT/DELETE only works if you are the buyer who created the review.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loading || !reviewId}
                onClick={() => request("GET", `${base}/${reviewId}`)}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
              >
                Get One (GET)
              </button>

              <button
                type="button"
                disabled={loading || !reviewId}
                onClick={() => request("DELETE", `${base}/${reviewId}`)}
                className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-500 disabled:opacity-70"
              >
                Delete (DELETE)
              </button>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="text-sm font-semibold text-slate-800">Get All</div>

            <Field label="Filter sellerId" value={filterSellerId} onChange={setFilterSellerId} placeholder="optional" />
            <Field label="Filter buyerId" value={filterBuyerId} onChange={setFilterBuyerId} placeholder="optional" />

            <div className="grid grid-cols-2 gap-3">
              <Field label="page" value={page} onChange={setPage} placeholder="1" />
              <Field label="limit" value={limit} onChange={setLimit} placeholder="12" />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => request("GET", `${base}${buildQuery()}`)}
              className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
            >
              Get All (GET)
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setFilterSellerId("");
                setFilterBuyerId("");
                setPage("1");
                setLimit("12");
              }}
              className="w-full rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-300 disabled:opacity-70"
            >
              Reset Filters
            </button>

            <div className="rounded-xl bg-white px-3 py-2 text-xs text-slate-600 ring-1 ring-slate-200">
              GET {base}
              {buildQuery()}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 text-sm font-medium text-slate-700">Response</div>
          <pre className="max-h-[450px] overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold text-slate-600">{label}</div>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
      />
    </label>
  );
}