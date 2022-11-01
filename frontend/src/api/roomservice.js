import axios from 'axios'
import { URL_ROOM_SVC } from '../utils/configs'

export const findRoomService = async (filter) => {
  const res = await axios.get(URL_ROOM_SVC, { params: filter })
  return res
}

export const createRoomService = async (room) => {
  try {
    const res = await axios.post(URL_ROOM_SVC, room)
    return res
  } catch (err) {
    console.log(err)
  }
}

export const deleteRoomService = async (room_id) => {
  const res = await axios.delete(URL_ROOM_SVC + room_id)
  return res
}

export const updateRoomService = async (room_id, updatedFields) => {
  const res = await axios.patch(URL_ROOM_SVC + room_id, updatedFields)
  return res
}