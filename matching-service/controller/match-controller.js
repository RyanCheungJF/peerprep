import {
  findMatchInCache,
  deleteMatchInCache,
} from '../model/redis-repository.js'

import {
  ormFindAllRooms,
  ormFindOneRoom,
  ormCreateRoom,
  ormDeleteRoom,
  ormuUpdateRoom,
} from '../model/socket-room-orm.js'

export const findMatch = async (req, res) => {
  try {
    const { uuid, socketID, difficulty } = req.body
    if (!(uuid && socketID && difficulty)) {
      return res
        .status(400)
        .json({ message: 'One or more fields are missing!' })
    }

    const cacheUser = await findMatchInCache(difficulty, uuid, socketID)

    if (!cacheUser) {
      return res.status(204)
    }

    return res
      .status(200)
      .json({ uuid: cacheUser.uuid, socketID: cacheUser.socketID })
  } catch (err) {
    return res.status(500).json({ message: 'Error with Redis!' })
  }
}

export const deleteMatch = async (req, res) => {
  try {
    const { uuid, socketID, difficulty } = req.body
    if (!(uuid && socketID && difficulty)) {
      return res
        .status(400)
        .json({ message: 'One or more fields are missing!' })
    }

    const deleteUser = await deleteMatchInCache(difficulty, uuid, socketID)

    return deleteUser
      ? res.status(200).json({ message: 'Deleted entry from cache!' })
      : res.status(404).json({ message: 'Could not delete' })
  } catch (err) {
    return res.status(500).json({ message: 'Error with Redis!' })
  }
}

export const findAllRooms = async (req, res) => {
  console.log('GET /api/rooms ' + JSON.stringify(req.query))
  try {
    const rooms = await ormFindAllRooms(req.query)
    return res.status(200).json(rooms)
  } catch (err) {
    return res.status(500).json({ message: 'Error with finding all room!' })
  }
}

export const findOneRoom = async (req, res) => {
  console.log('GET /api/room ' + JSON.stringify(req.query))

  try {
    const rooms = await ormFindOneRoom(req.query)
    return res.status(200).json(rooms)
  } catch (err) {
    return res.status(500).json({ message: 'Error with finding all room!' })
  }
}

export const createRoom = async (req, res) => {
  console.log('POST /api/room ' + JSON.stringify(req.body))

  try {
    const room = await ormCreateRoom(req.body)
    const newRoom = room.save((err) => {
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
    return res.status(500).json({ message: 'Error with creating room!' })
  }
}

export const updateRoom = async (req, res) => {
  console.log('PATCH /api/room ' + JSON.stringify(req.body))

  if (req.body.room_id != null) {
    res.room.room_id = req.body.room_id
  }
  if (req.body.id1 != null) {
    res.room.id1 = req.body.id1
  }
  if (req.body.id2 != null) {
    res.room.id2 = req.body.id2
  }
  if (req.body.id1_present != null) {
    res.room.id1_present = req.body.id1_present
  }
  if (req.body.id2_present != null) {
    res.room.id2_present = req.body.id2_present
  }
  if (req.body.datetime != null) {
    res.room.datetime = req.body.datetime
  }
  if (req.body.difficulty != null) {
    res.room.difficulty = req.body.difficulty
  }
  try {
    const room = await ormuUpdateRoom(res.room)
    return res.status(200).json(room)
  } catch (err) {
    return res.status(500).json({ message: 'Error with updating room!' })
  }
}

export const deleteRoom = async (req, res) => {
  console.log('DELETE /api/room ' + JSON.stringify(req.params.room_id))

  try {
    const room = await ormDeleteRoom(res.room)
    return res.status(200).json({ message: 'Room ' + room.room_id + ' deleted successfully!' })
  } catch (err) {
    return res.status(500).json({ message: 'Error with deleting room!' })
  }
}
