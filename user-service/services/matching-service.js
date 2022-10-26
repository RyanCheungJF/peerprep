import axios from 'axios'
import { URL_MATCHING_SVC } from '../constants.js'

export const deleteMatchRoom = async (username) => {
  try {
    return axios.delete(`${URL_MATCHING_SVC}user/${username}/room`)
  } catch (error) {
    console.error(
      `Failed to delete matching-svc room for user ${userId}. Check matching-svc logs for more details.`
    )
  }
}
