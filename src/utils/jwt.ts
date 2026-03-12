import config from '#config/config.js'
import { JwtPayload } from '#types/jwt.t.js'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'

const generateAccessToken = (payload: JwtPayload) => {
    return jwt.sign(payload, config.JWT_SECRET as Secret, {
        expiresIn: config.JWT_EXPIRES_IN as SignOptions['expiresIn']
    })
}

const generateRefreshToken = (payload: JwtPayload) => {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET as Secret, {
        expiresIn: config.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn']
    })
}

const verifyAccessToken = (token: string) => {
    return jwt.verify(token, config.JWT_SECRET as Secret)
}

const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, config.JWT_REFRESH_SECRET as Secret)
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken }
