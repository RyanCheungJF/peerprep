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
  const [usernameSubmittedEmpty, setUsernameSubmittedEmpty] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordSubmittedEmpty, setPasswordSubmittedEmpty] = useState(false)

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
      <p className="userauth-title">{pageTitle}</p>
      <TextField
        autoFocus
        error={usernameSubmittedEmpty}
        label="Username"
        helperText={usernameSubmittedEmpty ? 'Username cannot be empty' : ''}
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: '1rem' }}
      />
      <TextField
        error={passwordSubmittedEmpty}
        label="Password"
        helperText={passwordSubmittedEmpty ? 'Password cannot be empty' : ''}
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
            sx={{ px: 2 }}
            className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-xl"
            onClick={() => navigate(toggleDestination)}
          >
            {toggleText}
          </Button>
        </Box>
        <Box>
          <Button
            sx={{ px: 2 }}
            className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-xl"
            onClick={() => {
              setUsernameSubmittedEmpty(username === '')
              setPasswordSubmittedEmpty(password === '')
              if (username && password) {
                handleAuth(username, password)
              }
            }}
          >
            {ctaText}
          </Button>
        </Box>
      </Box>

      <Dialog fullWidth={true} maxWidth="xs" open={isDialogOpen}>
        <DialogTitle className="font-inter">{dialogTitle}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText className="font-inter">
            {dialogMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isAuthSuccess ? (
            redirectButton()
          ) : (
            <Button className="font-inter" onClick={closeDialog}>
              OK
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserAuth
