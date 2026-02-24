import {getTweet} from "../../src/controllers/tweet-controller.js"
import TweetService from "../../src/services/tweet-service.js"
import {mockResponse,mockRequest} from "../mocker.js"

jest.mock("../../src/services/tweet-service.js");

test("should return all tweets",async ()=>{
    const req=mockRequest();
    const res=mockResponse();
    const response=[
        {
            content:"Tweet1"
        },
        {
            content:"Tweet2"
        }
    ];
    (TweetService.prototype.get).mockReturnValue(response);
    await getTweet(req,res);
    expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Successfully fetched the tweet',
        data: response,
        err: {}
    });

})