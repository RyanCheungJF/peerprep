import socketRoomModel from '../model/socket-room-model.js'
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
db.once('open', () => console.log('Connected to MongoDB'))
db.collection('socketroommodels')

// find all rooms
export const findAllRooms = async (filter) => {
  return socketRoomModel.find(filter)
}

// find one room by filter 
export const findOneRoom = async (filter) => {
  return socketRoomModel.findOne(filter)
}

// create a room
export const createRoom = async (params) => {
  console.log("brooooo repo: " + JSON.stringify(params))
  return new socketRoomModel(params)
}

// delete a room
export const deleteRoom = async (roomToBeDeleted) => {
  return roomToBeDeleted.remove()
}

// update a room
export const updateRoom = async (roomToBeUpdated) => {
  return roomToBeUpdated.save()
}

// // get all rooms
// router.get('/', async (req, res) => {
//   console.log('get all ' + JSON.stringify(req.query))

//   try {
//     const rooms = await socketRoomModel.find()
//     res.status(200).json(rooms)
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: err.message })
//   }
// })
// // get one room, send parameters as params
// router.get('/query', async (req, res) => {
//   console.log('get one ' + JSON.stringify(req.query))
//   try {
//     const rooms = await socketRoomModel.findOne(req.query)
//     if (rooms == null || JSON.stringify(req.query) == '{}') {
//       res.status(200).json({})
//     } else {
//       res.status(200).json(rooms)
//     }
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: err.message })
//   }
// })

// // create room
// router.post('/', async (req, res) => {
//   console.log('create one ' + JSON.stringify(req.body))

//   try {
//     const room = new socketRoomModel(req.body)
//     // function inside save is to catch mongodb errors
//     var error = false
//     const newRoom = room.save((err) => {
//       if (err) {
//         // console.log(err)
//         if (err.name === 'MongoServerError' && err.code === 11000) {
//           // Duplicate room_id
//           return res
//             .status(409)
//             .send({ success: false, message: 'Room already exist!' })
//         } else {
//           // Some other error
//           return res.status(422).send({ success: false, message: err })
//         }
//       } else {
//         return res
//           .status(201)
//           .send({ success: true, message: 'Room created successfully!' })
//       }
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ message: err.message })
//   }
// })
// // delete room
// router.delete('/:room_id', getRoomByRoomId, async (req, res) => {
//   console.log('delete one ' + JSON.stringify(req.body))

//   try {
//     await res.room.remove()
//     res.status(200).json({ message: 'Deleted Room' })
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: err.message })
//   }
// })
// // update room, only pass in to body the fields you want to update
// router.patch('/:room_id', getRoomByRoomId, async (req, res) => {
//   console.log('udpate one ' + JSON.stringify(req.body))

//   if (req.body.room_id != null) {
//     res.room.room_id = req.body.room_id
//   }
//   if (req.body.id1 != null) {
//     res.room.id1 = req.body.id1
//   }
//   if (req.body.id2 != null) {
//     res.room.id2 = req.body.id2
//   }
//   if (req.body.id1_present != null) {
//     res.room.id1_present = req.body.id1_present
//   }
//   if (req.body.id2_present != null) {
//     res.room.id2_present = req.body.id2_present
//   }
//   if (req.body.datetime != null) {
//     res.room.datetime = req.body.datetime
//   }
//   if (req.body.difficulty != null) {
//     res.room.difficulty = req.body.difficulty
//   }

//   try {
//     const updatedRoom = await res.room.save()
//     res.status(200).json(updatedRoom)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

// async function getRoomByRoomId(req, res, next) {
//   let room
//   try {
//     room = await socketRoomModel.findOne({ room_id: req.params.room_id })
//     if (room == null) {
//       return res.status(404).json({ message: 'Cannot find room' })
//     }
//   } catch (err) {
//     return res.status(500).json({ message: err.message })
//   }

//   res.room = room
//   next()
// }
