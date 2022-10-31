import { useContext, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { Box, Button } from '@mui/material'
import { findQuestionById } from '../api/questionService'
import { findRoomService, deleteRoomService } from '../api/roomservice'
import AlertDialog from '../components/AlertDialog'
import Chat from '../components/Chat'
import CodeEditor from '../components/CodeEditor'
import ConfirmationDialog from '../components/ConfirmationDialog'
import Question from '../components/Question'
import ReviewPartnerDialog from '../components/ReviewPartnerDialog'
import { getCollabRoomId } from '../utils/main'
import { expirationCheck } from '../utils/main'
import { homeUrl } from '../utils/routeConstants'
import { collabSocket, matchingSocket } from '../utils/socket'
import moment from 'moment'

const CollaborationPage = () => {
  const user = useContext(UserContext)
  const location = useLocation()
  const navigate = useNavigate()

  const TEN_SEC_IN_MS = 10 * 1000
  const MAX_TIME_IN_MIN = 30

  const [room, setRoom] = useState({})
  const [question, setQuestion] = useState({})
  const [timeRemaining, setTimeRemaining] = useState(MAX_TIME_IN_MIN)
  const [partneruuid, setPartneruuid] = useState('')

  const [isOwnselfLeft, setIsOwnselfLeft] = useState(false)
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
    collabSocket.connect()
    return () => {
      collabSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    collabSocket.on('partner-disconnected', () => {
      // TO CHECK: CHECK frontend again after matching service bug is rectified
      setIsPartnerOnline(false)
    })
    collabSocket.on('partner-connected', (roomClients) => {
      // Check if user is the only one in the room or if there are more ppl
      setIsPartnerOnline(roomClients.length > 1)
    })
    matchingSocket.on('get-partner-uuid', () => {
      matchingSocket.emit('send-uuid', location.state.room, user._id)
    })
    matchingSocket.on('partner-uuid', (uuid) => {
      setPartneruuid(uuid)
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
  }, [])

  useEffect(() => {
    getQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getQuestion = async () => {
    if (location.state && location.state.qnsid) {
      try {
        const res = await findQuestionById(location.state.qnsid)
        setQuestion(res.data)
      } catch (err) {
        console.log('ERROR: ', err)
      }
    } else {
      try {
        if (location.state) {
          const res = await findRoomService({ room_id: location.state.room })
          const qnsRes = await findQuestionById(res.data.qnsid)
          setQuestion(qnsRes.data)
        }
      } catch (err) {
        console.log('ERROR: ', err)
      }
    }
  }

  const getNewQuestion = async () => {
    // TODO: Handle the logic such that the new question is
    // set for both parties when one of them presses the button
  }

  const leaveRoom = useCallback(async () => {
    try {
      console.log('deleting room with id: ' + location.state.room)
      const res = await deleteRoomService(location.state.room)
      matchingSocket.emit('leave-room', location.state.room, 'partner left')
      collabSocket.emit('leave-room', getCollabRoomId(location.state.room))
      delete location.state.qnsid
      console.log(JSON.stringify(res.data))
    } catch (err) {
      console.log(err)
    }

    // TO CHECK: CHECK frontend again after matching service bug is rectified

    // After user leaves the room and room is deleted, setIsOwnselfLeft to true
    // so that either PartnerLeftAlertDialog or PartnerOfflineAlertDialog will
    // not open if partner happens to submit or skip review first
    setIsOwnselfLeft(true)

    handleLeaveRoomConfirmationCloseDialog()
    handleReviewPartnerOpenDialog()
  }, [location.state])

  const getTimeRemaining = useCallback(() => {
    const now = moment()
    const end = moment(room.datetime)
    const diff = now.diff(end, 'minutes')
    const timeLeft = diff < MAX_TIME_IN_MIN ? MAX_TIME_IN_MIN - diff : 0
    return timeLeft
  }, [room.datetime])

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeRemaining(() => getTimeRemaining())
    }, TEN_SEC_IN_MS)

    return () => clearInterval(countdown)
  }, [room.datetime, getTimeRemaining, TEN_SEC_IN_MS])

  const checkExpiry = useCallback(
    async (room_id) => {
      try {
        const res = await findRoomService({ room_id: room_id })
        if (res.data && JSON.stringify(res.data) !== '{}') {
          setRoom(res.data)
          expirationCheck(
            res.data.datetime,
            async () => {
              console.log(`room: ${room_id} expired`)
              // await deleteRoomService(room_id)
              // navigate(homeUrl, { replace: true })
              leaveRoom()
            },
            () => {
              setTimeRemaining(getTimeRemaining())
            }
          )
        }
      } catch (error) {
        console.log(error)
      }
    },
    [leaveRoom, getTimeRemaining]
  )

  useEffect(() => {
    if (!location.state?.room) {
      navigate(homeUrl, { replace: true })
      return
    }

    checkExpiry(location.state.room)

    collabSocket.emit('join-room', getCollabRoomId(location.state.room))
    matchingSocket.emit('join-room', location.state.room)
    matchingSocket.emit('request-partner-uuid', location.state.room)
  }, [location.state, navigate, checkExpiry, user._id])

  useEffect(() => {}, [partneruuid])

  /* useEffect(() => {
    console.log('========================================')
    console.log('partneruuid: ' + partneruuid)
    console.log('1. isOwnselfLeft: ' + isOwnselfLeft)
    console.log('2. isPartnerOnline: ' + isPartnerOnline)
    console.log('3. isPartnerLeft: ' + isPartnerLeft)
    console.log('========================================')
  }, [partneruuid, isOwnselfLeft, isPartnerOnline, isPartnerLeft]) */

  const renderPartnerOfflineAlertDialog = () => {
    return (
      <AlertDialog
        dialogOpen={!isOwnselfLeft && !isPartnerOnline && !isPartnerLeft}
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
        dialogOpen={!isOwnselfLeft && isPartnerLeft && !isPartnerOnline}
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
        partneruuid={partneruuid}
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
