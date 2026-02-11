import config from '#config/config.js'
import { EApplicationEnvironment } from '#constant/application.js'
import { THttpResponse } from '#types/type.js'
import { Request, Response } from 'express'

const httpResponse = (req: Request, res: Response, responseStatusCode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        data: data,
        message: responseMessage,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        },
        statusCode: responseStatusCode,
        success: true
    }

    // Log
    console.info(`CONTROLLER_RESPONSE`, {
        meta: response
    })

    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }
    res.status(responseStatusCode).json(response)
}

export { httpResponse }
