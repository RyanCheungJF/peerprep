import {
  ormFindByDifficulty as _findByDifficulty,
  ormFindById as _findById,
} from '../model/question-orm.js'

const selectRandomQuestion = (questions, excludeId) => {
  var qnsId = Math.floor(Math.random() * questions.length)
  while (questions[qnsId].qnsid.toString() === excludeId) {
    // if excludeId is undefined, this will always be false
    qnsId = Math.floor(Math.random() * questions.length)
  }
  return questions[qnsId]
}

const checkParameters = (param, keywords) => {
  return keywords.includes(param)
}

export const getQuestion = async (req, res) => {
  const difficulty = req.query.difficulty

  if (!checkParameters(difficulty, ['easy', 'medium', 'hard'])) {
    return res
      .status(400)
      .json({ message: 'Invalid query parameter supplied.' })
  }

  const questions = await _findByDifficulty(difficulty)
  if (!questions || questions.length === 0) {
    return res.status(500).json({ message: 'Error retrieving question.' })
  }

  const question = selectRandomQuestion(
    questions,
    req.query.qnsid ? req.query.qnsid : undefined
  )
  return res.status(200).json(question)
}

export const findQuestionById = async (req, res) => {
  const qnsid = req.params.qnsid

  if (!qnsid) {
    return res.status(400).json({ message: 'Missing question id' })
  }

  const question = await _findById(qnsid)
  if (!question || question.length == 0) {
    return res.status(500).json({ message: 'Error retrieving question.' })
  }
  return res.status(200).json(question)
}
