import {
  findAllRooms,
  findOneRoom,
  createRoom,
  updateRoom,
  deleteRoom,
} from './repository.js'

export const ormFindAllRooms = async (filter) => {
  try {
    return await findAllRooms(filter)
  } catch (err) {
    console.log('ERROR: Could not query for rooms')
    return { err }
  }
}

export const ormFindOneRoom = async (filter) => {
  try {
    return await findOneRoom(filter)
  } catch (err) {
    console.log('ERROR: Could not query for room')
    return { err }
  }
}
export const ormCreateRoom = async (room, res) => {
  try {
    const roomModel = await createRoom(room)
    const newRoom = roomModel.save((err) => {
      if (err) {
        // console.log(err)
        if (err.name === 'MongoServerError' && err.code === 11000) {
          // Duplicate room_id
          return res
            .status(409)
            .send({ success: false, message: 'Room already exist!' })
        } else {
          // Some other error
          return res.status(422).send({ success: false, message: err })
        }
      } else {
        return res
          .status(201)
          .send({ success: true, message: 'Room created successfully!' })
      }
    })
  } catch (err) {
    console.log('ERROR: Could not create room')
    return { err }
  }
}

export const ormUpdateRoom = async (room_id, body) => {
  try {
    return await updateRoom(room_id, body)
  } catch (err) {
    console.log('ERROR: Could not update room')
    return { err }
  }
}

export const ormDeleteRoom = async (room) => {
  try {
    return await deleteRoom(room)
  } catch (err) {
    console.log('ERROR: Could not delete room')
    return { err }
  }
}
