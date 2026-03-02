import 'dotenv/config'
import config from '#config/config.js'
import { PrismaClient } from '#generated/prisma/client.js'
import logger from '#utils/logger.js'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = config.DATABASE_URL

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({
    adapter,
    log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' }
    ]
})

/* -------------------- Slow Query Logging -------------------- */
prisma.$on('query', (e) => {
    if (e.duration > 500) {
        logger.warn('Slow Database Query', {
            duration: e.duration,
            params: e.params,
            query: e.query,
            target: e.target
        })
    }
})

/* -------------------- Database Error Logging -------------------- */
prisma.$on('error', (e) => {
    logger.error('Database Error', {
        message: e.message,
        target: e.target
    })
})

/* -------------------- Database Warning Logging -------------------- */
prisma.$on('warn', (e) => {
    logger.warn('Database Warning', {
        message: e.message,
        target: e.target
    })
})

export { prisma }
