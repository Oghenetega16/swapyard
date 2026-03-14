import { z } from "zod";

export const createOrderItemSchema = z.object({
  listingId: z.string().trim().cuid("Invalid listingId"),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1").default(1),
});

export const createOrderSchema = z
  .object({
    items: z.array(createOrderItemSchema).min(1, "At least one item is required"),
    deliveryFee: z.coerce.number().min(0, "Delivery fee cannot be negative").default(0),
    platformCommission: z.coerce
      .number()
      .min(0, "Platform commission cannot be negative")
      .default(0),
  })
  .strict();

export const getOrdersSchema = z
  .object({
    status: z
      .enum([
        "PENDING_PAYMENT",
        "PAID",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "BUYER_CONFIRMED",
        "COMPLETED",
        "CANCELLED",
        "REFUNDED",
        "DISPUTED",
      ])
      .optional(),
    scope: z.enum(["buyer", "seller"]).default("buyer"),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
  })
  .strict();


export const updateOrderSchema = z
  .object({
    status: z.enum([
      "PENDING_PAYMENT",
      "PAID",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "BUYER_CONFIRMED",
      "COMPLETED",
      "CANCELLED",
      "REFUNDED",
      "DISPUTED",
    ]),
  })
  .strict();