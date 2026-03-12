// import { Role } from "@prisma/client"
import { Role } from '#generated/prisma/enums.js'
import { Request } from 'express'

export interface AuthRequest extends Request {
    user?: {
        role: Role
        userId: number
    }
}
