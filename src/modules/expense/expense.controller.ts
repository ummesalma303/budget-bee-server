import responseMessage from '#constant/responseMessage.js'
import { httpResponse } from '#utils/httpResponse.js'
import { Request, Response } from 'express'

const getExpenses = (req: Request, res: Response): void => {
    try {
        // The await logic is gone, so the 'async' keyword is removed
        httpResponse(req, res, 200, responseMessage.SUCCESS)
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Unknown server error'
        })
    }
}

export { getExpenses }
