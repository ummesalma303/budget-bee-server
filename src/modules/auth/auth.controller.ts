import responseMessage from '#constant/responseMessage.js'
import { prisma } from '#lib/prisma.js'
import { httpError } from '#utils/httpError.js'
import { httpResponse } from '#utils/httpResponse.js'
import { NextFunction, Request, Response } from 'express'
import status from 'http-status'

import { AuthRequest } from './auth.interface.js'
import { createUserService, loginUser, logoutUser } from './auth.service.js'
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
const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
// user profile
const getProfile = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const loggedUser = req.user
        httpResponse(req, res, 201, responseMessage.SUCCESS, loggedUser)
    } catch (error) {
        httpError(next, error as Error, req, 500)
    }
}

// logOut Auth
const logout = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
        httpError(next, new Error('Unauthorized'), req, status.UNAUTHORIZED)
        return
    }
    await logoutUser(req.user.userId)
    res.clearCookie('refreshToken')
    httpResponse(req, res, 201, responseMessage.SUCCESS, 'Logged out successfully')
}

// All user
const getAllUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await prisma.user.findMany()
        httpResponse(req, res, 201, responseMessage.SUCCESS, user)
    } catch (error) {
        httpError(next, error as Error, req, 500)
    }
}
export { createUser, getAllUser, getProfile, login, logout }
