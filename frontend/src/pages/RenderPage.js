import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Box } from '@mui/material'
import Chat from '../components/Chat'
import CodeEditor from '../components/CodeEditor'
import { collabSocket } from '../utils/socket'
import { homeUrl } from '../utils/routeConstants'

const RenderPage = () => {
  const location = useLocation()

  const [question, setQuestion] = useState({})

  useEffect(() => {
    getQuestion()
  }, [])

  useEffect(() => {
    collabSocket.emit('join-room', location.state.room, collabSocket.id)
  }, [location.state.room])

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

  const renderQuestion = () => {
    return (
      <Box sx={{ height: '50%', marginBottom: '24px', overflow: 'auto' }}>
        <p dangerouslySetInnerHTML={{ __html: question['title'] }}></p>
        <br />
        <p dangerouslySetInnerHTML={{ __html: question['description'] }}></p>
        <br />
        <p>Example 1</p>
        <p dangerouslySetInnerHTML={{ __html: question['ex_1_input'] }}></p>
        <p dangerouslySetInnerHTML={{ __html: question['ex_1_output'] }}></p>
        <p
          dangerouslySetInnerHTML={{ __html: question['ex_1_explanation'] }}
        ></p>
        <p>Example 2</p>
        <p dangerouslySetInnerHTML={{ __html: question['ex_2_input'] }}></p>
        <p dangerouslySetInnerHTML={{ __html: question['ex_2_output'] }}></p>
        <p
          dangerouslySetInnerHTML={{ __html: question['ex_2_explanation'] }}
        ></p>
      </Box>
    )
  }

  // if a user refreshed this page and their socket is disconnected, redirect them back to homepage
  if (!collabSocket.connected) {
    return <Navigate to={homeUrl} replace={true} />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '36px',
        // content height = 100vh - nav bar height - vertical padding
        height: 'calc(100vh - 64px - 2 * 36px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '30%',
          paddingRight: '24px',
          justifyContent: 'space-between',
        }}
      >
        {renderQuestion()}
        <Chat room={location.state.room} />
      </Box>
      <CodeEditor room={location.state.room} />
    </Box>
  )
}

export default RenderPage
