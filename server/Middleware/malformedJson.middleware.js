import Utils from '../Utils/utils.js'
import logger from '../Utils/logger.js'

function malformedJsonMiddleware(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        logger.error('Malformed JSON in request body:', err)
        return Utils.errorResponse(res, 400, 'Malformed JSON')
    }
    next(err);
}

export default malformedJsonMiddleware
