import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";
import { AppError, ValidationError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";

class UserRepository extends CrudRepository {
    constructor() {
        super(User)
    }

    async findBy(data) {
        try {
            const response = await User.findOne(data)
            if (!response) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "The requested record does not exist",
                    StatusCodes.NOT_FOUND
                )
            }
            return response
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot get what requested ",
                "there is some error in fetching the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}