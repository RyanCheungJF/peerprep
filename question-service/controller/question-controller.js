import { ormFindByDifficulty as _findByDifficulty } from '../model/question-orm.js'

const selectRandomQuestion = (questions) => {
  return questions[Math.floor(Math.random() * questions.length)]
}

export const getQuestion = async (req, res) => {
  const { difficulty } = req.body

  const questions = await _findByDifficulty(difficulty)
  if (!questions) {
    return res.status(500).json({ message: 'Error retrieving question.' })
  }
  const question = selectRandomQuestion(questions)
  return res.status(200).json(question)
}
