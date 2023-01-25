import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./db/connectDB.js";
import mongoose from "mongoose";
import hotelRouter from "./routes/hotels.js";
import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"
import roomsRouter from "./routes/rooms.js"
import {handler} from "./errors/index.js";
import cookieParser from "cookie-parser"
import cors from "cors"

//Creating app and configuring config file
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

//Routers
app.use("/api/v1/hotels", hotelRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/users", usersRouter);

//Error handling middleware
app.use(handler);


//Connecting to db and starting the server.
mongoose.connection.on("disconnected" , () => console.log("MongoDB has been disconnected"));
mongoose.connection.on("connected", () => console.log("Has been successfully connected to DB.."));
const PORT = process.env.PORT || 8000
const startServer = async() => {
    connectDB(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log("Connected to db"));
    })
    .catch(error => {
        throw error;
    })
}

startServer();
