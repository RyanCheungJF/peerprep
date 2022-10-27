import mongoose from 'mongoose'

let Schema = mongoose.Schema
let SocketRoomModelSchema = new Schema({
  room_id: {
    type: String,
    required: true,
    unique: true,
  },
  qnsid: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  id1: {
    type: String,
    required: true,
    unique: true,
  },
  id2: {
    type: String,
    required: true,
    unique: true,
  },
  datetime: {
    type: Date,
    required: true,
    default: Date.now
  }

})

export default mongoose.model('SocketRoomModel', SocketRoomModelSchema)
