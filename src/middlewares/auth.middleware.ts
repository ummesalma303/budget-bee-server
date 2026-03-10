import { NextFunction, Request, Response } from 'express'
// import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }

    // const decoded = verifyToken(token);

    // (req as any).user = decoded;

    next()
}
