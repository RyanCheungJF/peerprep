import axios from 'axios'
import { URL_QUESTION_SVC } from '../utils/configs'

export const findQuestionByDifficulty = async (difficulty, excludingQnsid) => {
  const res = await axios.get(`${URL_QUESTION_SVC}?difficulty=${difficulty}&qnsid=${excludingQnsid}`)
  return res
}

export const findQuestionById = async (qnsid) => {
  const res = await axios.get(`${URL_QUESTION_SVC}/${qnsid}`)
  return res
}
