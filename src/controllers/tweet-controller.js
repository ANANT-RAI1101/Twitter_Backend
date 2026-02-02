import TweetService from "../services/tweet-service.js";
import { StatusCodes } from "http-status-codes";


const tweetService = new TweetService()

export const createTweet = async (req, res) => {
    try {
        const response = await tweetService.create(data);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully created a new tweet',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })
    }
}

export const getTweet = async (req, res) => {
    try {
        const response = await tweetService.get(req.params.id)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully fetched the tweet",
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })
    }
}

