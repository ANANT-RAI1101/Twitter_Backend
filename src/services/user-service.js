import { UserRepository } from "../repository/index.js";
import { AppError, ServiceError, ValidationError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";


class UserService {
    constructor() {
        this.userRepository = new UserRepository()
    }

    async signup(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if (error.name === "ValidationError") {
                throw new ValidationError(error)
            }
            throw new ServiceError()

        }
    }

    async getWithEmail(email) {
        try {
            const user = await this.userRepository.findBy(email);
            return user;
        } catch (error) {
            throw new ServiceError()

        }
    }
    async login(data) {
        try {
            const user = await this.getWithEmail(data.email);
            if (!user) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "The requested record does not exist",
                    StatusCodes.NOT_FOUND
                )
            }
            if(!user.comparePassword(data.password)){
                throw new AppError(
                    "Something Went Wrong ",
                    "Password is incorrect ",
                    "Password doesn't get matched ",
                    StatusCodes.UNAUTHORIZED
                )
            }
            const token=user.genJWt();
            return token;
        } catch (error) {
            throw new ServiceError();
        }
    }
}

export default UserService