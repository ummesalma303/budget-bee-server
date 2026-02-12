import responseMessage from '#constant/responseMessage.js'
import { httpError } from '#utils/httpError.js'
import { NextFunction, Request, Response } from 'express'
export default (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND(`route`))
    } catch (error) {
        httpError(next, error, req, 404)
    }
}
