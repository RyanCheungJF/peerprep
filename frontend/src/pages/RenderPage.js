import { useEffect, useState } from 'react'
import axios from 'axios'

const RenderPage = () => {
  const [question, setQuestion] = useState({})

  useEffect(() => {
    getQuestion()
  }, [])

  const getQuestion = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8100/api/question?difficulty=easy'
      )
      setQuestion(res.data)
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: question['title'] }}></p>
      <br />
      <p dangerouslySetInnerHTML={{ __html: question['description'] }}></p>
      <br />
      <p>Example 1</p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_1_input'] }}></p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_1_output'] }}></p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_1_explanation'] }}></p>
      <p>Example 2</p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_2_input'] }}></p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_2_output'] }}></p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_2_explanation'] }}></p>
    </>
  )
}

export default RenderPage
