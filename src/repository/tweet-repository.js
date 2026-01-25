import Tweet from "../models/tweet.js";
import CrudRepository from "./crud-repository.js";
import { AppError, ValidationError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet);
    }

    async find(id) {
        try {
            const tweet = await Tweet.findById(id).populate({ path: 'likes' });
            if (!tweet) {
                throw new AppError(
                    "Not Found",
                    "Resource not found",
                    "The requested record does not exist",
                    StatusCodes.NOT_FOUND
                )
            }
            return tweet;
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

export default TweetRepository;