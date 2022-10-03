import { Server } from 'socket.io'

const SOCKET_PORT = 8400

const io = new Server(SOCKET_PORT, {
  cors: { origin: ['*', 'http://localhost:3000'] },
})

io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    console.log('socket connected', room)
    socket.join(room)
  })

  socket.on('send-message', (message, room) => {
    console.log('message sent:', message)
    socket.to(room).emit('receive-message', message)
  })

  socket.on('push-code', (code, room) => {
    console.log(`Pushing up code for room ${room}: ${code}`)
    socket.to(room).emit('pull-code', code)
  })
})
