import { useState } from 'react'
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

const FindMatch = () => {
  const [difficultyLevel, setDifficultyLevel] = useState('')
  const [timer, setTimer] = useState('')
  const timeOutSeconds = 30

  // Select Difficulty Level Error Dialog
  const [
    selectDifficultyLevelErrorDialogOpen,
    setSelectDifficultyLevelErrorDialogOpen,
  ] = useState(false)
  const handleSelectDifficultyLevelErrorCloseDialog = () =>
    setSelectDifficultyLevelErrorDialogOpen(false)
  const handleSelectDifficultyLevelErrorOpenDialog = () =>
    setSelectDifficultyLevelErrorDialogOpen(true)
  const selectDifficultyLevelErrorDialogTitle = 'Unable to Find Match'
  const selectDifficultyLevelErrorDialogMsg =
    'Please select the difficulty level (Easy, Medium or Hard) of the questions you wish to attempt so that the system can find a match for you.'
  const selectDifficultyLevelErrorDialogButtonText = 'OK'

  // Finding Match Dialog
  const [findingMatchDialogOpen, setFindingMatchDialogOpen] = useState(false)
  const handleFindingMatchCloseDialog = () => setFindingMatchDialogOpen(false)
  const handleFindingMatchOpenDialog = () => setFindingMatchDialogOpen(true)

  const handleFindMatch = (difficultyLevel) => {
    if (
      difficultyLevel === 'Easy' ||
      difficultyLevel === 'Medium' ||
      difficultyLevel === 'Hard'
    ) {
      console.log('Difficulty Level Selected: ' + difficultyLevel)
      handleFindingMatchOpenDialog()
      setTimer(timeOutSeconds)
    } else {
      handleSelectDifficultyLevelErrorOpenDialog()
    }
  }

  return (
    <Box sx={{ my: 3 }}>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Difficulty Level</InputLabel>
        <Select
          value={difficultyLevel}
          label="Select Difficulty Level"
          onChange={(e) => setDifficultyLevel(e.target.value)}
        >
          <MenuItem value="Easy">Easy</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Hard">Hard</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant={'outlined'}
        onClick={() => handleFindMatch(difficultyLevel)}
      >
        Find Match
      </Button>

      <AlertDialog
        dialogOpen={selectDifficultyLevelErrorDialogOpen}
        handleCloseDialog={handleSelectDifficultyLevelErrorCloseDialog}
        dialogTitle={selectDifficultyLevelErrorDialogTitle}
        dialogMsg={selectDifficultyLevelErrorDialogMsg}
        dialogButtonText={selectDifficultyLevelErrorDialogButtonText}
      />

      <FindingMatchDialog
        dialogOpen={findingMatchDialogOpen}
        handleCloseDialog={handleFindingMatchCloseDialog}
        difficultyLevel={difficultyLevel}
        timer={timer}
        setTimer={setTimer}
        timeOutSeconds={timeOutSeconds}
      />
    </Box>
  )
}

export default FindMatch
