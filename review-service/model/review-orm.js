import { getAllScoresForUser } from './repository.js'

export const ormGetAllScoresForUser = async (userId) => {
  try {
    return await getAllScoresForUser({ revieweeid: userId })
  } catch (err) {
    console.log(`ERROR: Could not retrieve reviews for user ${userId}`)
    return { err }
  }
}
