import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import Chat from '../components/Chat'
import CodeEditor from '../components/CodeEditor'
import PartnerOfflineDialog from '../components/PartnerOfflineDialog'
import Question from '../components/Question'
import { findQuestion } from '../api/questionService'
import { deleteRoomService } from '../api/roomservice'
import { collabSocket, matchingSocket } from '../utils/socket'
import { homeUrl } from '../utils/routeConstants'
import { getCollabRoomId } from '../utils/main'

const CollaborationPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [question, setQuestion] = useState({})
  const [isPartnerOnline, setIsPartnerOnline] = useState(true)

  useEffect(() => {
    getQuestion()
  }, [])

  useEffect(() => {
    collabSocket.connect()
    return () => {
      collabSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!location.state?.room) {
      navigate(homeUrl, { replace: true })
      return
    }

    collabSocket.emit('join-room', getCollabRoomId(location.state.room))
    matchingSocket.emit('join-room', location.state.room)
  }, [location.state, navigate])

  useEffect(() => {
    collabSocket.on('partner-disconnected', () => {
      setIsPartnerOnline(false)
    })
    collabSocket.on('partner-connected', (roomClients) => {
      // check if user is the only one in the room or if there are more ppl
      setIsPartnerOnline(roomClients.length > 1)
    })
  }, [])

  useEffect(() => {
    matchingSocket.on('partner-left', (data) => {
      if (data === 'partner left') {
        navigate(homeUrl)
      }
    })
  }, [navigate])

  const getQuestion = async () => {
    try {
      const res = await findQuestion(location.state.difficulty)
      setQuestion(res.data)
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  const leaveRoom = async () => {
    try {
      console.log('deleting room with id: ' + location.state.room)
      const res = await deleteRoomService(location.state.room)
      matchingSocket.emit('leave-room', location.state.room, 'partner left')
      collabSocket.emit('leave-room', getCollabRoomId(location.state.room))
      console.log(JSON.stringify(res.data))
    } catch (err) {
      console.log(err)
    }
    navigate(homeUrl)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '36px',
        // content height = 100vh - nav bar height - vertical padding
        height: 'calc(100vh - 64px - 2 * 16px)',
      }}
    >
      <Box className="left-coding-container">
        <Box className="coding-question-container">
          <Question question={question} />
        </Box>
        <Box className="coding-chat-container">
          <Chat room={location.state?.room} />
        </Box>
        <Box className="coding-button-container">
          <Button
            className="font-inter bg-pink-700 hover:bg-pink-800 text-white font-light rounded-md w-1/5"
            onClick={() => leaveRoom()}
          >
            Leave Room
          </Button>
        </Box>
      </Box>
      <Box className="right-coding-container">
        <CodeEditor room={location.state?.room} />
      </Box>

      <PartnerOfflineDialog
        isDialogOpen={!isPartnerOnline}
        leaveRoom={leaveRoom}
      />
    </Box>
  )
}

export default CollaborationPage
