import { createClient } from 'redis'
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
}

export const saveSharedCode = async (code, roomId) => {
  const key = getSharedCodeKey(roomId)
  await client.set(key, code)
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

/* Redis key generators */
const getChatMsgKey = (roomId) => `${roomId}:chat`
const getSharedCodeKey = (roomId) => `${roomId}:code`
