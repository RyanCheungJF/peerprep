import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
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
      <Typography sx={{ marginBottom: '2rem' }} variant={'h3'}>
        {pageTitle}
      </Typography>
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
        <Button
          sx={{ marginRight: '2px' }}
          variant={'outlined'}
          onClick={() => navigate(toggleDestination)}
        >
          {toggleText}
        </Button>
        <Button
          sx={{ marginLeft: '2px' }}
          variant={'outlined'}
          onClick={() => handleAuth(username, password)}
        >
          {ctaText}
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {isAuthSuccess ? (
            redirectButton
          ) : (
            <Button onClick={closeDialog}>Done</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default UserAuth
