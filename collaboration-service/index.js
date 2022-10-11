import { Server } from 'socket.io'

import { messageHandler } from './controller/chat-controller.js'
import { sharedCodeHandler } from './controller/shared-code-controller.js'
import {
  saveRoom,
  getRoom,
  deleteRoom,
  broadcastConnection,
  broadcastDisconnection,
} from './controller/room-controller.js'

const SOCKET_PORT = 8400

const io = new Server(SOCKET_PORT, {
  cors: { origin: ['*', 'http://localhost:3000'] },
})

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    console.log('socket joining room:', roomId)
    socket.join(roomId)
  })
  socket.on('join-room', getRoom(socket))
  socket.on('join-room', broadcastConnection(socket))

  socket.on('leave-room', deleteRoom(socket))

  socket.on('send-message', messageHandler(socket))
  socket.on('push-code', sharedCodeHandler(socket))

  // Note: we listen for the 'disconnecting' event and not 'disconnected'.
  // The 'disconnected' event is emitted after the socket leaves all rooms,
  // so it'll be too late to find the socket's room and persist things to the db then.
  socket.on('disconnecting', saveRoom(socket))
  socket.on('disconnecting', broadcastDisconnection(socket))

  // Stretch goal/todo: detect SIGTERM and persist all currently open socket rooms to db before spinning down.
  // (prevents data loss if container is spun down)
})
