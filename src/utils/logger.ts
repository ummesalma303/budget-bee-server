import config from '#config/config.js'
import { EApplicationEnvironment } from '#constant/application.js'
import path from 'path'
import util from 'util'
import winston from 'winston'

const { createLogger, format, transports } = winston
const { colorize, combine, printf, timestamp } = format

/* ===============================
   Console Format (Dev Friendly)
================================ */
const consoleFormat = printf((info) => {
    const level = info.level
    const message = String(info.message)
    const time = info.timestamp as string
    const meta = info.meta ?? {}

    return `${level.toUpperCase()} [${time}] ${message} ${util.inspect(meta, {
        depth: null,
        showHidden: false
    })}`
})

/* -------------------- File Format (Production Friendly) ------------------- */
const fileFormat = printf((info) => {
    const { level, message, timestamp, ...meta } = info

    const cleanedMeta: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            cleanedMeta[key] = {
                message: value.message,
                name: value.name,
                stack: value.stack
            }
        } else {
            cleanedMeta[key] = value
        }
    }

    const metaString = Object.keys(cleanedMeta).length > 0 ? `\n${JSON.stringify(cleanedMeta, null, 4)}` : ''

    return `[${String(timestamp)}] ${level.toUpperCase()}: ${String(message)}${metaString}`
})

/* -------------------------------------------------------------------------- */
/*                              Console Transport                             */
/* -------------------------------------------------------------------------- */
const consoleTransport = () => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), colorize(), consoleFormat),
                level: 'info'
            })
        ]
    }

    return []
}

/* -------------------------------------------------------------------------- */
/*                               File Transport                               */
/* -------------------------------------------------------------------------- */

const fileTransport = () => {
    return [
        new transports.File({
            filename: path.join(process.cwd(), 'logs', `${config.ENV ?? 'development'}.log`),
            format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), fileFormat),
            level: 'info'
        })
    ]
}

/* ----------------------------- Logger Instance ---------------------------- */

const logger = createLogger({
    level: 'info',
    transports: [...fileTransport(), ...consoleTransport()]
})

export default logger
