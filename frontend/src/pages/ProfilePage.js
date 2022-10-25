import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Chip,
  Divider,
  Rating,
  Stack,
  Typography,
} from '@mui/material'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import ArchitectureIcon from '@mui/icons-material/Architecture'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FormatPaintIcon from '@mui/icons-material/FormatPaint'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import { getReviewStats } from '../api/reviewService'
import ChangePasswordDialog from '../components/ChangePasswordDialog'
import DeleteAccountDialog from '../components/DeleteAccountDialog'
import { UserContext } from '../contexts/UserContext'
import { homeUrl } from '../utils/routeConstants'

const ProfilePage = () => {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  // Change Password Dialog
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState(false)
  const handleChangePasswordCloseDialog = () =>
    setChangePasswordDialogOpen(false)
  const handleChangePasswordOpenDialog = () => setChangePasswordDialogOpen(true)

  // Delete Account Dialog
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false)
  const handleDeleteAccountCloseDialog = () => setDeleteAccountDialogOpen(false)
  const handleDeleteAccountOpenDialog = () => setDeleteAccountDialogOpen(true)

  // User's ratings
  const [reviewStats, setReviewStats] = useState()

  // Fetch user's ratings
  useEffect(() => {
    const fetchAndSaveReviews = async () => {
      try {
        const res = await getReviewStats(user._id)
        if (res.data) {
          setReviewStats(res.data)
        }
      } catch (error) {
        console.error("Error fetching user's reviews:", error)
      }
    }

    fetchAndSaveReviews()
  }, [user])

  const _renderRating = (icon, label, value) => {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '6px 0px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon}
          <Typography sx={{ ml: 1 }}>{label}</Typography>
        </Box>
        <Rating name="read-only" value={value} precision={0.5} readOnly />
      </Box>
    )
  }

  const _renderRatings = () => {
    if (!reviewStats) {
      return null
    }

    const {
      codeCorrectness,
      codeDesign,
      codeStyle,
      communicationStyle,
      timeManagement,
    } = reviewStats
    return (
      <>
        <Typography variant={'h6'} sx={{ mt: 2 }}>
          Your stats:
        </Typography>
        <Box sx={{ width: '350px' }}>
          {_renderRating(
            <CheckIcon fontSize="small" />,
            'Code Correctness',
            codeCorrectness
          )}
          {_renderRating(
            <ArchitectureIcon fontSize="small" />,
            'Code Design',
            codeDesign
          )}
          {_renderRating(
            <FormatPaintIcon fontSize="small" />,
            'Code Style',
            codeStyle
          )}
          {_renderRating(
            <RecordVoiceOverIcon fontSize="small" />,
            'Communication',
            communicationStyle
          )}
          {_renderRating(
            <AccessTimeFilledIcon fontSize="small" />,
            'Time Management',
            timeManagement
          )}
        </Box>
      </>
    )
  }

  const renderChangePasswordDialog = () => {
    // Return null when changePasswordDialogOpen = false
    // This closes the dialog and unmounts the component.

    // Return ChangePasswordDialog component when changePasswordDialogOpen = true
    // This mounts the component and opens the dialog.
    // This ensures that TextField newPassword is empty on every component mount.
    return !changePasswordDialogOpen ? null : (
      <ChangePasswordDialog
        dialogOpen={changePasswordDialogOpen}
        handleCloseDialog={handleChangePasswordCloseDialog}
      />
    )
  }

  const renderDeleteAccountDialog = () => {
    return (
      <DeleteAccountDialog
        dialogOpen={deleteAccountDialogOpen}
        handleCloseDialog={handleDeleteAccountCloseDialog}
      />
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography variant={'h3'}>Profile Page</Typography>
      </Box>
      <Box sx={{ my: 3, mx: 2 }}>
        <Divider>
          <Chip
            sx={{ p: 2, fontSize: '1.1rem' }}
            label="Personal Information"
            color="primary"
          />
        </Divider>
        <Typography sx={{ mt: 5 }}>Username: {user.username}</Typography>
        {_renderRatings()}
      </Box>
      <Box sx={{ my: 3, mx: 2 }}>
        <Divider>
          <Chip
            sx={{ p: 2, fontSize: '1.1rem' }}
            label="Account Management"
            color="primary"
          />
        </Divider>
        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Chip
            sx={{ fontSize: '1rem' }}
            icon={<EditIcon />}
            label="Change Password"
            color="info"
            variant="outlined"
            onClick={handleChangePasswordOpenDialog}
          />
          <Chip
            sx={{ fontSize: '1rem' }}
            icon={<DeleteIcon />}
            label="Delete Account"
            color="error"
            variant="outlined"
            onClick={handleDeleteAccountOpenDialog}
          />
        </Stack>
      </Box>
      {renderChangePasswordDialog()}
      {renderDeleteAccountDialog()}
      <Box sx={{ my: 3, mx: 2 }}>
        <Button variant={'outlined'} onClick={() => navigate(homeUrl)}>
          Back to Home
        </Button>
      </Box>
    </Box>
  )
}

export default ProfilePage
