import { Box, Divider, Typography } from '@mui/material'
import AccountManagement from '../components/AccountManagement'
import FindMatch from '../components/FindMatch'

const HomePage = () => {
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
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography variant={'h3'}>
          {'Home'}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <AccountManagement />
      <Divider variant="middle" />
      <FindMatch />
    </Box>
  )
}

export default HomePage
