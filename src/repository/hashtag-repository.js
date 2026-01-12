import CrudRepository from "./crud-repository.js";
import Hashtag from "../models/hashtag.js";
import { AppError, ValidationError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";

class HashtagRepository extends CrudRepository {
    constructor() {
        super(Hashtag);
    }

    async bulkCreate(data) {
        try {
            if ( data.length === 0) {
            throw new AppError(
                "Repository Error",
                "data field is empty",
                "sender has not send any data ",
                StatusCodes.BAD_REQUEST
            );
        }
            const tags = await Hashtag.insertMany(data);
            return tags;
        } catch (error) {
            if (error instanceof AppError) throw error;
            if (error.name === "ValidationError") {
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

    async findByName(titleList) {
        try {
            const tags = await Hashtag.find({
                title: titleList
            });
            if (!tags.length) {
                return [];
            }
            return tags;
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

export default HashtagRepository;

