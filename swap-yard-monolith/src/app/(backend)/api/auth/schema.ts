import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Email must be a valid email"),
    password: z.string().min(8, "Password must not be less than 8 characters")
})

export type loginInput = z.infer<typeof loginSchema>

export const googleAuthSchema = z.object({
  idToken: z.string().trim().min(1, "Google token is required"),
});

export const googleClientIdSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().trim().min(5, "Invalid Google client ID"),
});