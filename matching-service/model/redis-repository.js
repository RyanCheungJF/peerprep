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

// initialization
const queue = []
await client.set('Easy', JSON.stringify(queue))
await client.set('Medium', JSON.stringify(queue))
await client.set('Hard', JSON.stringify(queue))

export const findMatchInCache = async (difficulty, uuid, socketID) => {
  const cacheResults = await client.get(difficulty)
  const cacheData = JSON.parse(cacheResults) || []
  if (cacheData.length > 0) {
    return cacheData[0]
  } else {
    const queue = [...cacheData, { uuid: uuid, socketID: socketID }]
    await client.set(difficulty, JSON.stringify(queue))
  }
}

export const deleteMatchInCache = async (difficulty, uuid, socketID) => {
  try {
    const cacheResults = await client.get(difficulty)
    const cacheData = JSON.parse(cacheResults)

    for (let i = 0; i < cacheData.length; i++) {
      if (cacheData[i].uuid == uuid && cacheData[i].socketID == socketID) {
        cacheData.splice(i, 1)
        break
      }
    }

    await client.set(difficulty, JSON.stringify(cacheData))
    return true
  } catch (err) {
    return false
  }
}

export const viewCache = async () => {
  const r = await client.get('Easy')
  console.log('Cache for ez', JSON.parse(r))
  return true
}
