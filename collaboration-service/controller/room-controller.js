import {
  getRoom as _redisGetRoom,
  deleteRoom as _redisDeleteRoom,
} from '../model/redis-repository.js'
import {
  ormSaveRoom as _saveRoom,
  ormGetRoom as _getRoom,
  ormDeleteRoom as _deleteRoom,
} from '../model/collaboration-room-orm.js'

/**
 * Retrieves a room from redis and saves it to the DB for persistence
 */
export const saveRoom = (socket) => async () => {
  const roomId = getCollabRoomId([...socket.rooms])
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
    socket.emit('restore-chat', room.chat ?? [])
    socket.emit('restore-code', room.code ?? '')
  }
}

export const deleteRoom = (_) => async (roomId) => {
  await _redisDeleteRoom(roomId)
  await _deleteRoom(roomId)
}

export const broadcastConnection = (io, socket) => async (roomId) => {
  // get a list of clients in the socket.io room
  const allSocketIORooms = io.sockets.adapter.rooms
  const roomClients = allSocketIORooms.get(roomId)
  const serializableClients = [...roomClients.keys()]

  socket.to(roomId).emit('partner-connected', serializableClients)
  // Also send to the socket that's just connected because it doesn't receive the room event above.
  // I suspect socket.io just doesn't guarantee serial execution/protect against such race conditions
  socket.emit('partner-connected', serializableClients)
}

export const broadcastDisconnection = (socket) => () => {
  const roomId = getCollabRoomId([...socket.rooms])
  if (roomId) {
    socket.to(roomId).emit('partner-disconnected')
  }
}

const getCollabRoomId = (rooms) =>
  rooms.find((r) => r.startsWith('collab-room:'))
