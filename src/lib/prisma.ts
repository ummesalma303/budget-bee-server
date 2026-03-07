import 'dotenv/config'
import config from '#config/config.js'
// Prisma এর টাইপগুলো ইম্পোর্ট করে নিন
import { Prisma, PrismaClient } from '#generated/prisma/client.js'
import logger from '#utils/logger.js'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = config.DATABASE_URL

// PostgreSQL পুল তৈরি করা নিরাপদ
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
    adapter,
    log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' }
    ]
})

/* -------------------- Slow Query Logging -------------------- */
prisma.$on('query', (e: Prisma.QueryEvent) => {
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
// 'e' কে Prisma.LogEvent টাইপ দিন
prisma.$on('error', (e: Prisma.LogEvent) => {
    logger.error('Database Error', {
        message: e.message,
        target: e.target
    })
})

/* -------------------- Database Warning Logging -------------------- */
// 'e' কে Prisma.LogEvent টাইপ দিন
prisma.$on('warn', (e: Prisma.LogEvent) => {
    logger.warn('Database Warning', {
        message: e.message,
        target: e.target
    })
})

export { prisma }
