import { createClient } from 'redis'
import { REDIS_JWT_KEY, JWT_EXPIRY } from '../constants.js'
import 'dotenv/config'

const REDIS_URI = process.env.REDIS_URI || 'localhost:6379'
console.log('(REDIS) Connecting to url:', REDIS_URI)
const client = createClient({
  url: `redis://default:@${REDIS_URI}`,
})
client.on('error', (err) => console.error('Redis client connection error', err))
client.on('connect', () => console.log('REDIS CONNECTED'))
await client.connect()

const getTokenKey = (token) => `${REDIS_JWT_KEY}_${token}`

export const addJWT = async (token) => {
  const token_key = getTokenKey(token)
  await client.set(token_key, token)
  return client.expire(token_key, JWT_EXPIRY) // returns 1 if successfully set, 0 otherwise
}

export const checkJWTExists = async (token) => {
  const token_key = getTokenKey(token)
  const isTokenBlacklisted = await client.get(token_key)
  return !!isTokenBlacklisted
}
