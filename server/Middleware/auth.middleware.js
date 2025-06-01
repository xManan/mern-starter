import utils from "../Utils/utils.js"
import jwt from 'jsonwebtoken'
import logger from '../Utils/logger.js'

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
        logger.error(err, 'Authentication error')
        return utils.errorResponse(res, 400, 'Invalid token.')
    }
}

export default authMiddleware
