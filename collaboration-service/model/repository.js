import CollaborationRoomModel from './collaboration-room-model.js'
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

export const saveRoom = async (room) => {
  return CollaborationRoomModel.updateOne({ roomId: room.roomId }, room, {
    upsert: true,
  })
}

export const getRoom = async (roomId) => {
  return CollaborationRoomModel.findOne({ roomId })
}

export const deleteRoom = async (roomId) => {
  return CollaborationRoomModel.deleteOne({ roomId })
}
