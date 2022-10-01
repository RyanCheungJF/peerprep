import { Server } from "socket.io";
import express from 'express'
import cors from 'cors'

const PORT = 8001;

const io = new Server(PORT, { 
  cors: {
    origin: ["*", "http://localhost:3000", "http://localhost:8080"],
  },
});

io.on("connection", (socket) => {
  console.log('connected! ' + socket.id)
  socket.emit("room1", "Welcome to room1! " + socket.id + "\n")
  socket.on("room1", (message) => {
    socket.broadcast.emit("room1", message)
    console.log("message: " + message)
  })
});
io.on("disconnect", (socket) => {
  console.log('disconnected! ' + socket.id)
});


const app = express()
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())
import { getRoom } from './controller/socket-room-controller.js'

const router = express.Router()

router.get('/', getRoom)

app.use('/api/room', router).all((_, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
})

app.listen(8002, () => console.log('room-service listening on port 8002'))