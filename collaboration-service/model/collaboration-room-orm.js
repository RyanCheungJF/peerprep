import mongoose from 'mongoose'
import { saveRoom, getRoom, deleteRoom } from './repository.js'

export const ormSaveRoom = async (room) => {
  try {
    // save the user id in each chat msg as an actual mongo id object
    const chatToSave = room.chat.map((msg) => ({
      ...msg,
      from: mongoose.Types.ObjectId(msg.from),
    }))

    return await saveRoom({ ...room, chat: chatToSave })
  } catch (err) {
    console.log('ERROR: Could not save room to MongoDB', err)
    return { err }
  }
}

export const ormGetRoom = async (roomId) => {
  try {
    return await getRoom(roomId)
  } catch (err) {
    console.log('ERROR: Could not get room from MongoDB', err)
    return { err }
  }
}

export const ormDeleteRoom = async (roomId) => {
  try {
    return await deleteRoom(roomId)
  } catch (err) {
    console.log('ERROR: Could not delete room from MongoDB', err)
    return { err }
  }
}
