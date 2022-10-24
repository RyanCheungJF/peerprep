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
import { findMatch, deleteMatch } from '../api/matchingService'
import { createRoomService } from '../api/roomservice'
import { UserContext } from '../contexts/UserContext'
import { collabUrl } from '../utils/routeConstants'
import { matchingSocket } from '../utils/socket'
import AlertDialog from './AlertDialog'
import FindingMatchDialog from './FindingMatchDialog'

const FindMatch = () => {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  // Define finding match time out seconds
  const findingMatchTimeOutSeconds = 30

  const [difficulty, setDifficulty] = useState('')

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

  useEffect(() => {
    matchingSocket.on('found-connection', (username, difficulty) => {
      try {
        const room = {
          room_id: username,
          id1: username,
          id2: user.username,
          id1_present: true,
          id2_present: true,
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
      matchingSocket.emit('notify-partner', room, user.username, difficulty)
      navigate(collabUrl, {
        state: {
          room: user.username,
          difficulty: difficulty.toLowerCase(),
        },
      })
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
        }}
      >
        <Button
          className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-semibold rounded-md pl-6 pr-6"
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
