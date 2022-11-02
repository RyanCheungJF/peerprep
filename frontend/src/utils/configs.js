//------- CONNECTION OR SETUP CONFIGS --------//
const URI_USER_SVC =
  process.env.REACT_APP_URI_USER_SVC || 'http://localhost:8000'
const URI_QUESTION_SVC =
  process.env.REACT_APP_URI_QUESTION_SVC || 'http://localhost:8100'
const URI_MATCHING_SVC =
  process.env.REACT_APP_URI_MATCHING_SVC || 'http://localhost:8200'
export const MATCHING_URL =
  process.env.REACT_APP_URI_MATCHING_URL || 'http://localhost:8300'
export const COLLAB_URL =
  process.env.REACT_APP_URI_COLLAB_URL || 'http://localhost:8400'
export const URI_REVIEW_SVC =
  process.env.REACT_APP_URI_REVIEW_SVC || 'http://localhost:8500'

const PREFIX_USER_SVC = '/api/user'
const PREFIX_QUESTION_SVC = '/api/question'
const PREFIX_MATCH_SVC = '/api/match/'
const PREFIX_ROOM_SVC = '/api/match/room/'
const PREFIX_REVIEW_SVC = '/api/review/'

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
export const URL_USER_LOGIN_SVC = `${URL_USER_SVC}/login`
export const URL_USER_LOGOUT_SVC = `${URL_USER_SVC}/logout`

export const URL_QUESTION_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC

export const URL_MATCH_SVC = URI_MATCHING_SVC + PREFIX_MATCH_SVC
export const URL_FIND_MATCH_SVC = `${URL_MATCH_SVC}/match`
export const URL_ROOM_SVC = URI_MATCHING_SVC + PREFIX_ROOM_SVC

export const URL_REVIEW_SVC = URI_REVIEW_SVC + PREFIX_REVIEW_SVC
