import { prisma } from '#lib/prisma.js'
import { comparePassword, hashPassword } from '#utils/hash.js'
import { generateAccessToken, generateRefreshToken } from '#utils/jwt.js'
// import { Payload } from './../../generated/prisma/internal/prismaNamespace'

import { CreateUserInput, LoginInput } from './auth.validation.js'

const createUserService = async (payload: CreateUserInput) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: payload.email }
    })

    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await hashPassword(payload.password)

    const user = await prisma.user.create({
        data: {
            email: payload.email,
            name: payload.name,
            password: hashedPassword,
            role: payload.role
        },
        select: {
            email: true,
            id: true,
            name: true,
            role: true
        }
    })

    return user
}

const loginUser = async (Payload: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email: Payload.email } })

    if (!user) {
        throw new Error('User not found')
    }
    const validUser = await comparePassword(Payload.password, user.password)
    if (!validUser) throw new Error('Invalid credentials')

    const accessToken = generateAccessToken({ role: user.role, userId: user.id })
    const refreshToken = generateRefreshToken({ userId: user.id })

    // save hashed refresh token
    // const hashedRefresh = await hashPassword(refreshToken)
    await prisma.user.update({
        data: { refreshToken },
        where: { id: user.id }
    })

    return { accessToken, refreshToken }
}

export { createUserService, loginUser }
