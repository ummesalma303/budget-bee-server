import config from '#config/config.js'
import { EApplicationEnvironment } from '#constant/application.js'
import { blue, cyan, green, magenta, red, yellow } from 'colorette'
import path from 'path'
import winston from 'winston'
import 'winston-daily-rotate-file'

const { createLogger, format, transports } = winston
const { combine, errors, json, printf, timestamp } = format
import { TransformableInfo } from 'logform'

/* ------------------------------------ colorful terminal ----------------------------------- */
const colorLevel = (level: string): string => {
    const strLevel = level.toUpperCase()
    switch (strLevel) {
        case 'DEBUG':
            return blue(strLevel)
        case 'ERROR':
            return red(strLevel)
        case 'INFO':
            return green(strLevel)
        case 'WARN':
            return yellow(strLevel)
        default:
            return cyan(strLevel)
    }
}

/* ---------------------- Console Format (Dev Friendly) --------------------- */
const devFormat = printf((info: TransformableInfo) => {
    const { level, message, stack, timestamp, ...meta } = info

    const metaData = Object.keys(meta).length > 0 ? `\n${magenta('Meta')}: ${JSON.stringify(meta, null, 2)}` : ''
    const logMessage = typeof stack === 'string' ? stack : typeof message === 'string' ? message : ''
    const time = typeof timestamp === 'string' ? timestamp : ''

    return `${blue(time)} [${colorLevel(level)}]: ${logMessage}${metaData}`
})

/* -------------------- File Format (Production Friendly) ------------------- */
const prodFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json())

/* ----------------------------- Logger Instance ---------------------------- */
const logger = createLogger({
    format: errors({ stack: true }),
    level: config.ENV === EApplicationEnvironment.DEVELOPMENT ? 'debug' : 'info',
    transports: [
        new transports.DailyRotateFile({
            datePattern: 'YYYY-MM-DD',
            filename: path.join(process.cwd(), 'logs', '%DATE%-combined.log'),
            format: prodFormat,
            maxFiles: '14d',
            maxSize: '20m',
            zippedArchive: true
        })
    ]
})

/* ------------------------------------ colorful transport ----------------------------------- */
if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    logger.add(
        new transports.Console({
            format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), devFormat)
        })
    )
}

export default logger
