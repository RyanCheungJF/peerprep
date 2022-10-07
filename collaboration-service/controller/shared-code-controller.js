import { saveSharedCode } from '../model/redis-repository.js'

export const sharedCodeHandler = (socket) => (code, roomId) => {
  socket.to(roomId).emit('pull-code', code)
  saveSharedCode(code, roomId)
}
