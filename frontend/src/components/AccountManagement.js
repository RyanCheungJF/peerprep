import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
  
const AccountManagement = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ my: 3, mx: 2 }}>
      <Typography sx={{ mb:3 }} variant={'h5'}>
        {'Account Management'}
      </Typography>
      <Button
        variant={'outlined'}
        onClick={() => navigate('/profile')} 
      >
        {'Profile Page'}
      </Button>
    </Box>
  )
}

export default AccountManagement
  