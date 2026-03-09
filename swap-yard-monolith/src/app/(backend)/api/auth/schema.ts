import { z } from "zod";

const loginSchema = z.object({
    email: z.email("Email must be a valid email"),
    password: z.string().min(8, "Password must not be less than 8 characters")
})

export type loginInput = z.infer<typeof loginSchema>