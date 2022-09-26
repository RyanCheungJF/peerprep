import { useEffect } from 'react'
import {
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const FindingMatchDialog = ({
  dialogOpen,
  handleCloseDialog,
  difficultyLevel, // difficulty level to use for matching service
  timer,
  setTimer,
  timeOutSeconds,
}) => {
  useEffect(() => {
    if (timer >= 0) {
      const timeoutID = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(timeoutID) // clear timeout when component unmounts
    }
  }, [timer, setTimer])

  const handleCancel = () => {
    handleCloseDialog()
    // Put code to cancel the matching service process
  }

  const handleTryAgain = () => {
    setTimer(timeOutSeconds)
    // Put code to restart the matching service process
  }

  return (
    <Dialog open={dialogOpen}>
      {timer >= 0 && (
        <>
          <DialogTitle>Finding Match</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              Please wait while the system finds a match for you.
            </DialogContentText>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
              <CircularProgress />
            </Box>
            <DialogContentText
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              Time left : {timer}
            </DialogContentText>
          </DialogContent>
        </>
      )}
      {timer < 0 && (
        <>
          <DialogTitle>Unable to Find Match</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              The system is unable to find a match for you.
            </DialogContentText>
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        {timer < 0 && (
          <>
            <Button onClick={handleTryAgain}>Try Again</Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default FindingMatchDialog
