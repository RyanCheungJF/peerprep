import { saveSharedCode } from '../model/redis-repository.js'

export const sharedCodeHandler = (socket) => (code, room) => {
  console.log(`Pushing up code for room ${room}: ${code}`)

  socket.to(room).emit('pull-code', code)
  saveSharedCode(code, room)
}
