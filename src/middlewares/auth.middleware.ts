import { AuthRequest } from '#modules/auth/auth.interface.js'
import { verifyAccessToken } from '#utils/jwt.js'
import { NextFunction, Response } from 'express'

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    const token = authHeader.split(' ')[1]

    const decoded = verifyAccessToken(token)

    req.user = decoded

    next()
}
