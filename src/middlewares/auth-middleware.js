import passport from "passport";
import { StatusCodes } from "http-status-codes";

export const authenticate=(req,res,next)=>{
    passport.authenticate("jwt",(err,user)=>{
        if(err) next(err);
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message:'Unauthorised access no token'
            })
        }
        req.user=user
        next()
    })(req,res,next)
}