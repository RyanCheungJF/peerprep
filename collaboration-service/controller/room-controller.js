import { getRoom as _redisGetRoom } from '../model/redis-repository.js'
import {
  ormSaveRoom as _saveRoom,
  ormGetRoom as _getRoom,
} from '../model/collaboration-room-orm.js'

/**
 * Retrieves a room from redis and saves it to the DB for persistence
 */
export const saveRoom = (socket) => async () => {
  const rooms = [...socket.rooms]
  const roomId = rooms.find((r) => r.startsWith('room:'))
  if (roomId) {
    const redisRoom = await _redisGetRoom(roomId)
    await _saveRoom(redisRoom)
  }
}

/**
 * Given a room id, retrieves the room's data from the DB (if any)
 * and broadcasts it to clients in the room
 */
export const getRoom = (socket) => async (roomId) => {
  const room = await _getRoom(roomId)
  if (room) {
    socket.emit('restore-chat', room.chat)
    socket.emit('restore-code', room.code)
  }
}
