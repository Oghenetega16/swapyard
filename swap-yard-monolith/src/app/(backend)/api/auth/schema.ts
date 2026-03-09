import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  firstname: z.string().trim().min(1, "First name is required"),

  lastname: z.string().trim().min(1, "Last name is required"),

  phoneNumber: z.string().trim().min(1, "Phone number is required"),

  state: z.string().trim().min(1, "State is required"),

  role: z.enum(["BUYER", "SELLER"]).default("BUYER"),

  contract: z.boolean(),
}).strict();

export const loginSchema = z.object({
    email: z.email().trim().min(5,"Email must be a valid email"),
    password: z.string().min(8, "Password must not be less than 8 characters")
})

export type loginInput = z.infer<typeof loginSchema>

export const googleAuthSchema = z.object({
  idToken: z.string().trim().min(1, "Google token is required"),
});

export const googleClientIdSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().trim().min(5, "Invalid Google client ID"),
});

export const resetPasswordSchema = z.object({
  token: z.string().trim().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});