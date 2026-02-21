import config from '#config/config.js'
import { defineConfig } from 'prisma/config'

export default defineConfig({
    datasource: {
        url: config.DATABASE_URL
    },
    migrations: {
        path: 'prisma/migrations'
    },
    schema: 'prisma/schema.prisma'
})
