import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserAuth = ({
  pageTitle,
  ctaText,
  toggleText,
  toggleDestination,
  handleAuth,
  isDialogOpen,
  closeDialog,
  dialogTitle,
  dialogMsg,
  isAuthSuccess,
  redirectButton,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <p className="login-title">{pageTitle}</p>
      <TextField
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: '1rem' }}
        autoFocus
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: '2rem' }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Box className="left-button-wrapper">
          <Button
            className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-2xl"
            variant={'outlined'}
            onClick={() => navigate(toggleDestination)}
          >
            {toggleText}
          </Button>
        </Box>
        <Box>
          <Button
            className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-2xl"
            variant={'outlined'}
            onClick={() => handleAuth(username, password)}
          >
            {ctaText}
          </Button>
        </Box>
      </Box>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle className="font-inter">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText className="font-inter">
            {dialogMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isAuthSuccess ? (
            redirectButton()
          ) : (
            <Button className="font-inter" onClick={closeDialog}>
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserAuth
