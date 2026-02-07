import LikeService from "../services/like-service.js";
import { StatusCodes } from "http-status-codes";

const likeService = new LikeService()

export const toggleLike = async (req, res) => {
    try {
        const response = await likeService.toggleLike(req.query.modelId, req.query.modelType, req.user.id)
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: "successfully toggled like",
            data: response,
            err: {}
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "something went wrong",
            data: {},
            err: error
        })
    }
}