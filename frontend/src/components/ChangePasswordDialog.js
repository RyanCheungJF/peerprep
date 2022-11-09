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

const ChangePasswordDialog = ({
  dialogOpen,
  handleCloseDialog,
  handleSuccessOpenAlert,
}) => {
  const user = useContext(UserContext)

  const [newPassword, setNewPassword] = useState('')
  const [newPasswordTextFieldChanged, setNewPasswordTextFieldChanged] =
    useState(false)

  const handleChangePassword = async () => {
    if (!newPassword) {
      setNewPasswordTextFieldChanged(true)
      return
    }

    try {
      const res = await changeUserPassword(user._id, newPassword)
      console.log('success ', res)
      handleCloseDialog()
      handleSuccessOpenAlert()
    } catch (err) {
      console.log('error: ', err)
    }
  }

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

export default ChangePasswordDialog
