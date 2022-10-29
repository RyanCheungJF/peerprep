import axios from 'axios'
import { URL_COLLAB_SVC } from '../constants.js'

export const deleteCollabRoom = async (roomId) => {
  try {
    return axios.delete(`${URL_COLLAB_SVC}room/${roomId}`)
  } catch (error) {
    console.error(
      `Failed to delete collab-svc room ${roomId}. Check collab-svc logs for more details.`
    )
  }
}
