import config from '#config/config.js'
import rateLimit from '#config/rateLimit.js'
import { EApplicationEnvironment } from '#constant/application.js'
import responseMessage from '#constant/responseMessage.js'
import { IAuthRequest } from '#types/request.js'
import { httpError } from '#utils/httpError.js'
import logger from '#utils/logger.js'
import { NextFunction, Response } from 'express'

const rateLimitMiddleware = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        next()
        return
    }

    const identifier: string = req.user?.id ?? req.ip ?? 'unknown ip'

    try {
        await rateLimit(identifier)
        next()
    } catch (error) {
        logger.error(`Rate limit hit: ${identifier}`, error)
        httpError(next, new Error(responseMessage.TOO_MANY_REQUEST), req, 429)
    }
}

export default rateLimitMiddleware
