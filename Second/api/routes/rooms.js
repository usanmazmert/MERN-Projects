import express from "express";
import {verifyAdmin} from "../utils/verifyToken.js"
import {getAllRooms, getRoom, createRoom, updateRoom, deleteRoom, updateRoomAvailability} from "../controllers/room.js";

const router = express.Router();


router.get("/", getAllRooms);
router.get("/:id", getRoom);

router.post("/:hotelid", verifyAdmin, createRoom);

router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

export default router;