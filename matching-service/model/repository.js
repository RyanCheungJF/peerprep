import socketRoomModel from '../model/socket-room-model.js'
import 'dotenv/config'

// Set up mongoose connection
import mongoose from 'mongoose'

let mongoDB =
  process.env.ENV == 'PROD'
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => console.log('Connected to MongoDB'))
db.collection('socketroommodels')

// find all rooms
export const findAllRooms = async (filter) => {
  return socketRoomModel.find(filter)
}

// find one room by filter
export const findOneRoom = async (filter) => {
  return socketRoomModel.findOne(filter)
}

// create a room
export const createRoom = async (params) => {
  return new socketRoomModel(params)
}

// delete a room
export const deleteRoom = async (roomToBeDeleted) => {
  return roomToBeDeleted.remove()
}

export const deleteRoom_2 = async (filter) => {
  return socketRoomModel.findOneAndDelete(filter)
}

// update a room
export const updateRoom = async (room_id, body) => {
  return socketRoomModel.findOneAndUpdate({ room_id: room_id }, body)
}
