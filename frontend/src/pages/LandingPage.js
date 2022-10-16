import { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserLoggedIn } from '../api/userService'
import { baseUrl, homeUrl } from '../utils/routeConstants'
import SnackbarAlert from '../components/SnackbarAlert'

const LandingPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [deletedAccountUsername, setDeletedAccountUsername] = useState('')

  // Delete Account Success Alert
  const [deleteAccountSuccessAlertOpen, setDeleteAccountSuccessAlertOpen] =
    useState(false)
  const handleDeleteAccountSuccessOpenAlert = () =>
    setDeleteAccountSuccessAlertOpen(true)

  // Check if location state is null
  // If null, means no account was deleted before loading this page
  // Set location state to indicate that no account was deleted
  if (location.state === null) {
    location.state = {
      deleteAccountSuccess: false,
      deletedAccountUsername: '',
    }
  }

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate(homeUrl, { replace: true })
    } else {
      // Check if location state indicates that an account was deleted successfully
      // If true, display success alert (with the deleted account username)
      // Reset the page with navigate(baseUrl, { replace: true })
      // The navigation will replace the current entry in the history stack
      if (location.state.deleteAccountSuccess) {
        setDeletedAccountUsername(location.state.deletedAccountUsername)
        handleDeleteAccountSuccessOpenAlert()
        navigate(baseUrl, { replace: true })
      }
    }
  }, [navigate, location, deleteAccountSuccessAlertOpen])

  const renderDeleteAccountSuccessAlert = () => {
    if (!deleteAccountSuccessAlertOpen) {
      return null
    }

    return (
      <SnackbarAlert
        alertOpen={deleteAccountSuccessAlertOpen}
        setAlertOpen={setDeleteAccountSuccessAlertOpen}
        severity="success"
        alertMsg={`Your account ${deletedAccountUsername} has been deleted successfully!`}
      />
    )
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '70%',
          position: 'absolute',
          left: '60%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Box className="landingpage-text-container">
          <p className="landingpage-title">{'PeerPrep'}</p>
          <p className="landingpage-question">
            {'Studying for interviews has never been easier.'}
          </p>
          <p className="landingpage-description">
            {
              'PeerPrep is an online collaborative tool to discuss algorithmic questions.'
            }
          </p>
          <p className="landingpage-description">
            {
              'It simulates technical interviews and lets you and your partner simulate the different roles!'
            }
          </p>
        </Box>
        <Box className="landingpage-button-container">
          <Box className="landingpage-button-wrapper">
            <Button
              className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-2xl w-1/4"
              onClick={() => navigate('/login')}
            >
              {'Log In'}
            </Button>
          </Box>
          <Box className="landingpage-button-wrapper">
            <Button
              className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-2xl w-1/4"
              onClick={() => navigate('/signup')}
            >
              {'Sign Up'}
            </Button>
          </Box>
        </Box>
      </Box>
      {renderDeleteAccountSuccessAlert()}
    </>
  )
}

export default LandingPage
