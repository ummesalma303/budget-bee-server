import config from '#config/config.js'
import { AccessTokenPayload, RefreshTokenPayload } from '#types/auth.type.js'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'

const generateAccessToken = (payload: AccessTokenPayload): string => {
    return jwt.sign(payload, config.JWT_SECRET as Secret, {
        expiresIn: config.JWT_EXPIRES_IN as SignOptions['expiresIn']
    })
}

const generateRefreshToken = (payload: RefreshTokenPayload): string => {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET as Secret, {
        expiresIn: config.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn']
    })
}

const verifyAccessToken = (token: string): AccessTokenPayload => {
    return jwt.verify(token, config.JWT_SECRET as Secret) as AccessTokenPayload
}

const verifyRefreshToken = (token: string): RefreshTokenPayload => {
    return jwt.verify(token, config.JWT_REFRESH_SECRET as Secret) as RefreshTokenPayload
}

export { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken }
