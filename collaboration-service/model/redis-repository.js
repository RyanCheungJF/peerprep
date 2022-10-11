import { createClient } from 'redis'
import { REDIS_EXPIRY } from '../constants.js'
import 'dotenv/config'

const REDIS_URI = process.env.REDIS_URI || 'localhost:6379'

console.log('(REDIS) Connecting to url:', REDIS_URI)
const client = createClient({
  url: `redis://default:@${REDIS_URI}`,
})

client.on('error', (err) => console.error('Redis client connection error', err))
client.on('connect', () => console.log('REDIS CONNECTED'))
await client.connect()

export const saveChatMsg = async (msg, roomId) => {
  const key = getChatMsgKey(roomId)
  await client.rPush(key, JSON.stringify(msg))
  return client.expire(key, REDIS_EXPIRY)
}

export const saveSharedCode = async (code, roomId) => {
  const key = getSharedCodeKey(roomId)
  await client.set(key, code)
  return client.expire(key, REDIS_EXPIRY)
}

export const getRoom = async (roomId) => {
  return {
    roomId,
    chat: await getChatMsgs(roomId),
    code: await getSharedCode(roomId),
  }
}

const getChatMsgs = async (roomId) => {
  const key = getChatMsgKey(roomId)
  // get entire redis list associated with the key
  const jsonMsgs = await client.lRange(key, 0, -1)
  return jsonMsgs.map(JSON.parse)
}

const getSharedCode = async (roomId) => {
  const key = getSharedCodeKey(roomId)
  return client.get(key)
}

export const deleteRoom = async (roomId) => {
  return Promise.all([deleteChatMsgs(roomId), deleteSharedCode(roomId)])
}

const deleteChatMsgs = async (roomId) => {
  const key = getChatMsgKey(roomId)
  return client.del(key)
}

const deleteSharedCode = async (roomId) => {
  const key = getSharedCodeKey(roomId)
  return client.del(key)
}

/* Redis key generators */
const getChatMsgKey = (roomId) => `${roomId}:chat`
const getSharedCodeKey = (roomId) => `${roomId}:code`
