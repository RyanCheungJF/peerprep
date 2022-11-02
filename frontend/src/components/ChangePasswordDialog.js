import { useContext, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { changeUserPassword } from '../api/userService'
import { UserContext } from '../contexts/UserContext'
import SnackbarAlert from './SnackbarAlert'

const ChangePasswordDialog = ({ dialogOpen, handleCloseDialog }) => {
  const user = useContext(UserContext)

  const [newPassword, setNewPassword] = useState('')
  const [newPasswordTextFieldChanged, setNewPasswordTextFieldChanged] =
    useState(false)

  // Change Password Success Alert
  const [changePasswordSuccessAlertOpen, setChangePasswordSuccessAlertOpen] =
    useState(false)
  const handleChangePasswordSuccessOpenAlert = () =>
    setChangePasswordSuccessAlertOpen(true)

  const handleChangePassword = async () => {
    if (!newPassword) {
      console.log('Password cannot be empty!')
      return
    }

    try {
      const res = await changeUserPassword(user._id, newPassword)
      console.log('success ', res)
      handleCloseDialog()
      handleChangePasswordSuccessOpenAlert()
    } catch (err) {
      console.log('error: ', err)
    }
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

  const renderChangePasswordDialog = () => {
    return (
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
            type="password"
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleChangePassword}>Submit</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      {renderChangePasswordDialog()}
      {renderChangePasswordSuccessAlert()}
    </>
  )
}

export default ChangePasswordDialog
