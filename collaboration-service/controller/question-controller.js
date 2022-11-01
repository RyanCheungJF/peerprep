export const changeQuestion = (socket) => (qnsid, roomId) => {
  socket.to(roomId).emit('change-question', qnsid)
}