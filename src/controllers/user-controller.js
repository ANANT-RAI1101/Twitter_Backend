import UserService from "../services/user-service.js";
import { StatusCodes } from "http-status-codes";
const userService = new UserService()

export const signup = async (req, res) => {
    try {
        const response = await userService.signup({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        })
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Successfully created a new user",
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: err
        })
    }
}

export const login = async (req, res) => {
    try {
        const token = await userService.login(req.body)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully logged in',
            data: token,
            err: {}
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}