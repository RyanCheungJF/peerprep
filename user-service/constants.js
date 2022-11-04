import 'dotenv/config'

export const REDIS_JWT_KEY = 'invalid_jwt'
export const JWT_EXPIRY = 15 * 60 // 15 mins in seconds
export const REDIS_USER_KEY = 'curr_jwt_user'

export const URI_MATCHING_SVC =
  process.env.URI_MATCHING_SVC || 'http://localhost:8200'
export const URL_MATCHING_SVC = `${URI_MATCHING_SVC}/api/match/`

export const URI_COLLAB_SVC =
  process.env.URI_COLLAB_SVC || 'http://localhost:8400'
export const URL_COLLAB_SVC = `${URI_COLLAB_SVC}/api/collaboration/`

export const URI_REVIEW_SVC =
  process.env.URI_REVIEW_SVC || 'http://localhost:8500'
export const URL_REVIEW_SVC = `${URI_REVIEW_SVC}/api/review/`
