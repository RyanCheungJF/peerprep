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
import ReviewPartnerDialog from '../components/ReviewPartnerDialog'
import { getCollabRoomId } from '../utils/main'
import { collabSocket, matchingSocket } from '../utils/socket'

const CollaborationPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [question, setQuestion] = useState({})
  // const [timeRemaining, setTimeRemaining] = useState({}) // to implement
  const [timeRemaining, setTimeRemaining] = useState('30')

  const [isPartnerOnline, setIsPartnerOnline] = useState(true)
  const [isPartnerLeft, setIsPartnerLeft] = useState(false)

  // Leave Room Confirmation Dialog
  const [leaveRoomConfirmationDialogOpen, setLeaveRoomConfirmationDialogOpen] =
    useState(false)
  const handleLeaveRoomConfirmationCloseDialog = () =>
    setLeaveRoomConfirmationDialogOpen(false)
  const handleLeaveRoomConfirmationOpenDialog = () =>
    setLeaveRoomConfirmationDialogOpen(true)

  // Review Partner Dialog
  const [reviewPartnerDialogOpen, setReviewPartnerDialogOpen] = useState(false)
  const handleReviewPartnerCloseDialog = () => setReviewPartnerDialogOpen(false)
  const handleReviewPartnerOpenDialog = () => setReviewPartnerDialogOpen(true)

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
      // TO CHECK: CHECK frontend again after matching service bug is rectified
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
        // TO CHECK: CHECK frontend again after matching service bug is rectified
        setIsPartnerLeft(true)
        setIsPartnerOnline(false) // so that it will not show PartnerOfflineAlertDialog
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

  /*
    TODO: Change question
      Need to change the code to handle the logic such that the new question
      is set for both parties when one of them presses it
  */
  const getNewQuestion = async () => {
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

    // TO CHECK: CHECK frontend again after matching service bug is rectified

    // After room is deleted, setIsPartnerLeft as true and setIsPartnerOnline as
    // false so that either PartnerLeftAlertDialog or PartnerOfflineAlertDialog
    // will not be shown if partner happens to submit of skip review first
    setIsPartnerLeft(true)
    setIsPartnerOnline(false)

    handleLeaveRoomConfirmationCloseDialog()
    handleReviewPartnerOpenDialog()
  }

  const renderPartnerOfflineAlertDialog = () => {
    return (
      <AlertDialog
        dialogOpen={!isPartnerOnline && !isPartnerLeft}
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
        handleCloseDialog={handleReviewPartnerOpenDialog}
        dialogTitle="Partner Left"
        dialogMsg="Your partner has left the room. You may now review your partner."
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

  const renderReviewPartnerDialog = () => {
    return (
      <ReviewPartnerDialog
        dialogOpen={reviewPartnerDialogOpen}
        handleCloseDialog={handleReviewPartnerCloseDialog}
      />
    )
  }

  return (
    <>
      <Box className="time-remaining-div">
        <Box className="time-remaining-wrapper">
          {timeRemaining > 5 && (
            <p className="time-remaining">
              Time Remaining: {timeRemaining} mins
            </p>
          )}
          {timeRemaining <= 5 && timeRemaining > 1 && (
            <p className="time-remaining-alert">
              Time Remaining: {timeRemaining} mins
            </p>
          )}
          {timeRemaining <= 1 && (
            <p className="time-remaining-alert">
              Time Remaining: {timeRemaining} min
            </p>
          )}
        </Box>
      </Box>
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
              <Question question={question} getNextQuestion={getNewQuestion} />
            </Box>
            <Box className="coding-chat-container">
              <Chat room={location.state?.room} />
            </Box>
          </Box>
          <Box className="coding-button-container">
            <Button
              className="font-inter bg-pink-700 hover:bg-pink-800 text-white font-semibold rounded-md px-6"
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
        {renderReviewPartnerDialog()}
      </Box>
    </>
  )
}

export default CollaborationPage
