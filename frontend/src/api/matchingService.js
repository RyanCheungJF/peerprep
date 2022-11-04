import axios from 'axios'
import { getUser } from './userService'
import { URL_MATCH_SVC } from '../utils/configs'

export const findMatch = async (uuid, socketID, difficulty) => {
  // Crucial to make sure the user's JWT is still valid when initiating a find-match operation.
  await getUser()
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
