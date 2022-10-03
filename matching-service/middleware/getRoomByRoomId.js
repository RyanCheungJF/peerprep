import { findOneRoom } from '../model/repository.js'

async function getRoomByRoomId(req, res, next) {
  let room
  try {
    room = await findOneRoom({ room_id: req.params.room_id })
    if (!room) {
      return res.status(404).json({ message: 'Cannot find room' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.room = room
  next()
}

export default getRoomByRoomId
