import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { getRoom } from './controller/socket-room-controller.js'

const SOCKET_PORT = 8300

const app = express()
const io = new Server(SOCKET_PORT, {
  cors: { origin: ['*', 'http://localhost:3000'] },
})

io.on('connection', (socket) => {
  socket.on('send-message', (message) => {
    socket.broadcast.emit('receive-message', message)
  })
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/match', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8200, () => console.log('matching-service listening on port 8200'))
