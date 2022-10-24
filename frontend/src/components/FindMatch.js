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
import AlertDialog from './AlertDialog'
import FindingMatchDialog from './FindingMatchDialog'
import { matchingSocket } from '../utils/socket'
import { collabUrl } from '../utils/routeConstants'
import { findMatch, deleteMatch } from '../api/matchingService'
import { UserContext } from '../contexts/UserContext'
import { createRoomService } from '../api/roomservice'
import { findQuestionByDifficulty as _findByDifficulty } from '../api/questionService'

const FindMatch = () => {
  const navigate = useNavigate()

  const user = useContext(UserContext)

  // Define finding match time out seconds
  const findingMatchTimeOutSeconds = 30

  const [difficulty, setDifficulty] = useState('')

  // Select Difficulty Error Dialog
  const [
    selectDifficultyErrorDialogOpen,
    setSelectDifficultyErrorDialogOpen,
  ] = useState(false)
  const handleSelectDifficultyErrorCloseDialog = () =>
    setSelectDifficultyErrorDialogOpen(false)
  const handleSelectDifficultyErrorOpenDialog = () =>
    setSelectDifficultyErrorDialogOpen(true)

  // Finding Match Dialog
  const [findingMatchDialogOpen, setFindingMatchDialogOpen] = useState(false)
  const handleFindingMatchCloseDialog = () => setFindingMatchDialogOpen(false)
  const handleFindingMatchOpenDialog = () => setFindingMatchDialogOpen(true)

  useEffect(() => {
    matchingSocket.on('found-connection', (username, difficulty, qnsid) => {
      try {
        const room = {
          room_id: username,
          id1: username,
          id2: user.username,
          qnsid: qnsid,
          difficulty: difficulty.toLowerCase(),
          datetime: new Date(),
        }
        createRoomService(room)
      } catch (err) {
        console.log(err)
      }
      navigate(collabUrl, {
        state: {
          room: username,
          difficulty: difficulty.toLowerCase(),
          qnsid: qnsid,
        },
      })
    })
  }, [navigate, user.username])

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

  const startMatchingService = async () => {
    console.log('==> Start Matching Service')
    console.log('Difficulty: ' + difficulty)

    const res = await findMatch(user._id, matchingSocket.id, difficulty)

    // Gets a response
    if (res) {
      const data = res.data
      const room = data.socketID
      const questionRes = await _findByDifficulty(difficulty.toLowerCase())
      if (questionRes) {
        matchingSocket.emit(
          'notify-partner',
          room,
          user.username,
          difficulty,
          questionRes.data.qnsid
        )
        navigate(collabUrl, {
          state: {
            room: user.username,
            difficulty: difficulty.toLowerCase(),
            qnsid: questionRes.data.qnsid,
          },
        })
      }
    }
  }

  const stopMatchingService = () => {
    console.log('==> Stop Matching Service')
    deleteMatch(user._id, matchingSocket.id, difficulty)
  }

  const renderUnableToFindMatchAlertDialog = () => {
    if (!selectDifficultyErrorDialogOpen) {
      return null
    }

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

  const renderFindingMatchDialog = () => {
    if (!findingMatchDialogOpen) {
      return null
    }

    return (
      <FindingMatchDialog
        dialogOpen={findingMatchDialogOpen}
        handleCloseDialog={handleFindingMatchCloseDialog}
        findingMatchTimeOutSeconds={findingMatchTimeOutSeconds}
        startMatchingService={startMatchingService}
        stopMatchingService={stopMatchingService}
      />
    )
  }

  return (
    <Box sx={{ my: 3 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{ px: 2 }}
          className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-xl"
          onClick={() => handleFindMatch(difficulty)}
        >
          Find Match
        </Button>
      </Box>
      {renderUnableToFindMatchAlertDialog()}
      {renderFindingMatchDialog()}
    </Box>
  )
}

export default FindMatch
