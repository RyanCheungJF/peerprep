import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { createReviewStats } from '../api/reviewService'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Rating,
  Stack,
} from '@mui/material'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import CheckIcon from '@mui/icons-material/Check'
import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import { homeUrl } from '../utils/routeConstants'

const ReviewPartnerDialog = ({
  dialogOpen,
  handleCloseDialog,
  partneruuid,
}) => {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  const [codeCorrectnessValue, setCodeCorrectnessValue] = useState(0)
  const [codeDesignValue, setCodeDesignValue] = useState(0)
  const [codeStyleValue, setCodeStyleValue] = useState(0)
  const [communicationValue, setCommunicationValue] = useState(0)
  const [timeManagementValue, setTimeManagementValue] = useState(0)

  const handleSkipReview = () => {
    handleCloseDialog()
    navigate(homeUrl, { replace: true })
  }

  const handleSubmitReview = async () => {
    const FIELDS = [
      codeCorrectnessValue,
      codeDesignValue,
      codeStyleValue,
      communicationValue,
      timeManagementValue,
    ]

    await createReviewStats(partneruuid, user._id, FIELDS)

    handleCloseDialog()
    navigate(homeUrl, { replace: true })
  }

  const renderRating = (icon, label, value, setValue) => {
    return (
      <>
        <Grid item xs={4}>
          <DialogContentText>
            <Stack direction="row" alignItems={'center'}>
              {icon}
              {label}
            </Stack>
          </DialogContentText>
        </Grid>
        <Grid item xs={8}>
          <Rating
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            precision={0.5}
          />
        </Grid>
      </>
    )
  }

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={dialogOpen}>
      <DialogTitle>Review Partner</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Review your partner based on the following metrics:
        </DialogContentText>
        <Grid container spacing={2} marginTop={2}>
          {renderRating(
            <CheckIcon fontSize="small" sx={{ mr: 1 }} />,
            'Code Correctness',
            codeCorrectnessValue,
            setCodeCorrectnessValue
          )}
          {renderRating(
            <ArchitectureIcon fontSize="small" sx={{ mr: 1 }} />,
            'Code Design',
            codeDesignValue,
            setCodeDesignValue
          )}
          {renderRating(
            <FormatPaintIcon fontSize="small" sx={{ mr: 1 }} />,
            'Code Style',
            codeStyleValue,
            setCodeStyleValue
          )}
          {renderRating(
            <RecordVoiceOverIcon fontSize="small" sx={{ mr: 1 }} />,
            'Communication',
            communicationValue,
            setCommunicationValue
          )}
          {renderRating(
            <AccessTimeFilledIcon fontSize="small" sx={{ mr: 1 }} />,
            'Time Management',
            timeManagementValue,
            setTimeManagementValue
          )}
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
