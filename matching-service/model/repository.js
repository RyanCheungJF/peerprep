import SocketRoomModel from './socket-room-model.js'
import 'dotenv/config'

// Set up mongoose connection
import mongoose from 'mongoose'

let mongoDB =
  process.env.ENV == 'PROD'
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.collection('socketroommodels')

export const createSocketRoom = async (params) => {
  return new SocketRoomModel(params)
}

export const findSocketRoom = async (query, projection) => {
//   console.log(
//     'bro query: ' + JSON.stringify(query) + ' projection: ' + projection
//   )
  if (JSON.stringify(query) == "{}") {
    return query
  }
  return SocketRoomModel.findOne(query)
}
