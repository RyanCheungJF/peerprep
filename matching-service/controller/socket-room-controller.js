import { ormFindByRoomId as _findByRoomId } from '../model/socket-room-orm.js'

export const getRoom = async (req, res) => {

  const room = await _findByRoomId(req.body, {id1 : 0, id2 : 0, id1_present : 0, id2_present : 0, difficulty : 0, datetime : 0})
  if (room == null || room.err) {
    return res.status(500).json({ message: 'Error retrieving room.' })
  }

  return res.status(200).json(room)
}