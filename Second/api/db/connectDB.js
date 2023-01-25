import mongoose from "mongoose";
export async function connectDB(url){
    try{
        await mongoose.connect(url);
    }catch(error){
        throw error;
    }
}