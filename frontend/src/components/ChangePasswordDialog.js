import { useState, useContext } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { UserContext } from '../contexts/UserContext'
import { changeUserPassword } from '../api/userService'
import SnackbarAlert from './SnackbarAlert'

const ChangePasswordDialog = ({ dialogOpen, handleCloseDialog }) => {
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordTextFieldChanged, setNewPasswordTextFieldChanged] =
    useState(false)

  const user = useContext(UserContext)

  // Change Password Success Alert
  const [changePasswordSuccessAlertOpen, setChangePasswordSuccessAlertOpen] =
    useState(false)
  const handleChangePasswordSuccessOpenAlert = () =>
    setChangePasswordSuccessAlertOpen(true)

  const handleCancel = () => {
    setNewPassword('')
    setNewPasswordTextFieldChanged(false)
    handleCloseDialog()
  }

  const handleChangePassword = async () => {
    if (!newPassword) {
      console.log('Password cannot be empty!')
      setNewPassword('')
      setNewPasswordTextFieldChanged(true)
      return
    }

    try {
      const res = await changeUserPassword(user._id, newPassword)
      console.log('success ', res)
      setNewPassword('')
      setNewPasswordTextFieldChanged(false)
      handleCloseDialog()
      handleChangePasswordSuccessOpenAlert()
    } catch (err) {
      console.log('error: ', err)
    }
  }

  const renderChangePasswordSuccessAlert = () => {
    if (!changePasswordSuccessAlertOpen) {
      return null
    }

    return (
      <SnackbarAlert
        alertOpen={changePasswordSuccessAlertOpen}
        setAlertOpen={setChangePasswordSuccessAlertOpen}
        severity="success"
        alertMsg="Your password has been changed successfully!"
      />
    )
  }

  return (
    <>
      <Dialog fullWidth={true} maxWidth="sm" open={dialogOpen}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Please enter your new password below and submit.
          </DialogContentText>
          <TextField
            autoFocus
            error={!newPassword && newPasswordTextFieldChanged}
            fullWidth
            margin="normal"
            label="New Password"
            helperText={
              !newPassword && newPasswordTextFieldChanged
                ? 'New password cannot be empty'
                : ''
            }
            variant="standard"
            value={newPassword}
            onChange={(e) => {
              !newPassword &&
                !newPasswordTextFieldChanged &&
                setNewPasswordTextFieldChanged(true)
              setNewPassword(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleChangePassword}>Submit</Button>
        </DialogActions>
      </Dialog>
      {renderChangePasswordSuccessAlert()}
    </>
  )
}

export default ChangePasswordDialog
