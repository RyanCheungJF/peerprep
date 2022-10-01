import { Server } from 'socket.io'
import express from 'express'
import cors from 'cors'
import { getRoom } from './controller/socket-room-controller.js'

const PORT = 8001

const io = new Server(PORT, {
  cors: {
    origin: ['*'],
  },
})

const app = express()
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

app.use('/api/room', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8002, () => console.log('room-service listening on port 8002'))
