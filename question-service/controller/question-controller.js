import { ormFindByTitle as _findByTitle } from '../model/question-orm.js'

export const getQuestion = async (req, res) => {
  const { title } = req.body

  const question = await _findByTitle(title)
  if (question.err) {
    return res.status(500).json({ message: 'Error retrieving question.' })
  }

  return res.status(200).json(question)
}
