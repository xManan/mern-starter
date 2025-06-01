import utils from "../Utils/utils.js"
import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next) {
    let token = req.header('Authorization')
    if (!token) {
        return utils.errorResponse(res, 401, 'Access denied. No token provided.')
    }
    token = token.replace('Bearer ', '').trim()
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (err) {
        console.error('Token verification failed:', err)
        return utils.errorResponse(res, 400, 'Invalid token.')
    }
}

export default authMiddleware
