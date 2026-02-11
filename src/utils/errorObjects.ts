import config from '#config/config.js'
import { EApplicationEnvironment } from '#constant/application.js'
import responseMessage from '#constant/responseMessage.js'
import { THttpError } from '#types/type.js'
import { Request } from 'express'

const errorObjectFunc = (err: unknown, req: Request, errorStatusCode = 500): THttpError => {
    const errorObj: THttpError = {
        data: null,
        message: err instanceof Error ? err.message || responseMessage.SOMETHING_WRONG : responseMessage.SOMETHING_WRONG,
        request: {
            ip: req.ip,
            method: req.method,
            url: req.originalUrl
        },
        statusCode: errorStatusCode,
        success: false,
        trace: err instanceof Error ? { error: err.stack } : null
    }

    // Log
    console.info(`CONTROLLER_ERROR`, {
        meta: errorObj
    })

    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObj.request.ip
        delete errorObj.trace
    }
    return errorObj
}

export { errorObjectFunc }
