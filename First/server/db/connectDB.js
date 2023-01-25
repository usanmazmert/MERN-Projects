import mongoose from "mongoose";

async function connectDB(url){
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

export default connectDB;