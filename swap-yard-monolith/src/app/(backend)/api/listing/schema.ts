import { z } from "zod";

export const createListingSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  location: z.string().trim().nullable().optional(),
  state: z.string().trim().nullable().optional(),

  status: z.enum(["AVAILABLE", "SOLD"]).default("AVAILABLE"),
  condition: z.enum(["NEW", "FAIRLYNEW", "SECONDHAND", "FAIR", "GOOD"]),

  price: z.number().positive("Price must be greater than 0"),
  negotiable: z.boolean().default(false),
});

export const getListingsSchema = z.object({
  q: z.string().trim().optional().default(""),
  status: z.enum(["AVAILABLE", "SOLD"]).optional(),
  condition: z.enum(["NEW", "FAIRLYNEW", "SECONDHAND", "FAIR", "GOOD"]).optional(),
  state: z.string().trim().optional(),
  sellerId: z.string().trim().optional(),

  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),

  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
}).refine(
  (data) =>
    data.minPrice === undefined ||
    data.maxPrice === undefined ||
    data.minPrice <= data.maxPrice,
  {
    message: "minPrice cannot be greater than maxPrice",
    path: ["minPrice"],
  }
);