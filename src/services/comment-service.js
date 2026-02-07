import { CommentRepository, TweetRepository } from "../repository/index.js";
import { AppError, ServiceError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async create(modelId, modelType, userId, content) {
        try {
            if (modelType === "Tweet") {
                var commentable = await this.tweetRepository.find(modelId)
            } else if (modelType === "Comment") {
                var commentable = await this.commentRepository.get(modelId)
            } else {
                throw new AppError(
                    "Service Layer Error",
                    'unknown model type',
                    'unknown model type',
                    StatusCodes.BAD_REQUEST
                );
            }
            const comment = await this.commentRepository.create({
                content: content,
                userId: userId,
                onModel: modelType,
                commentable: modelId,
                comments: []
            })
            commentable.comments.push(comment)
            await commentable.save()

            return comment
        } catch (error) {
            throw new ServiceError()
        }
    }
}

export default CommentService