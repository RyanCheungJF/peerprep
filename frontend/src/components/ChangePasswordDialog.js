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

const ChangePasswordDialog = ({ isDialogOpen, handleCloseDialog }) => {
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordTextFieldChanged, setNewPasswordTextFieldChanged] =
    useState(false)
  const user = useContext(UserContext)

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
    } catch (err) {
      console.log('error: ', err)
    }
  }

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={isDialogOpen}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Please enter your new password below and submit.
        </DialogContentText>
        {!newPassword && !newPasswordTextFieldChanged && (
          <div>
            <TextField
              autoFocus
              fullWidth
              margin="normal"
              label="New Password"
              type="password"
              variant="standard"
              value={newPassword}
              onChange={(e) => {
                setNewPasswordTextFieldChanged(true)
                setNewPassword(e.target.value)
              }}
            />
          </div>
        )}
        {newPassword && newPasswordTextFieldChanged && (
          <div>
            <TextField
              autoFocus
              fullWidth
              margin="normal"
              label="New Password"
              type="password"
              variant="standard"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        )}
        {!newPassword && newPasswordTextFieldChanged && (
          <div>
            <TextField
              autoFocus
              error
              fullWidth
              margin="normal"
              label="New Password"
              helperText="New password cannot be empty"
              variant="standard"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleChangePassword}>Submit</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangePasswordDialog
