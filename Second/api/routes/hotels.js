import express from "express";
import Hotel from "../models/Hotel.js";
import {countByType, countByCity, createHotel, deleteHotel, getAllHotels, getHotel, updateHotel} from "../controllers/hotels.js";
import {verifyAdmin} from "../utils/verifyToken.js";
import { getHotelRooms } from "../controllers/room.js";

const router = express.Router();

router.get("/", getAllHotels);
router.get("/find/:id", getHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

router.post("/", verifyAdmin, createHotel);

router.put("/:id", verifyAdmin, updateHotel);

router.delete("/:id", verifyAdmin, deleteHotel);

export default router;
