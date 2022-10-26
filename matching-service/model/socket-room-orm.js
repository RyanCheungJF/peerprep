import {
  findAllRooms,
  findOneRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  deleteRoom_2,
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
    const roomModel = await createRoom(room)
    const test = await roomModel.save()
  } catch (err) {
    console.log('ERROR: Could not create room')
    return err
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

export const ormDeleteRoomByUserId = async (userId) => {
  try {
    return deleteRoom_2({ $or: [{ id1: userId }, { id2: userId }] })
  } catch (err) {
    console.log('ERROR: Could not delete room')
    return { err }
  }
}
