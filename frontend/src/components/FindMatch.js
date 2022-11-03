import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { findQuestionByDifficulty as _findByDifficulty } from '../api/questionService'
import { createRoomService } from '../api/roomservice'
import { findMatch, deleteMatch } from '../api/matchingService'
import { UserContext } from '../contexts/UserContext'
import { collabUrl } from '../utils/routeConstants'
import { STATUS_CODE_CONFLICT } from '../utils/constants'
import { matchingSocket } from '../utils/socket'
import AlertDialog from './AlertDialog'
import FindingMatchDialog from './FindingMatchDialog'
import { extendJWTExpiration } from '../api/userService'

const FindMatch = () => {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  // Define finding match time out seconds
  const FINDING_MATCH_TIMEOUT_SEC = 30

  const [difficulty, setDifficulty] = useState('')
  const [room, setRoom] = useState()

  // Select Difficulty Error Dialog
  const [selectDifficultyErrorDialogOpen, setSelectDifficultyErrorDialogOpen] =
    useState(false)
  const handleSelectDifficultyErrorCloseDialog = () =>
    setSelectDifficultyErrorDialogOpen(false)
  const handleSelectDifficultyErrorOpenDialog = () =>
    setSelectDifficultyErrorDialogOpen(true)

  // Finding Match Dialog
  const [findingMatchDialogOpen, setFindingMatchDialogOpen] = useState(false)
  const handleFindingMatchCloseDialog = () => setFindingMatchDialogOpen(false)
  const handleFindingMatchOpenDialog = () => setFindingMatchDialogOpen(true)

  // Duplicate Match Dialog
  const [duplicateMatchDialogOpen, setDuplicateMatchDialogOpen] =
    useState(false)

  const handleFindMatch = (difficulty) => {
    if (
      difficulty === 'Easy' ||
      difficulty === 'Medium' ||
      difficulty === 'Hard'
    ) {
      console.log('=== Opening Finding Match Dialog ===')
      handleFindingMatchOpenDialog()
    } else {
      handleSelectDifficultyErrorOpenDialog()
    }
  }

  useEffect(() => {
    const clearMatch = async () => {
      if (user._id && matchingSocket.id && difficulty !== '') {
        await deleteMatch(user._id, matchingSocket.id, difficulty)
        window.removeEventListener('beforeunload', clearMatch)
      }
    }
    window.addEventListener('beforeunload', clearMatch)
  }, [difficulty, user._id])

  const startMatchingService = async () => {
    console.log('==> Start Matching Service')
    console.log('Difficulty: ' + difficulty)
    // console.log('========================================')
    // console.log('Matching Socket: ' + matchingSocket.id)
    try {
      const res = await findMatch(user._id, matchingSocket.id, difficulty)
      // console.log(res)
      // console.log('========================================')

      // Gets a response
      if (res) {
        const data = res.data
        const room = data.socketID
        const questionRes = await _findByDifficulty(
          difficulty.toLowerCase(),
          undefined
        )
        if (questionRes) {
          matchingSocket.emit(
            'notify-partner',
            room,
            user.username,
            difficulty,
            questionRes.data.qnsid
          )
          extendJWTExpiration(20)
          navigate(collabUrl, {
            state: {
              room: user.username,
              difficulty: difficulty.toLowerCase(),
              qnsid: questionRes.data.qnsid,
            },
          })
        }
      }
    } catch (error) {
      if (error?.response?.status === STATUS_CODE_CONFLICT) {
        handleFindingMatchCloseDialog()
        setDuplicateMatchDialogOpen(true)
      }
    }
  }

  const stopMatchingService = () => {
    console.log('==> Stop Matching Service')
    deleteMatch(user._id, matchingSocket.id, difficulty)
  }

  const renderUnableToFindMatchAlertDialog = () => {
    return (
      <AlertDialog
        dialogOpen={selectDifficultyErrorDialogOpen}
        handleCloseDialog={handleSelectDifficultyErrorCloseDialog}
        dialogTitle="Unable to Find Match"
        dialogMsg="Please select the difficulty level (Easy, Medium or Hard) of the questions you wish to attempt so that the system can find a match for you."
        dialogButtonText="OK"
      />
    )
  }

  const renderDuplicateMatchAlertDialog = () => (
    <AlertDialog
      dialogOpen={duplicateMatchDialogOpen}
      handleCloseDialog={() => setDuplicateMatchDialogOpen(false)}
      dialogTitle="Unable to Find Match"
      dialogMsg="You are already looking for a match."
      dialogButtonText="OK"
    />
  )

  const renderFindingMatchDialog = () => {
    // Return null when findingMatchDialogOpen = false
    // This closes the dialog and unmounts the component.

    // Return FindingMatchDialog component when findingMatchDialogOpen = true
    // This mounts the component and opens the dialog.
    // This ensures that timer is restarted on every component mount.
    return !findingMatchDialogOpen ? null : (
      <FindingMatchDialog
        dialogOpen={findingMatchDialogOpen}
        handleCloseDialog={handleFindingMatchCloseDialog}
        findingMatchTimeOutSeconds={FINDING_MATCH_TIMEOUT_SEC}
        startMatchingService={startMatchingService}
        stopMatchingService={stopMatchingService}
      />
    )
  }

  matchingSocket.on('found-connection', (username, difficulty, qnsid) => {
    // console.log('========================================')
    // console.log('found-connection')
    const room = {
      room_id: username,
      id1: username,
      id2: user.username,
      qnsid: qnsid,
      difficulty: difficulty.toLowerCase(),
      datetime: new Date(),
    }
    // console.log(room)
    // console.log('========================================')
    setRoom(room)
  })

  useEffect(() => {
    const createRoom = async () => {
      try {
        await createRoomService(room)
        extendJWTExpiration(20)
        navigate(collabUrl, {
          state: {
            room: room.room_id,
            difficulty: room.difficulty,
            qnsid: room.qnsid,
          },
        })
      } catch (e) {
        console.log(e)
      }
    }

    if (room) {
      createRoom()
    }
  }, [room, navigate])

  return (
    <Box className="pt-6">
      <FormControl fullWidth sx={{ mt: 1, mb: 3 }}>
        <InputLabel>Select Difficulty</InputLabel>
        <Select
          value={difficulty}
          label="Select Difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <Button
        className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-medium rounded-md px-6"
        onClick={() => handleFindMatch(difficulty)}
      >
        Find Match
      </Button>
      {renderUnableToFindMatchAlertDialog()}
      {renderDuplicateMatchAlertDialog()}
      {renderFindingMatchDialog()}
    </Box>
  )
}

export default FindMatch
