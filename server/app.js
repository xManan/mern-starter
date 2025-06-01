import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import apiRouter from './Routes/api.js'
import malformedJsonMiddleware from './Middleware/malformedJson.middleware.js'
import morgan from 'morgan'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase'

console.log('NODE_ENV is:', process.env.NODE_ENV);

try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB with Mongoose');
} catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
}

app.use(morgan('dev'))
app.use(express.json())
app.use(malformedJsonMiddleware)
app.use(apiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

