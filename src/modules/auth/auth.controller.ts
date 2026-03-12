import responseMessage from '#constant/responseMessage.js'
import { prisma } from '#lib/prisma.js'
import { httpError } from '#utils/httpError.js'
import { httpResponse } from '#utils/httpResponse.js'
import { NextFunction, Request, Response } from 'express'

import { createUserService, loginUser } from './auth.service.js'
import { createUserSchema, loginSchema } from './auth.validation.js'

// register user
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const validatedData = createUserSchema.parse(req.body)
        const user = await createUserService(validatedData)
        httpResponse(req, res, 201, responseMessage.SUCCESS, user)
    } catch (error) {
        httpError(next, error as Error, req, 500)
    }
}

// login user
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = loginSchema.parse(req.body)
        const tokens = await loginUser(validatedData)

        // refresh token cookie
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: false
            //   sameSite: "strict"
        })

        httpResponse(req, res, 200, responseMessage.SUCCESS, {
            accessToken: tokens.accessToken
        })
    } catch (error) {
        httpError(next, error as Error, req, 500)
    }
}

const getAllUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await prisma.user.findMany()
        httpResponse(req, res, 201, responseMessage.SUCCESS, user)
    } catch (error) {
        httpError(next, error as Error, req, 500)
    }
}
export { createUser, getAllUser, login }
