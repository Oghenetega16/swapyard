
import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long")
    .toUpperCase(),

  image: z.string().url("Invalid image URL").optional().nullable(),

  publicId: z.string().optional().nullable(),
});

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2)
    .max(50)
    .toUpperCase()
    .optional(),

  image: z.string().url().optional().nullable(),

  publicId: z.string().optional().nullable(),
});