import TweetRepository from "../../src/repository/tweet-repository.js";
import Tweet from "../../src/models/tweet.js";
import AppError from "../../src/utils/Errors/app-error.js";
import { StatusCodes } from "http-status-codes";

jest.mock("../../src/models/tweet.js");//mock the model

describe("create a tweet and return it", () => {
    test("create tweet test", async () => {
        const data = {
            content: "Tweet 1"
        }
        const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
            return {
                ...data,
                createdAt: '2026-02-21',
                updatedAt: '2026-02-21'
            }
        })
        const tweetRepository = new TweetRepository()
        const tweet = await tweetRepository.create(data);

        expect(spy).toHaveBeenCalled();
        expect(tweet.content).toBe(data.content);
        expect(tweet.createdAt).toBeDefined();
    })

    test("tweet doent get created and results in error", async () => {
        const data = {
            content: "Tweet 1"
        }

        const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
            throw new AppError(
                "Repository Layer Error",
                "not able to create",
                "there is some error , try again after sometime",
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        })
        const tweetRepository = new TweetRepository()
        const tweet = await tweetRepository.create(data).catch(err => {
            expect(err.message).toBe("not able to create")
        })

    })
})

describe("get tweet with pagination", () => {
    test("return only fixed no. of tweets", async () => {
        const data = {
            content: "Tweet 2"
        }
        const tweetsArray = [
            { ...data, createdAt: '2026-02-21', updatedAt: '2026-02-21' },
            { ...data, createdAt: '2026-02-21', updatedAt: '2026-02-21' },
            { ...data, createdAt: '2026-02-21', updatedAt: '2026-02-21' }
        ];
        const findResponse={tweetsArray};

        findResponse.skip=jest.fn((offset)=>findResponse);
        findResponse.limit=jest.fn((limit)=>findResponse.tweetsArray.slice(0,limit));

        const spy=jest.spyOn(Tweet,"find").mockImplementation(()=>{
            return findResponse;
        })
        const tweetRepository=new TweetRepository();
        const tweets=await tweetRepository.findByPages(1,2);
        expect(tweets).toHaveLength(2);
    })
})

