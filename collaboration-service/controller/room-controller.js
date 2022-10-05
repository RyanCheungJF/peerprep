import { getRoom } from '../model/redis-repository.js'
import { ormSaveRoom as _saveRoom } from '../model/collaboration-room-orm.js'

export const saveRoom = (socket) => async () => {
  const rooms = [...socket.rooms]
  const roomId = rooms.find((r) => r.startsWith('room:'))
  if (roomId) {
    const redisRoom = await getRoom(roomId)
    await _saveRoom(redisRoom)
  }
}

// todo: add getroom fxn and broadcast stored data to clients
