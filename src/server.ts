import app from '#app.js'
import config from '#config/config.js'
import logger from '#utils/logger.js'
import { Server } from 'http'

const server: Server = app.listen(config.PORT, () => {
    logger.info('Example app listening on port', config.PORT)

    logger.info('APPLICATION_STARTER', {
        meta: {
            PORT: config.PORT,
            SERVER_URL: config.SERVER_URL
        }
    })
})

server.on('error', (error) => {
    logger.error('APPLICATION_ERROR', { meta: error })
    process.exit(1)
})

process.on('SIGINT', () => {
    logger.info('Shutting down server...')
    server.close(() => process.exit(0))
})
