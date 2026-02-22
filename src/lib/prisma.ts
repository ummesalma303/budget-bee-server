import 'dotenv/config'
import config from '#config/config.js'
import { PrismaClient } from '#generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = config.DATABASE_URL

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
