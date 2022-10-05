import mongoose from 'mongoose'
import { saveRoom } from './repository.js'

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
