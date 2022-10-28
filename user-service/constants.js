import 'dotenv/config'

export const REDIS_JWT_KEY = 'invalid_jwt'
export const JWT_EXPIRY = 15 * 60 // 15 mins in seconds

export const URI_REVIEW_SVC =
  process.env.URI_REVIEW_SVC || 'http://localhost:8500'
export const URL_REVIEW_SVC = `${URI_REVIEW_SVC}/api/review/`
