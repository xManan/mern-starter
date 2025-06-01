import express from 'express'
import userController from '../Controllers/user.controller.js'
import authMiddleware from '../Middleware/auth.middleware.js'

const router = express.Router()

router.post('/user', userController.createUser)
router.post('/login', userController.loginUser)
router.get('/user', authMiddleware, userController.getUser)

export default router
