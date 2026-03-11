import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z.coerce.number().int().min(1, "Rating must be at least 1").max(5, "Rating cannot be more than 5"),
  comment: z.string().trim().nullable().optional(),
  sellerId: z.string().trim().min(1, "Seller ID is required"),
});

export const getReviewsSchema = z.object({
  sellerId: z.string().trim().optional(),
  buyerId: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
});