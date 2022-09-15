import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { changeUserPassword, deleteUser } from '../api/userService'
import { homeUrl, baseUrl } from '../utils/routeConstants'

const ProfilePage = () => {
  const [newPassword, setNewPassword] = useState('')
  const navigate = useNavigate()

  // hardcoded value for now, for those doing cookies/ jwt/ context
  // need to read from there
  // to test, check atlas to see if there are changes to the hash
  const uuid = '6311b4362716d8f9d80288bb'

  const handleChangePassword = async () => {
    if (!newPassword) {
      // will add in some ui component in the future to reflect
      // but for now can just check with console.log
      console.log('Password cannot be empty!')
      return
    }
    try {
      const res = await changeUserPassword(uuid, newPassword)
      console.log('success ', res)
    } catch (err) {
      console.log('error: ', err)
    }
  }

  // hardcoded for now also. Will read this from context next time.
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
          onClick={handleChangePassword}
        >
          {'Change Password'}
        </Button>
        <Button
          sx={{ margin: '2px' }}
          variant={'outlined'}
          color={'error'}
          onClick={handleDeleteAccount}
        >
          {'Delete Account'}
        </Button>
        <Button
          sx={{ margin: '2px' }}
          variant={'outlined'}
          onClick={() => navigate(homeUrl)}
        >
          {'Back to Home'}
        </Button>
      </Box>
    </Box>
  )
}

export default ProfilePage
