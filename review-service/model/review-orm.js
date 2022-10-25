import {
  getAllScoresForUser,
  createScores,
  deleteAllScoresForUser,
} from './repository.js'

export const ormGetAllScoresForUser = async (userId) => {
  try {
    return await getAllScoresForUser({ revieweeid: userId })
  } catch (err) {
    console.log(`ERROR: Could not retrieve reviews for user ${userId}`)
    return { err }
  }
}

export const ormCreateScores = async (params) => {
  try {
    const newEntry = await createScores(params)
    newEntry.save()
    return true
  } catch (err) {
    console.log('ERROR: Could not create new score entry')
    return { err }
  }
}

export const ormDeleteAllScoresForUser = async (userId) => {
  try {
    return await deleteAllScoresForUser({ revieweeid: userId })
  } catch (err) {
    console.log(`ERROR: Could not delete reviews for user ${userId}`)
    return { err }
  }
}
