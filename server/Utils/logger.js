import pino from 'pino'
import dotenv from 'dotenv'

dotenv.config()

const pinoOpts = process.env.APP_ENV === 'local' ? {
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
        },
    },
    level: process.env.LOG_LEVEL || 'info',
} : {
    level: process.env.LOG_LEVEL || 'info',
}

const logger = pino(pinoOpts)

export default logger
