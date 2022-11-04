import axios from 'axios'
import { getUser } from './userService'
import { URL_REVIEW_SVC } from '../utils/configs'

export const getReviewStats = async (userId) => {
  const res = await axios.get(URL_REVIEW_SVC, {
    params: {
      userId,
    },
  })
  return res
}

export const createReviewStats = async (revieweeid, reviewerid, scores) => {
  await getUser() // verify user is logged in first
  await axios.post(URL_REVIEW_SVC, {
    revieweeid,
    reviewerid,
    scores,
  })
}
