import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import Chat from '../components/Chat'
import CodeEditor from '../components/CodeEditor'
import PartnerOfflineDialog from '../components/PartnerOfflineDialog'
import { deleteRoomSvc } from '../api/roomservice'
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
    collabSocket.on('partner-connected', () => {
      setIsPartnerOnline(true)
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
      const res = await axios.get(
        'http://localhost:8100/api/question?difficulty=easy'
      )
      setQuestion(res.data)
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  const leaveRoom = async () => {
    try {
      console.log('deleting room with id: ' + location.state.room)
      const res = await deleteRoomSvc(location.state.room)
      matchingSocket.emit('leave-room', location.state.room, 'partner left')
      collabSocket.emit('leave-room', getCollabRoomId(location.state.room))
      console.log(JSON.stringify(res.data))
    } catch (err) {
      console.log(err)
    }
    navigate(homeUrl)
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
        <Chat room={location.state?.room} />
        <Button variant={'outlined'} onClick={() => leaveRoom()}>
          Leave Room
        </Button>
      </Box>
      <CodeEditor room={location.state?.room} />

      <PartnerOfflineDialog
        isDialogOpen={!isPartnerOnline}
        leaveRoom={leaveRoom}
      />
    </Box>
  )
}

export default CollaborationPage
