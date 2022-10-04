import { Box, Chip, Divider, Typography } from '@mui/material'
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
        <Typography variant={'h3'}>Home Page</Typography>
      </Box>
      <Box sx={{ my: 3, mx: 2 }}>
        <Divider>
          <Chip
            sx={{ p: 2, fontSize: '1.1rem' }}
            label="Find Match"
            color="primary"
          />
        </Divider>
        <FindMatch />
      </Box>
    </Box>
  )
}

export default HomePage
