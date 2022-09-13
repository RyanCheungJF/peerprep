import axios from 'axios'
import Cookies from 'js-cookie'
import {
  URL_USER_SVC,
  URL_USER_LOGIN_SVC,
  URL_USER_LOGOUT_SVC,
} from '../utils/configs'
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

export const logoutUser = async () => {
  const token = getJWT()
  const res = await axios.post(URL_USER_LOGOUT_SVC, { token })
  if (res?.status === STATUS_CODE_SUCCESS) {
    Cookies.remove(COOKIES_AUTH_TOKEN)
  }
  return res
}

// include signup user
export const deleteUser = async (username) => {
  const token = getJWT()
  const res = await axios.delete(URL_USER_SVC, { data: { username, token } })
  if (res?.status === STATUS_CODE_SUCCESS) {
    Cookies.remove(COOKIES_AUTH_TOKEN)
  }
  return res
}

export const changeUserPassword = async (username, newPassword) => {
  const res = await axios.put(URL_USER_SVC, { username, newPassword })
  console.log(res)
  return res
}

//--------Private utils----------//
const getJWT = () => {
  const token = Cookies.get(COOKIES_AUTH_TOKEN)
  if (!token) {
    throw new Error('JWT not found in cookies.')
  }
  return token
}
