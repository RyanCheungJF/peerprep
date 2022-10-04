import { saveChatMsg } from '../model/redis-repository.js'

export const messageHandler = (socket) => (message, room, fromUserId) => {
  console.log('message sent:', message)

  socket.to(room).emit('receive-message', message)
  const messageToSave = {
    content: message,
    from: fromUserId,
  }
  saveChatMsg(messageToSave, room)
}
