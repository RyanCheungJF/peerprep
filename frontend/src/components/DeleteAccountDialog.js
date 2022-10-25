import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { deleteUser } from '../api/userService'
import { UserContext } from '../contexts/UserContext'
import { baseUrl } from '../utils/routeConstants'

const DeleteAccountDialog = ({ dialogOpen, handleCloseDialog }) => {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteUser(user.username)
      console.log('success ', res)
      handleCloseDialog()
      navigate(baseUrl, {
        state: {
          deleteAccountSuccess: true,
          deletedAccountUsername: user.username,
        },
      })
    } catch (err) {
      console.log(`Failed to delete user account: ${err}`)
    }
  }

  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Are you sure you want to delete your account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>No</Button>
        <Button onClick={handleDeleteAccount}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAccountDialog
