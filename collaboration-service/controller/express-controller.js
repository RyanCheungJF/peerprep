import { ormDeleteRoom as _deleteRoom } from '../model/collaboration-room-orm.js'
import { deleteRoom as _redisDeleteRoom } from '../model/redis-repository.js'
import { COLLAB_ROOM_PREFIX } from '../constants.js'

export const deleteRoom = async (req, res) => {
  const { roomId } = req.params
  if (!roomId) {
    return res.status(400).json({ message: 'Room ID not provided.' })
  }

  const collabRoomId = `${COLLAB_ROOM_PREFIX}${roomId}`
  const [dbResult, redisResult] = await Promise.allSettled([
    _deleteRoom(collabRoomId),
    _redisDeleteRoom(collabRoomId), //redis operation doesn't fail or throw erors
  ])

  if (
    dbResult.status === 'rejected' ||
    dbResult.value.err ||
    redisResult.status === 'rejected'
  ) {
    return res.status(500).json({ message: 'Error deleting room.' })
  }
  if (dbResult.value.deletedCount === 0) {
    return res.status(404).json({ message: `Room ${roomId} doesn't exist.` })
  }

  return res
    .status(200)
    .json({ message: `Successfully deleted room ${roomId}.` })
}
