import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectDB.js";

//routers import 
import postRoutes from "./routers/posts.js";
const app = express();

dotenv.config();

app.use(express.json({limit : "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended : true}));
app.use(cors()); 

app.get("/" , (req, res) => {
    res.json({
        author: "mert",
        success: true
    });
})

app.use("/posts", postRoutes);

const start = async () => {
    connectDB(process.env.MONGO_URI).then((result) => {
        console.log("Succesfully connected to db...")
        app.listen(PORT, ()=> console.log(`Server is being listened on port: ${PORT}`));
    }).catch((error) => console.log(error.message));
}

start();
const PORT = process.env.PORT || 5000;
