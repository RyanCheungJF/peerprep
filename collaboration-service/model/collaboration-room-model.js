import mongoose from 'mongoose'

const RoomChatModelSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  from: {
    // mongo user id
    type: mongoose.Schema.ObjectId,
    required: true,
  },
})

const CollaborationRoomModelSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
  },
  chat: [RoomChatModelSchema],
})

export default mongoose.model(
  'CollaborationRoomModel',
  CollaborationRoomModelSchema
)
