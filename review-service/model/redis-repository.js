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

const MINUTE = 60
const HOUR = MINUTE * 60

// for new writes and updates
export const writeScoresToCache = async (username, newScores) => {
  const cacheResults = await client.get(username)
  const cacheData = JSON.parse(cacheResults)
  const data = {
    userId: newScores.userId,
    codeCorrectnessTotal:
      newScores.codeCorrectnessTotal + (cacheData.codeCorrectnessTotal || 0),
    codeDesignTotal:
      newScores.codeDesignTotal + (cacheData.codeDesignTotal || 0),
    codeStyleTotal: newScores.codeStyleTotal + (cacheData.codeStyleTotal || 0),
    communicationTotal:
      newScores.communicationTotal + (cacheData.communicationTotal || 0),
    timeManagementTotal:
      newScores.timeManagementTotal + (cacheData.timeManagementTotal || 0),
    totalReviews: (newScores.totalReviews || 0) + 1,
  }
  await client.set(username, JSON.stringify(data), { EX: HOUR, NX: true })
}

// get scores or undefined
export const getScoresFromCache = async (username) => {
  const cacheResults = await client.get(username)
  const cacheData = JSON.parse(cacheResults)
  return cacheData
}

// upon logout/ user deletes account, we want a fresh pull upon next login
export const deleteScoresFromCache = async (username) => {
  await client.del(username)
}
