import jwt from "jsonwebtoken"
import {CustomError} from "../errors/index.js";
import { AuthenticationError } from "../errors/index.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(new AuthenticationError("You are not authenticated!"))
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err)
            return next(new CustomError("Token is not valid", 401))
        req.user = user;
    })
}
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next) 
    if(req?.user?.id === req.params.id ||req.user?.isAdmin) {
        next();
    }else{
        return next(new CustomError("You are not authorized", 403));
    }
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next) 
    if(req?.user?.isAdmin) {
        next();
    }else{
        return next(new CustomError("You are not authorized", 403));
    }
};
