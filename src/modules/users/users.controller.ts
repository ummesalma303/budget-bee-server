import responseMessage from '#constant/responseMessage.js'
import { httpError } from '#utils/httpError.js'
import { httpResponse } from '#utils/httpResponse.js'
import { NextFunction, Request, Response } from 'express'

import { createUserService } from './users.service.js'
import { createUserSchema } from './users.validation.js'

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const validatedData = createUserSchema.parse(req.body)

        const user = await createUserService(validatedData)

        httpResponse(req, res, 201, responseMessage.SUCCESS, user)
    } catch (error) {
        httpError(next, error as Error, req, 500)
    }
}

export { createUser }
