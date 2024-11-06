import { z } from "zod";

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email({message: "Please check your email"}),
    password: z.string().min(8, {message: 'Password must be atleast 8 characters'})
})