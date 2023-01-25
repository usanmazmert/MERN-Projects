import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import {CustomError, NotFoundError} from "../errors/index.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
        }catch(error){
            next(new CustomError("Rezervation Failed!", 400));
        }
        res.status(200).json(savedRoom);
    }catch(error){
        next(new CustomError("Rezervation Failed!", 400));
    }
}

export const getAllRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find({});
        res.status(200).json(rooms);
    }catch(error){
        next(new NotFoundError(error.message))
    }
}

export const getRoom = async ( req, res, next) => {
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    }catch(error){
        next(new NotFoundError(error.message))
    }
}

export const updateRoom = async (req, res, next) => {
    try{
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(room);
    }catch(error){
        next(new NotFoundError(error.message));
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try{
        const room = await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: req.params.id}})
        }catch(error){
            next(new NotFoundError("error.message"))
        }
        res.status(200).json(room);
    }catch(error){
        next(new NotFoundError(error.message))
    }
}

export const getHotelRooms = async (req, res, next) => {
    try{
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map((room) => {
            return Room.findById(room);
        }))
        res.status(200).json(list);
    }catch(error){
        next(new NotFoundError("Room could not be found"))
    }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};