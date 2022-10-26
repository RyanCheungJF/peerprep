import { ormDeleteRoom as _deleteRoom } from '../model/collaboration-room-orm.js'
import { COLLAB_ROOM_PREFIX } from '../constants.js'

export const deleteRoom = async (req, res) => {
  const { roomId } = req.params
  if (!roomId) {
    return res.status(400).json({ message: 'Room ID not provided.' })
  }

  const deletionResult = await _deleteRoom(`${COLLAB_ROOM_PREFIX}${roomId}`)

  if (deletionResult.err) {
    return res.status(500).json({ message: 'Error deleting room.' })
  }
  if (deletionResult.deletedCount === 0) {
    return res.status(404).json({ message: `Room ${roomId} doesn't exist.` })
  }

  return res
    .status(200)
    .json({ message: `Successfully deleted room ${roomId}.` })
}
