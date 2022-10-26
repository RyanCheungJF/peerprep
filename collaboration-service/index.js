import { Server } from 'socket.io'
import express from 'express'
import cors from 'cors'

import { messageHandler } from './controller/chat-controller.js'
import { sharedCodeHandler } from './controller/shared-code-controller.js'
import {
  saveRoom,
  getRoom,
  deleteRoom,
  broadcastConnection,
  broadcastDisconnection,
} from './controller/room-controller.js'

const PORT = 8400

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.options('*', cors())

const router = express.Router()
router.delete('/', () => {
  console.log('delete called')
})

app.use('/api/collaboration', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

const server = app.listen(PORT, () =>
  console.log(`matching-service listening on port ${PORT}`)
)
const io = new Server(server, { cors: { origin: '*' } })
io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    console.log('socket joining room:', roomId)
    socket.join(roomId)
  })
  socket.on('join-room', getRoom(socket))
  socket.on('join-room', broadcastConnection(io, socket))

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
