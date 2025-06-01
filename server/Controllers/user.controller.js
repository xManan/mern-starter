import Joi from 'joi'
import Utils from '../Utils/utils.js'
import bcrypt from 'bcrypt'
import User from '../Models/user.js'
import jwt from 'jsonwebtoken'

const createUserRequest = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}).required()
async function createUser(req, res) {
    const { error, value } = Utils.validateRequest(createUserRequest, req.body)
    if (error) {
        return Utils.errorResponse(res, 422, "", Utils.formatJoiValidationError(error))
    }
    const hashedPassword = bcrypt.hashSync(value.password, 10)
    try {
        const user = new User({
            username: value.username,
            password: hashedPassword
        })
        await user.save()
    } catch (err) {
        if (err.code === 11000) {
            return Utils.errorResponse(res, 409, 'Username already exists')
        }
        return Utils.errorResponse(res, 500, 'Internal Server Error')
    }
    return Utils.successResponse(res, 201, 'User created successfully', value)
}

const loginUserRequest = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
}).required()
async function loginUser(req, res) {
    const { error, value } = Utils.validateRequest(loginUserRequest, req.body)
    if (error) {
        return Utils.errorResponse(res, 422, "", Utils.formatJoiValidationError(error))
    }
    try {
        const user = await User.findOne({ username: value.username })
        if(!user) {
            return Utils.errorResponse(res, 401, 'Username or password is incorrect')
        }
        const isPasswordValid = bcrypt.compareSync(value.password, user.password)
        if (!isPasswordValid) {
            return Utils.errorResponse(res, 401, 'Username or password is incorrect')
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return Utils.successResponse(res, 200, 'Login successful', { token })
    } catch (err) {
        return Utils.errorResponse(res, 500, 'Internal Server Error')
    } 
}

async function getUser(req, res) {
    return Utils.successResponse(res, 200, 'User retrieved successfully', { userId: req.userId })
}

export default {
    createUser,
    loginUser,
    getUser
}
