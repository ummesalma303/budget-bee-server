import { Role } from '#generated/prisma/enums.js'
import { z } from 'zod'

export const createUserSchema = z.object({
    email: z.email(),
    name: z.string().min(2),
    password: z.string().min(6),
    role: z.enum(Role).optional()
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

export const refreshTokenSchema = z.object({
    token: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>
