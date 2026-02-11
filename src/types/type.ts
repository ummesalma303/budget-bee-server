export interface THttpError {
    data: unknown
    message: string
    request: {
        ip?: null | string
        method: string
        url: string
    }
    statusCode: number
    success: boolean
    trace?: null | object
}

export interface THttpResponse {
    data: unknown
    message: string
    request: {
        ip?: null | string
        method: string
        url: string
    }
    statusCode: number
    success: boolean
}
