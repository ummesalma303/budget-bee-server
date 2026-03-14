import { AuthRequest } from '#modules/auth/auth.interface.js'
import { httpError } from '#utils/httpError.js'
import { NextFunction, Response } from 'express'
import status from 'http-status'

export const authorize =
    (...roles: string[]) =>
    (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) throw new Error('Unauthorized')

        if (!roles.includes(req.user.role)) {
            // throw new Error('Forbidden')
            httpError(next, new Error('Forbidden'), req, status.FORBIDDEN)
        }

        next()
    }
