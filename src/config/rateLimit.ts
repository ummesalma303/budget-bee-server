import { prisma } from '#lib/prisma.js'
import logger from '#utils/logger.js'
import { RateLimiterPrisma } from 'rate-limiter-flexible'

// rate limit configuration
const rateLimiter = new RateLimiterPrisma({
    duration: 60,
    points: 10,
    storeClient: prisma,
    tableName: 'rateLimits'
})

async function rateLimit(userId: string): Promise<void> {
    try {
        const rlRes = await rateLimiter.consume(userId, 1)
        logger.info('Remaining Points:', rlRes.remainingPoints)
    } catch (rejRes: unknown) {
        // It never happens if `insuranceLimiter` is configured with `insuranceLimiter` option
        if (rejRes instanceof Error) {
            logger.error('System Error:', rejRes)
            throw rejRes
        } else {
            // If there is no error, rejRes promise is rejected with number of ms before next request allowed
            const rateLimitError = rejRes as { msBeforeNext: number }
            const secs = Math.round(rateLimitError.msBeforeNext / 1000) || 1
            logger.warn(`Rate limit exceeded. Wait ${String(secs)} seconds.`)
            // throw new Error(`Too many requests. Retry after ${String(secs)} seconds.`)
        }
    }
}

export default rateLimit
