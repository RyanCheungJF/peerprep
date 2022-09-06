import axios from 'axios'
import Cookies from 'js-cookie'
import { URL_USER_LOGIN_SVC } from '../utils/configs'
import {
  STATUS_CODE_SUCCESS,
  COOKIES_AUTH_TOKEN,
  JWT_EXPIRY,
} from '../utils/constants'

export const loginUser = async (username, password) => {
  const res = await axios.post(URL_USER_LOGIN_SVC, { username, password })
  if (res?.status === STATUS_CODE_SUCCESS) {
    Cookies.set(COOKIES_AUTH_TOKEN, res.data.token, { expires: JWT_EXPIRY })
  }
  return res
}

// include signup user

export const changeUserPassword = async(username, newPassword) => {
  const res = await axios.put(URL_USER_LOGIN_SVC, { username, newPassword })
  return res
}
