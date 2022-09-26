import { createQuestion, findQuestionByDifficulty } from './repository.js'

export const ormFindByDifficulty = async (difficulty) => {
  try {
    return await findQuestionByDifficulty({ difficulty: difficulty })
  } catch (err) {
    console.log('ERROR: Could not retrieve question')
    return { err }
  }
}
