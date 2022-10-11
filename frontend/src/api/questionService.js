import axios from 'axios'
import { URL_QUESTION_SVC } from '../utils/configs'

export const findQuestion = async (difficulty) => {
  const res = await axios.get(`${URL_QUESTION_SVC}?difficulty=${difficulty}`)
  return res
}
