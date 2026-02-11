import { THttpError } from '#types/type.js'
import { NextFunction, Request, Response } from 'express'

export default (err: THttpError, req: Request, res: Response, next: NextFunction): void => {
    res.status(err.statusCode).json(err)
    next()
}
