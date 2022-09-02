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

const UserAuth = ({
  pageTitle,
  ctaText,
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

  return (
    <Box display={'flex'} flexDirection={'column'} width={'30%'}>
      <Typography variant={'h3'} marginBottom={'2rem'}>
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
      <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
        <Button
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
