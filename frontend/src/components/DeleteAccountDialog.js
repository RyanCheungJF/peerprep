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
import { UserContext } from '../contexts/UserContext'
import { deleteUser } from '../api/userService'
import { baseUrl } from '../utils/routeConstants'

const DeleteAccountDialog = ({ dialogOpen, handleNo }) => {
  const navigate = useNavigate()
  const user = useContext(UserContext)

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(user.username)
      navigate(baseUrl)
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
        <Button onClick={handleNo}>No</Button>
        <Button onClick={handleDeleteAccount}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAccountDialog
