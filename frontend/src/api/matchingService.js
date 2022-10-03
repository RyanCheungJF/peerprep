import axios from 'axios'
import { URL_MATCH_SVC } from '../utils/configs'

export const findMatch = async (uuid, socketID, difficulty) => {
  const res = await axios.post(URL_MATCH_SVC, {
    uuid,
    socketID,
    difficulty,
  })
  return res
}

export const deleteMatch = async (uuid, socketID, difficulty) => {
  const res = await axios.delete(URL_MATCH_SVC, {
    data: {
      uuid,
      socketID,
      difficulty,
    },
  })
  return res
}
