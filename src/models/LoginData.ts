import { z } from 'zod'

// Define your DTO schema
export const LoginData = z.object({
    identity: z.string().min(1).max(255),
    password: z.string().min(6).max(15),
});

export type LoginData = z.infer<typeof LoginData>;