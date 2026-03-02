import config from '#config/config.js'
import { EApplicationEnvironment } from '#constant/application.js'
// import { blue, cyan, green, magenta, red, yellow } from 'colorette'
import path from 'path'
// import util from 'util'
import winston from 'winston'

const { createLogger, format, transports } = winston
const { colorize, combine, errors, json, printf, timestamp } = format
import { TransformableInfo } from 'logform'

/* ---------------------- Console Format (Dev Friendly) --------------------- */
const devFormat = printf((info: TransformableInfo) => {
    const { level, message, stack, timestamp, ...meta } = info

    const metaData = Object.keys(meta).length > 0 ? `\nMeta: ${JSON.stringify(meta, null, 2)}` : ''

    const logMessage = typeof stack === 'string' ? stack : typeof message === 'string' ? message : ''

    const time = typeof timestamp === 'string' ? timestamp : ''

    return `${time} [${level}]: ${logMessage}${metaData}`
})

/* -------------------- File Format (Production Friendly) ------------------- */
const prodFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json())

/* ----------------------------- Logger Instance ---------------------------- */
const logger = createLogger({
    format: errors({ stack: true }),
    level: config.ENV === EApplicationEnvironment.DEVELOPMENT ? 'debug' : 'info',
    transports: [
        new transports.File({
            filename: path.join(process.cwd(), 'logs', `${config.ENV ?? 'development'}.log`),
            format: prodFormat
        })
    ]
})

/* ------------------------------------ colorful terminal ----------------------------------- */
if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    logger.add(
        new transports.Console({
            format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), devFormat)
        })
    )
}

export default logger
