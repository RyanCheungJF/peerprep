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
    let timeOutID

    // Start matching service when timer equals findingMatchTimeOutSeconds
    if (timer === findingMatchTimeOutSeconds) {
      startMatchingService()
    }

    // Decrease timer when matching service starts
    if (timer >= 0) {
      timeOutID = setTimeout(() => setTimer((t) => t - 1), 1000)
      console.log(timer)
    }

    // Stop matching service when timer ends i.e. when timer < 0
    if (timer < 0) {
      console.log(timer)
      stopMatchingService()
    }

    // Clear timeout when component unmounts
    return () => clearTimeout(timeOutID)
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

  const renderDialogDetailsFindingMatch = () => {
    return (
      <>
        <DialogTitle>Finding Match</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please wait while the system finds a match for you.
          </DialogContentText>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
          <DialogContentText sx={{ display: 'flex', justifyContent: 'center' }}>
            Time left : {timer}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </>
    )
  }

  const renderDialogDetailsUnableToFindMatch = () => {
    return (
      <>
        <DialogTitle>Unable to Find Match</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            The system is unable to find a match for you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleTryAgain}>Try Again</Button>
        </DialogActions>
      </>
    )
  }

  return (
    <Dialog open={dialogOpen}>
      {timer >= 0 && renderDialogDetailsFindingMatch()}
      {timer < 0 && renderDialogDetailsUnableToFindMatch()}
    </Dialog>
  )
}

export default FindingMatchDialog
