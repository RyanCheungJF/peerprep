import axios from 'axios'
import { URL_REVIEW_SVC } from '../constants.js'

export const invalidateReviewCache = async (userId) => {
  try {
    return axios.delete(`${URL_REVIEW_SVC}cache`, { params: { userId } })
  } catch (error) {
    console.error(
      `Failed to invalidate reviews cache on user logout (userId: ${userId}).
      Check review service logs for more details.`
    )
  }
}
