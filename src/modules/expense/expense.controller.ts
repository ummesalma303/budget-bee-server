import responseMessage from '#constant/responseMessage.js'
import { httpError } from '#utils/httpError.js'
import { httpResponse } from '#utils/httpResponse.js'
import { NextFunction, Request, Response } from 'express'

const getExpenses = (req: Request, res: Response, next: NextFunction): void => {
    try {
        throw new Error('thi is an err')

        // The await logic is gone, so the 'async' keyword is removed
        httpResponse(req, res, 200, responseMessage.SUCCESS, { id: 1 })
    } catch (error) {
        httpError(next, error, req, 500)
    }
}

export { getExpenses }
