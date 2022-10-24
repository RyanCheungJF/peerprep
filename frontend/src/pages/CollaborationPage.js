import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { findQuestion } from '../api/questionService'
import { deleteRoomService } from '../api/roomservice'
import AlertDialog from '../components/AlertDialog'
import Chat from '../components/Chat'
import CodeEditor from '../components/CodeEditor'
import ConfirmationDialog from '../components/ConfirmationDialog'
import Question from '../components/Question'
import { getCollabRoomId } from '../utils/main'
import { homeUrl } from '../utils/routeConstants'
import { collabSocket, matchingSocket } from '../utils/socket'

const CollaborationPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [question, setQuestion] = useState({})
  const [isPartnerOnline, setIsPartnerOnline] = useState(true)
  const [isPartnerLeft, setIsPartnerLeft] = useState(false)

  // Leave Room Confirmation Dialog
  const [leaveRoomConfirmationDialogOpen, setLeaveRoomConfirmationDialogOpen] =
    useState(false)
  const handleLeaveRoomConfirmationCloseDialog = () =>
    setLeaveRoomConfirmationDialogOpen(false)
  const handleLeaveRoomConfirmationOpenDialog = () =>
    setLeaveRoomConfirmationDialogOpen(true)

  useEffect(() => {
    getQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    collabSocket.connect()
    return () => {
      collabSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!location.state?.room) {
      setIsPartnerLeft(true)
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
      // Check if user is the only one in the room or if there are more ppl
      setIsPartnerOnline(roomClients.length > 1)
    })
  }, [])

  useEffect(() => {
    matchingSocket.on('partner-left', (data) => {
      if (data === 'partner left') {
        setIsPartnerOnline(null)
        setIsPartnerLeft(true)
      }
    })
  }, [navigate])

  const getQuestion = async () => {
    try {
      const res = await findQuestion(location.state.difficulty)
      setQuestion(res.data)
    } catch (err) {
      console.log(err)
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

  const partnerLeftRoom = () => {
    // TO CHECK/FIX:
    // Currently two dialogs appear, one for disconnected and another for leaving
    navigate(homeUrl)
  }

  const renderPartnerOfflineAlertDialog = () => {
    return (
      <AlertDialog
        dialogOpen={!isPartnerOnline}
        handleCloseDialog={leaveRoom}
        dialogTitle="Partner Disconnected"
        dialogMsg="Your partner has disconnected. Waiting for him/her to reconnect..."
        dialogButtonText="Leave Room Instead"
      />
    )
  }

  const renderPartnerLeftAlertDialog = () => {
    return (
      <AlertDialog
        dialogOpen={isPartnerLeft}
        handleCloseDialog={partnerLeftRoom}
        dialogTitle="Partner Left"
        dialogMsg="Your partner has left the room. You will be redirected to the Home page."
        dialogButtonText="OK"
      />
    )
  }

  const renderLeaveRoomConfirmationDialog = () => {
    return (
      <ConfirmationDialog
        dialogOpen={leaveRoomConfirmationDialogOpen}
        handleDismiss={handleLeaveRoomConfirmationCloseDialog}
        handleConfirmation={leaveRoom}
        dialogTitle="Leave Room"
        dialogMsg="Are you sure you want to leave the room?"
        dialogDismissButtonText="No"
        dialogConfirmationButtonText="Yes"
      />
    )
  }

  return (
    <Box
      className="collaboration-page-container"
      sx={{
        // content height = 100vh - nav bar height - vertical padding
        // height: 'calc(100vh - 64px - 2 * 16px)',
        height: 'calc(100vh - 64px - 24px)',
      }}
    >
      <Box className="collaboration-page-left-container">
        <Box className="coding-question-chat-container">
          <Box className="coding-question-container">
            <Question question={question} />
          </Box>
          <Box className="coding-chat-container">
            <Chat room={location.state?.room} />
          </Box>
        </Box>
        <Box className="coding-button-container">
          <Button
            className="font-inter bg-pink-700 hover:bg-pink-800 text-white font-semibold rounded-md pl-6 pr-6"
            onClick={() => handleLeaveRoomConfirmationOpenDialog()}
          >
            Leave Room
          </Button>
        </Box>
      </Box>
      <Box className="collaboration-page-right-container">
        <CodeEditor room={location.state?.room} />
      </Box>
      {renderPartnerOfflineAlertDialog()}
      {renderPartnerLeftAlertDialog()}
      {renderLeaveRoomConfirmationDialog()}
    </Box>
  )
}

export default CollaborationPage
