import { ormFindByDifficulty as _findByDifficulty } from '../model/question-orm.js'

const selectRandomQuestion = (questions) => {
  return questions[Math.floor(Math.random() * questions.length)]
}

const checkParameters = (param, keywords) => {
  return keywords.includes(param)
}

export const getQuestion = async (req, res) => {
  const difficulty = req.query.difficulty

  if (!checkParameters(difficulty, ['easy', 'medium', 'hard'])) {
    return res
      .status(500)
      .json({ message: 'Invalid query parameter supplied.' })
  }

  const questions = await _findByDifficulty(difficulty)
  if (!questions || questions.length == 0) {
    return res.status(400).json({ message: 'Error retrieving question.' })
  }
  const question = selectRandomQuestion(questions)
  return res.status(200).json(question)
}
