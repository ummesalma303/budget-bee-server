import { Request } from 'express'

export interface IAuthRequest extends Request {
    user?: IAuthUser
}

export interface IAuthUser {
    email?: string
    id: string
    role?: string
}
