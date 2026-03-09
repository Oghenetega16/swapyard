import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Email must be a valid email"),
    password: z.string().min(8, "Password must not be less than 8 characters")
})

export type loginInput = z.infer<typeof loginSchema>

export const googleTokenSchema = z.object(
{
    token: z.string("Token is not a string, try logging in with email")
}
)

export type tokenInput = z.infer<typeof googleTokenSchema>