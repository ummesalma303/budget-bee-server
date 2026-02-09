import { Request, Response } from 'express'

const getExpenses = (req: Request, res: Response): void => {
    try {
        // The await logic is gone, so the 'async' keyword is removed
        res.status(200).json({
            message: 'Data received successfully!',
            success: true
        })
    } catch (error) {
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Unknown server error'
        })
    }
}

export { getExpenses }
