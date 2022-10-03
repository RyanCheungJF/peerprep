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
export const ormCreateRoom = async (room) => {
  try {
    console.log("broooooo orm: " + JSON.stringify(room))
    return await createRoom(room)
  } catch (err) {
    console.log('ERROR: Could not create room')
    return { err }
  }
}

export const ormuUpdateRoom = async (room) => {
  try {
    return await updateRoom(room)
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