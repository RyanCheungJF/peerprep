import axios from 'axios'
import Cookies from 'js-cookie'
import {
  URL_USER_SVC,
  URL_USER_LOGIN_SVC,
  URL_USER_LOGOUT_SVC,
} from '../utils/configs'
import {
  STATUS_CODE_SUCCESS,
  STATUS_CODE_UNAUTHORIZED,
  STATUS_CODE_FORBIDDEN,
  COOKIES_AUTH_TOKEN,
  AUTH_REDIRECT,
} from '../utils/constants'
import { getJWTExpiry } from '../utils/main'
import { loginUrl } from '../utils/routeConstants'

// custom axios instance with request and response interceptors to handle auth
const axiosWithAuth = axios.create()

// attach user's JWT bearer token to every outgoing request
axiosWithAuth.interceptors.request.use(
  (config) => {
    return {
      ...config,
      ...getAuthHeader(),
    }
  },
  // still return the original rejected promise, if any
  (error) => Promise.reject(error)
)

// if user is unauthorized or unauthenticated, automatically redirect user to login page
axiosWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === STATUS_CODE_FORBIDDEN ||
      error?.response?.status === STATUS_CODE_UNAUTHORIZED
    ) {
      window.localStorage.setItem(AUTH_REDIRECT, window.location.pathname)
      Cookies.remove(COOKIES_AUTH_TOKEN)
      window.location.replace(`${window.location.origin}${loginUrl}`)
    }

    // still return the original rejected promise - don't swallow it up and let the request silently fail...
    return Promise.reject(error)
  }
)

export const getUser = async () => {
  return axiosWithAuth.get(URL_USER_SVC)
}

export const loginUser = async (username, password) => {
  const res = await axios.post(URL_USER_LOGIN_SVC, { username, password })
  if (res?.status === STATUS_CODE_SUCCESS) {
    Cookies.set(COOKIES_AUTH_TOKEN, res.data.token, { expires: getJWTExpiry() })
  }
  return res
}

export const logoutUser = async () => {
  const res = await axiosWithAuth.post(URL_USER_LOGOUT_SVC)
  if (res?.status === STATUS_CODE_SUCCESS) {
    Cookies.remove(COOKIES_AUTH_TOKEN)
  }
  return res
}

export const signupUser = async (username, password) =>
  await axios.post(URL_USER_SVC, { username, password })

export const deleteUser = async (username) => {
  const res = await axiosWithAuth.delete(URL_USER_SVC, {
    data: { username },
  })
  if (res?.status === STATUS_CODE_SUCCESS) {
    Cookies.remove(COOKIES_AUTH_TOKEN)
  }
  return res
}

export const changeUserPassword = async (username, newPassword) => {
  const res = await axiosWithAuth.put(URL_USER_SVC, { username, newPassword })
  console.log(res)
  return res
}

export const getAuthHeader = () => {
  const token = isUserLoggedIn() ? getJWT() : ''
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const getJWT = () => {
  const token = Cookies.get(COOKIES_AUTH_TOKEN)
  if (!token) {
    throw new Error('JWT not found in cookies.')
  }
  return token
}

export const isUserLoggedIn = () => {
  // double !! converts an object to boolean
  return !!Cookies.get(COOKIES_AUTH_TOKEN)
}
