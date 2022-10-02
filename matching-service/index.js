import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import {
  findMatch,
  deleteMatch,
  viewMatch,
} from './controller/match-controller.js'

const SOCKET_PORT = 8300

const app = express()
const io = new Server(SOCKET_PORT, {
  cors: { origin: ['*', 'http://localhost:3000'] },
})

io.on('connection', (socket) => {
  socket.on('send-message', (message, room) => {
    if (room == '') {
      socket.broadcast.emit('receive-message', message)
    } else {
      socket.to(room).emit('receive-message', message)
    }
  })
  socket.on('join-room', (room) => {
    socket.join(room)
  })
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

router.post('/', findMatch)
router.delete('/', deleteMatch)
router.get('/', viewMatch)

app.use('/api/match', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8200, () => console.log('matching-service listening on port 8200'))
