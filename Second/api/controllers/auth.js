import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import { AuthenticationError, NotFoundError } from "../errors/index.js";

export const register = async (req, res, next) => {
    try{
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(req.body.password, salt)
        const newUser = new User({
            username:req.body.username,
            email: req.body.email,
            password: hash
        })

        await newUser.save();
        res.status(200).send("User has been succesfully created...");
    }catch(error){
        next(new AuthenticationError(error.message));
    }
}

export const login = async (req,res,next) => {
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return next(new NotFoundError("User Doesn't exist"));
        }
        const isPasswordCorrect = await bcryptjs.compare(req.body.password, user.password);
        if(!isPasswordCorrect){
            return next(new NotFoundError("User Doesn't exist"));
        }
        const token = jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.JWT)
        const {password, isAdmin, ...otherDetails} = user._doc;
        res.cookie("access_token", token,
        {
            httpOnly: true
        }).status(200).json({details: {...otherDetails}, isAdmin});
    }catch(error){
        next(new AuthenticationError("Authentication has failed"));
    }
}