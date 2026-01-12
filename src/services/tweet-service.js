import { TweetRepository, HashtagRepository } from "../repository/index.js";
import { AppError, ValidationError, ServiceError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";
class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        try {
            const content = data.content;
            console.log(content)
            const tags = content.match(/#[a-zA-Z0-9_]+/g).map((tag) => tag.substring(1).toLowerCase());
            console.log(tags)
            const tweet = await this.tweetRepository.create(data);
            console.log(tweet);
            // till here every thing was fine
            let alreadyPresentTags = await this.hashtagRepository.findByName(tags);
            console.log(alreadyPresentTags)
            let titleOfPresentTags = alreadyPresentTags.map(tags => tags.title);
            console.log(titleOfPresentTags)
            let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));
            console.log(newTags);

            newTags = newTags.map(tag => {
                return ({ title: tag, tweets: [tweet.id] })
            });
            console.log(newTags)
            if (newTags.length > 0) {
                await this.hashtagRepository.bulkCreate(newTags);
            }
            alreadyPresentTags.forEach((tag) => {
                tag.tweets.push(tweet.id);
                tag.save();
            });
            return tweet;
        } catch (error) {
            console.log("🔥 ACTUAL ERROR IN SERVICE:", error);
            if (error.name === "ValidationError") {
                throw new ValidationError(error);
            }
            throw new ServiceError(
                "Service Error",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

export default TweetService;