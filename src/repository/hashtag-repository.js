import CrudRepository from "./crud-repository.js";
import Hashtag from "../models/hashtag.js";
import { AppError, ValidationError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";

class HashtagRepository extends CrudRepository{
    constructor(){
        super(Hashtag);
    }

    async bulkCreate(data){
        try {
            const tags=await Hashtag.insertMany(data);
            if(tags.length===0){
                throw new AppError(
                    "Repository Error",
                    "data field is empty",
                    "sender has not send any data ",
                    StatusCodes.INTERNAL_SERVER_ERROR
                )
            }
        } catch (error) {
           if(error instanceof AppError ) throw error;
           if(error.name==="ValidationError"){
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
}

export default HashtagRepository;

