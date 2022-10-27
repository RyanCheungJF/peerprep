import { findQuestionByFilter, findOneQuestionByFilter } from './repository.js'

export const ormFindByDifficulty = async (difficulty) => {
  try {
    return await findQuestionByFilter({ difficulty: difficulty })
  } catch (err) {
    console.log('ERROR: Could not retrieve question')
    return { err }
  }
}

export const ormFindById = async (id) => {
  try {
    return await findOneQuestionByFilter({ qnsid: id })
  } catch (err) {
    console.log('ERROR: Could not retrieve question')
    return { err }
  }
}
