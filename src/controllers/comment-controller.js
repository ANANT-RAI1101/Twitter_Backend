import CommentService from "../services/comment-service.js";
import { StatusCodes } from "http-status-codes";

const commentService=new CommentService()
export const createComment=async(req,res)=>{
    try {
        const response = await commentService.create(req.query.modelId,req.query.modelType,req.user.id,req.body.content)
        res.status(StatusCodes.CREATED).json({
            success:true,
            message:"successfully created the comments",
            data:response,
            err:{}
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"something went wrong",
            data:{},
            err:error
        })
    }
}