function formatJoiValidationError(error) {
    return error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, ''),
    }))
}

function validateRequest(schema, data) {
    return schema.validate(data, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    })
}

function errorResponse(res, status, message, errors) {
    return res.status(status).json({
        success: false,
        message: message,
        errors: errors
    })
}

function successResponse(res, status, message, data) {
    return res.status(status).json({
        success: true,
        message: message,
        data: data
    })
}

export default {
    formatJoiValidationError,
    validateRequest,
    errorResponse,
    successResponse
}
