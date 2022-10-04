import axios from 'axios'
import { URL_ROOM_SVC } from '../utils/configs'

export const findRoomSvc = async (filter) => {
    const res = await axios.get(URL_ROOM_SVC, { params: filter })
    return res
}

export const createRoomSvc = async (room) => {
  try {
    const res = await axios.post(URL_ROOM_SVC, room)
    return res
  } catch (err) {
    console.log(err)
  }
}

export const deleteRoomSvc = async (room_id) => {
  const res = await axios.delete(URL_ROOM_SVC + '/' + room_id)
  return res
}
