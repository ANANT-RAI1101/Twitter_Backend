import { TweetRepository, LikeRepository,CommentRepository } from "../repository/index.js";
import { AppError, ServiceError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository(),
            this.tweetRepository = new TweetRepository()
            this.commentRepository=new CommentRepository()
    }

    async toggleLike(modelId, modelType, userId) {
        try {
            if (modelType = "Tweet") {
                var likeable = await this.tweetRepository.find(modelId)
            } else if (modelType = "Comments") {
                var likeable=await this.commentRepository.get(modelId)
            } else {
                throw new AppError(
                    "Service Layer Error",
                    'unknown model type',
                    'unknown model type',
                    StatusCodes.BAD_REQUEST
                );
            }
            const exists = await this.likeRepository.findByUserAndLikeable({
                user: userId,
                onModel: modelType,
                likeable: modelId
            })
            if (exists) {
                likeable.likes.pull(exists.id)
                await likeable.save()
                await exists.remove()
                var isAdded = false;
            } else {
                const newLike = await this.likeRepository.create({
                    user: userId,
                    onModel: modelType,
                    likeable: modelId
                });
                likeable.likes.push(newLike)
                var isAdded = True;
            }
            return isAdded
        } catch (error) {
            throw new ServiceError()
        }
    }
}

export default LikeService