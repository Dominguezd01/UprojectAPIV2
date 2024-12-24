import { z } from 'zod'

// Define your DTO schema
export const RegisterUser = z.object({
    userName: z.string().min(1).max(255),
    password: z.string().min(6).max(15),
    email: z.string().email(),
    profilePicture: z.string().optional()
});

export type RegisterUserType = z.infer<typeof RegisterUser>;