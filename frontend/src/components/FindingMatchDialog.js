import { useEffect, useState } from 'react'
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
  findingMatchTimeOutSeconds,
  startMatchingService,
  stopMatchingService,
}) => {
  const [timer, setTimer] = useState(findingMatchTimeOutSeconds)

  useEffect(() => {
    if (timer === findingMatchTimeOutSeconds) {
      startMatchingService() // start matching service when timer equals findingMatchTimeOutSeconds
    }

    if (timer >= 0) {
      setTimeout(() => setTimer((t) => t - 1), 1000)
      console.log(timer)
    }

    if (timer < 0) {
      console.log(timer)
      stopMatchingService() // stop matching service when timer ends i.e. when timer < 0
    }
  }, [
    timer,
    findingMatchTimeOutSeconds,
    startMatchingService,
    stopMatchingService,
  ])

  const handleCancel = () => {
    if (timer >= 0) {
      console.log('==> Cancel Finding Match')
      stopMatchingService() // stop matching service prematurely i.e. when timer >= 0
    }

    console.log('=== Closing Finding Match Dialog ===')
    handleCloseDialog()
  }

  const handleTryAgain = () => {
    setTimer(findingMatchTimeOutSeconds)
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
        {timer < 0 && <Button onClick={handleTryAgain}>Try Again</Button>}
      </DialogActions>
    </Dialog>
  )
}

export default FindingMatchDialog
