import JWT from 'passport-jwt';
import User from '../models/user.js';
import passport from 'passport';
import { AppError, ServiceError } from "../utils/Errors/index.js";
import { StatusCodes } from "http-status-codes";


const JwtStrategy=JWT.Strategy;
const ExtractJwt=JWT.ExtractJwt;

const opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretKey:KEY
}

export const passportAuth=(passport)=>{
    try {
        passport.use(new JwtStrategy(opts,async(jwtPayload,done)=>{
            const user=await User.findById(jwtPayload.id);
            if(!user){
                done(null,false)
            }
            else{
                done(null,user)
            }
        }))
    } catch (error) {
        throw new AppError(
            "Passport Auth Error",
            "something went wrong",
            "error in passport Auth",
            StatusCodes.INTERNAL_SERVER_ERROR

        )
        
    }
}