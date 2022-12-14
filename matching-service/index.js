import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import {
  findMatch,
  deleteMatch,
  findAllRooms,
  findOneRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  deleteRoomByUsername,
} from './controller/match-controller.js'

const SOCKET_PORT = 8300

const app = express()
const io = new Server(SOCKET_PORT, {
  cors: { origin: '*' },
})

io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    socket.join(room)
  })
  socket.on('notify-partner', (room, username, difficulty, qnsid) => {
    socket.to(room).emit('found-connection', username, difficulty, qnsid)
  })
  socket.on('leave-room', (room, message) => {
    socket.to(room).emit('partner-left', message)
  })
  socket.on('request-partner-uuid', (room) => {
    socket.to(room).emit('get-partner-uuid')
  })
  socket.on('send-uuid', (room, uuid) => {
    socket.to(room).emit('partner-uuid', uuid)
  })
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

router.post('/', findMatch)
router.delete('/', deleteMatch)
router.get('/rooms', findAllRooms)
router.get('/room', findOneRoom)
router.post('/room', createRoom)
router.patch('/room/:room_id', updateRoom)
router.delete('/room/:room_id', deleteRoom)
router.delete('/user/:username/room', deleteRoomByUsername(io))

app.use('/api/match', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8200, () => console.log('matching-service listening on port 8200'))
