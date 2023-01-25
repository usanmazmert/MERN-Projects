import express from "express";
import {getUser, getAllUsers, deleteUser, updateUser} from "../controllers/user.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/",verifyAdmin, getAllUsers);
router.get("/:id",verifyUser, getUser);


router.put("/:id",verifyUser, updateUser);

router.delete("/:id",verifyUser, deleteUser);

export default router;