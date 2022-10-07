import { saveChatMsg } from '../model/redis-repository.js'

export const messageHandler = (socket) => (message, roomId, fromUserId) => {
  socket.to(roomId).emit('receive-message', message)
  const messageToSave = {
    content: message,
    from: fromUserId,
  }
  saveChatMsg(messageToSave, roomId)
}
