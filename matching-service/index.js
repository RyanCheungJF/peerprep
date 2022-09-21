import { Server } from "socket.io";

const PORT = 8001;

const io = new Server(PORT, { 
  cors: {
    origin: ["*", "http://localhost:3000"],
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