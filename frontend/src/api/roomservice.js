import axios from 'axios'
import { URL_ROOM_SVC } from '../utils/configs'

export const createRoomSvc = async (room) => {
  try {
    console.log('room bro2: ' + JSON.stringify(room))
    const res = await axios.post(URL_ROOM_SVC, room)
    console.log('res bro2: ' + JSON.stringify(res.data))
    return res
  } catch (err) {
    console.log(err)
  }
}

export const deleteRoomSvc = async (room_id) => {
  const res = await axios.delete(URL_ROOM_SVC + '/' + room_id)
  return res
}
