//------- CONNECTION OR SETUP CONFIGS --------//
const URI_USER_SVC =
  process.env.REACT_APP_URI_USER_SVC || 'http://localhost:8000'

const PREFIX_USER_SVC = '/api/user'

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
export const URL_USER_LOGIN_SVC = `${URL_USER_SVC}/login`
export const URL_USER_LOGOUT_SVC = `${URL_USER_SVC}/logout`

export const MATCHING_URL = 'http://localhost:8300'