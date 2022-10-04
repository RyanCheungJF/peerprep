import { Server } from 'socket.io'

import { messageHandler } from './controller/chat-controller.js'
import { sharedCodeHandler } from './controller/shared-code-controller.js'

const SOCKET_PORT = 8400

const io = new Server(SOCKET_PORT, {
  cors: { origin: ['*', 'http://localhost:3000'] },
})

io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    console.log('socket connected', room)
    socket.join(room)
  })

  socket.on('send-message', messageHandler(socket))
  socket.on('push-code', sharedCodeHandler(socket))

  socket.on('disconnect', (reason) => {
    console.log('Socket disconnected', reason)
    // TODO: persist room data in redis to mongodb
  })
})
