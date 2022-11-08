import { createClient } from 'redis'
import { FIELDS } from '../controller/review-controller.js'
import 'dotenv/config'

const REDIS_URI = process.env.REDIS_URI || 'localhost:6379'
console.log('(REDIS) Connecting to url:', REDIS_URI)
const client = createClient({
  url: `redis://default:@${REDIS_URI}`,
})
client.on('error', (err) => console.error('Redis client connection error', err))
client.on('connect', () => console.log('REDIS CONNECTED'))
await client.connect()

const MINUTE = 60
const HOUR = MINUTE * 60

// for new writes and updates
export const writeScoresToCache = async (newScores) => {
  const cacheResults = await client.get(newScores.userId)
  const cacheData = JSON.parse(cacheResults)
  const data = {
    userId: newScores.userId,
    totalReviews: cacheData
      ? cacheData.totalReviews + 1
      : newScores.totalReviews,
  }
  FIELDS.forEach((field) => {
    data[field] = newScores[field] + (cacheData ? cacheData[field] : 0)
  })
  await client.set(newScores.userId, JSON.stringify(data), {
    EX: HOUR,
  })
}

// get scores or undefined
export const getScoresFromCache = async (userId) => {
  const cacheResults = await client.get(userId)
  const cacheData = JSON.parse(cacheResults)
  return cacheData
}

// upon logout/ user deletes account, we want a fresh pull upon next login
export const deleteScoresFromCache = async (userId) => {
  try {
    await client.del(userId)
    return true
  } catch (err) {
    return false
  }
}
