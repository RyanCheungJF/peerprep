import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Rating,
} from '@mui/material'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import CheckIcon from '@mui/icons-material/Check'
import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import { homeUrl } from '../utils/routeConstants'

const ReviewPartnerDialog = ({ dialogOpen, handleCloseDialog }) => {
  const navigate = useNavigate()

  const [codeCorrectnessValue, setCodeCorrectnessValue] = useState(0)
  const [codeDesignValue, setCodeDesignValue] = useState(0)
  const [codeStyleValue, setCodeStyleValue] = useState(0)
  const [communicationValue, setCommunicationValue] = useState(0)
  const [timeManagementValue, setTimeManagementValue] = useState(0)

  const handleSkipReview = () => {
    handleCloseDialog()
    navigate(homeUrl)
  }

  const handleSubmitReview = () => {
    /*
      TODO: Integrate backend of review service

      Values are represented as follows:
        Code Correctness: codeCorrectnessValue
        Code Design: codeDesignValue
        Code Style: codeStyleValue
        Communication: communicationValue
        Time Management: timeManagementValue
    */

    handleCloseDialog()
    navigate(homeUrl)
  }

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={dialogOpen}>
      <DialogTitle>Review Partner</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Review your partner based on the following metrics:
        </DialogContentText>
        <Grid container spacing={2} marginTop={2}>
          <Grid item xs={4}>
            <DialogContentText>
              <CheckIcon fontSize="small" sx={{ mr: 1 }} />
              Code Correctness
            </DialogContentText>
          </Grid>
          <Grid item xs={8}>
            <Rating
              name="code-correctness-rating"
              value={codeCorrectnessValue}
              onChange={(event, newValue) => {
                setCodeCorrectnessValue(newValue)
              }}
              precision={0.5}
            />
          </Grid>
          <Grid item xs={4}>
            <DialogContentText>
              <ArchitectureIcon fontSize="small" sx={{ mr: 1 }} />
              Code Design
            </DialogContentText>
          </Grid>
          <Grid item xs={8}>
            <Rating
              name="code-design-rating"
              value={codeDesignValue}
              onChange={(event, newValue) => {
                setCodeDesignValue(newValue)
              }}
              precision={0.5}
            />
          </Grid>
          <Grid item xs={4}>
            <DialogContentText>
              <FormatPaintIcon fontSize="small" sx={{ mr: 1 }} />
              Code Style
            </DialogContentText>
          </Grid>
          <Grid item xs={8}>
            <Rating
              name="code-style-rating"
              value={codeStyleValue}
              onChange={(event, newValue) => {
                setCodeStyleValue(newValue)
              }}
              precision={0.5}
            />
          </Grid>
          <Grid item xs={4}>
            <DialogContentText>
              <RecordVoiceOverIcon fontSize="small" sx={{ mr: 1 }} />
              Communication
            </DialogContentText>
          </Grid>
          <Grid item xs={8}>
            <Rating
              name="communication-rating"
              value={communicationValue}
              onChange={(event, newValue) => {
                setCommunicationValue(newValue)
              }}
              precision={0.5}
            />
          </Grid>
          <Grid item xs={4}>
            <DialogContentText>
              <AccessTimeFilledIcon fontSize="small" sx={{ mr: 1 }} />
              Time Management
            </DialogContentText>
          </Grid>
          <Grid item xs={8}>
            <Rating
              name="time-management-rating"
              value={timeManagementValue}
              onChange={(event, newValue) => {
                setTimeManagementValue(newValue)
              }}
              precision={0.5}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSkipReview}>Skip</Button>
        <Button onClick={handleSubmitReview}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ReviewPartnerDialog
