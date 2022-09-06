import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()

  // hardcoded value for now, for those doing cookies/ jwt/ context
  // need to read from there
  // to test, check atlas to see if there are changes to the hash
  const username = 'mergetest'

  const handleChangePassword = async (password) => {
    if (!newPassword) {
      // will add in some ui component in the future to reflect
      // but for now can just check with console.log
      console.log('Password cannot be empty!')
      return
    }
    
  }

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
      {' '}
      <Typography sx={{ marginBottom: '2rem' }} variant={'h3'}>
        {'Profile lmao'}
      </Typography>
      <TextField
        label="New Password"
        variant="standard"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ marginBottom: '1rem' }}
        autoFocus
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{ margin: '2px' }}
          variant={'outlined'}
          onClick={() => console.log('hi')}
        >
          {'Change Password'}
        </Button>
        <Button
          sx={{ margin: '2px' }}
          variant={'outlined'}
          onClick={() => navigate('/home')}
        >
          {'Back to Home'}
        </Button>
      </Box>
    </Box>
  )
}

export default ProfilePage
