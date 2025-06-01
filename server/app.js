import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import apiRouter from './Routes/api.js'
import malformedJsonMiddleware from './Middleware/malformedJson.middleware.js'
import morgan from 'morgan'
import logger from './Utils/logger.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase'
const APP_ENV = process.env.APP_ENV || 'local'

try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB with Mongoose')
} catch (error) {
    logger.error('Failed to connect to MongoDB', error)
    process.exit(1)
}

if (APP_ENV === 'local') {
    app.use(morgan('dev'))
}
app.use(morgan('combined'))
app.use(express.json())
app.use(malformedJsonMiddleware)
app.use(apiRouter)

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`)
})

