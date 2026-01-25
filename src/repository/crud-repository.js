import { AppError, ValidationError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            if (error.name == "ValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError(
                "Repository Layer Error",
                "not able to create",
                "there is some error , try again after sometime",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async destroy(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            if (response.deletedCount === 0) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "Nothing to delete",
                    StatusCodes.NOT_FOUND
                )
            }
            return response;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError(
                "Repository Error",
                "cannot delete what requested ",
                "there is some error in deleting the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    async get(id) {
        try {
            const response = await this.model.findById(id);
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

    async getAll() {
        try {
            const response = await this.model.find({});
            if (!response.length) {
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

    async update(id, data) {
        try {
            const response = await this.model.findByIdAndUpdate(id, data, { new: true });
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
                "there is some error in fetching and updating the request . Please try again later",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

export default CrudRepository;