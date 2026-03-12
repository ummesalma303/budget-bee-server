import { AuthRequest } from '#modules/auth/auth.interface.js'
import { NextFunction, Response } from 'express'

export const authorize =
    (...roles: string[]) =>
    (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) throw new Error('Unauthorized')

        if (!roles.includes(req.user.role)) {
            throw new Error('Forbidden')
        }

        next()
    }
