import Utils from '../Utils/utils.js'

function malformedJsonMiddleware(err, req, res, next) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return Utils.errorResponse(res, 400, 'Malformed JSON')
    }
    next(err);
}

export default malformedJsonMiddleware
