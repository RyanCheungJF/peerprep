import { useNavigate } from 'react-router-dom'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from '@mui/material'
import { deleteUser } from '../api/userService'
import { baseUrl } from '../utils/routeConstants'
  
  const DeleteAccountDialog = ({ isDialogOpen, handleNo }) => {
    const navigate = useNavigate()

    // Hardcoded for now also. Will read this from context next time.
    const username = 'samtest10'
    const handleDeleteAccount = async () => {
      try {
        await deleteUser(username)
        navigate(baseUrl)
      } catch (err) {
        console.log(`Failed to delete user account: ${err}`)
      }
    }

    return (
      <Dialog open={isDialogOpen}>
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
  