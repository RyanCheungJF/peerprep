import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { deleteUser } from '../api/userService'
import { baseUrl } from '../utils/routeConstants'
import SnackbarAlert from './SnackbarAlert'

const DeleteAccountDialog = ({ dialogOpen, handleNo }) => {
  const navigate = useNavigate()
  const user = useContext(UserContext)

  // Delete Account Successful Alert
  const [
    deleteAccountSuccessfulAlertOpen,
    setDeleteAccountSuccessfulAlertOpen,
  ] = useState(false)
  const handleDeleteAccountSuccessfulOpenAlert = () =>
    setDeleteAccountSuccessfulAlertOpen(true)

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.username)
      navigate(baseUrl)

      // The alert will not show as the parent component (ProfilePage)
      // is killed after navigating to baseUrl.
      // Will implement alert with navigate (passing props).
      handleDeleteAccountSuccessfulOpenAlert()
    } catch (err) {
      console.log(`Failed to delete user account: ${err}`)
    }
  }

  const renderDeleteAccountSuccessfulAlert = () => {
    if (!deleteAccountSuccessfulAlertOpen) {
      return null
    }

    return (
      <>
        <SnackbarAlert
          alertOpen={deleteAccountSuccessfulAlertOpen}
          setAlertOpen={setDeleteAccountSuccessfulAlertOpen}
          severity="success"
          alertMsg="Your account has been deleted successfully!"
        />
      </>
    )
  }

  return (
    <>
      <Dialog open={dialogOpen}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNo}>No</Button>
          <Button onClick={handleDeleteAccount}>Yes</Button>
        </DialogActions>
      </Dialog>
      {renderDeleteAccountSuccessfulAlert()}
    </>
  )
}

export default DeleteAccountDialog
