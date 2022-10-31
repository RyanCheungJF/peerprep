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
      className="userauth-container"
      sx={{
        // content height = 100vh - nav bar height
        height: 'calc(100vh - 64px)',
      }}
    >
      <Box className="userauth-flex-container">
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
              className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-semibold rounded-md"
              onClick={() => navigate(toggleDestination)}
            >
              {toggleText}
            </Button>
          </Box>
          <Box>
            <Button
              sx={{ px: 2 }}
              className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-semibold rounded-md"
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
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent dividers>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            {isAuthSuccess ? (
              redirectButton()
            ) : (
              <Button onClick={closeDialog}>OK</Button>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  )
}

export default UserAuth
