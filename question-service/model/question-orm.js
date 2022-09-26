import { createQuestion, findQuestion } from './repository.js'

export const ormFindByTitle = async (title) => {
  try {
    return await findQuestion({ title })
  } catch (err) {
    console.log('ERROR: Could not retrieve question')
    return { err }
  }
}
