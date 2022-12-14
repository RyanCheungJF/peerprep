import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Chip, Divider, Rating, Stack } from '@mui/material'
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
import SnackbarAlert from '../components/SnackbarAlert'
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

  // Change Password Success Alert
  const [changePasswordSuccessAlertOpen, setChangePasswordSuccessAlertOpen] =
    useState(false)
  const handleChangePasswordSuccessOpenAlert = () =>
    setChangePasswordSuccessAlertOpen(true)

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
      <Box className="profile-page-rating-wrapper">
        <Box className="profile-page-rating-icon-and-label-wrapper">
          {icon}
          <p className="profile-page-rating-label ml-2">{label}</p>
        </Box>
        <Rating
          name="read-only-rating"
          value={value}
          precision={0.5}
          readOnly
        />
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
        <p className="profile-page-sub-header pb-4">My Stats:</p>
        <Box>
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
        handleSuccessOpenAlert={handleChangePasswordSuccessOpenAlert}
      />
    )
  }

  const renderChangePasswordSuccessAlert = () => {
    return (
      <SnackbarAlert
        alertOpen={changePasswordSuccessAlertOpen}
        setAlertOpen={setChangePasswordSuccessAlertOpen}
        severity="success"
        alertMsg="Your password has been changed successfully!"
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
      className="profile-page-container"
      sx={{
        // content height = 100vh - nav bar height
        height: 'calc(100vh - 64px)',
      }}
    >
      <Box className="profile-page-container-wrapper">
        <Box className="p-6">
          <p className="profile-page-header">My Profile ????????</p>
        </Box>
        <Box className="p-6">
          <Divider>
            <Chip
              className="font-inter"
              sx={{ p: 2, fontSize: '1.1rem' }}
              label="Personal Information"
              color="primary"
            />
          </Divider>
          <Box className="pt-6">
            <Box>
              <p className="profile-page-sub-header pb-4">Username:</p>
              <p className="profile-page-normal-text">{user.username}</p>
            </Box>
            <Box className="pt-12">{_renderRatings()}</Box>
          </Box>
        </Box>
        <Box className="p-6">
          <Divider>
            <Chip
              className="font-inter"
              sx={{ p: 2, fontSize: '1.1rem' }}
              label="Account Management"
              color="primary"
            />
          </Divider>
          <Box className="pt-6">
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Chip
                className="font-inter"
                sx={{ fontSize: '1rem' }}
                icon={<EditIcon />}
                label="Change Password"
                color="info"
                variant="outlined"
                onClick={handleChangePasswordOpenDialog}
              />
              <Chip
                className="font-inter"
                sx={{ fontSize: '1rem' }}
                icon={<DeleteIcon />}
                label="Delete Account"
                color="error"
                variant="outlined"
                onClick={handleDeleteAccountOpenDialog}
              />
            </Stack>
          </Box>
        </Box>
        {renderChangePasswordDialog()}
        {renderChangePasswordSuccessAlert()}
        {renderDeleteAccountDialog()}
        <Box className="p-6">
          <Button
            className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-medium rounded-md px-6"
            onClick={() => navigate(homeUrl)}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfilePage
