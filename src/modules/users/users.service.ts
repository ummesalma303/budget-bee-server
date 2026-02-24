import { prisma } from '#lib/prisma.js'
import bcrypt from 'bcrypt'

import { CreateUserInput } from './users.validation.js'

const createUserService = async (payload: CreateUserInput) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: payload.email }
    })

    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10)

    const user = await prisma.user.create({
        data: {
            email: payload.email,
            name: payload.name,
            password: hashedPassword
        },
        select: {
            email: true,
            id: true,
            name: true
        }
    })

    return user
}

export { createUserService }
