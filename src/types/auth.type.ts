import { Role } from '#generated/prisma/enums.js'

export interface AccessTokenPayload {
    role: Role
    userId: number
}

export interface RefreshTokenPayload {
    userId: number
}
