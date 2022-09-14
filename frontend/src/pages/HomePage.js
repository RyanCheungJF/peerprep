import { Box, Button, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectDifficulty from '../components/SelectDifficulty'

const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const navigate = useNavigate()

  const handleFindMatch = (difficulty) => {
    if (difficulty === "Easy" || difficulty === "Medium" || difficulty === "Hard") {
      console.log('Difficulty Level Selected: ' + difficulty)
      navigate('/matching')
    } else {
      setErrorDialog('Please select a difficulty level.')
    }
  }

  const closeDialog = () => setIsDialogOpen(false)

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Error')
    setDialogMsg(msg)
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
      <Typography sx={{ marginBottom: '2rem' }} variant={'h3'}>
        {'Home Page'}
      </Typography>
      <Divider sx={{ marginBottom: '2rem' }} variant="middle" />
      <Typography sx={{ marginBottom: '2rem' }} variant={'h5'}>
        {'Account Management'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{ marginBottom: '2rem', marginRight: '2px' }}
          variant={'outlined'}
          onClick={() => navigate('/profile')} 
        >
          {'Profile Page'}
        </Button>
      </Box>
      <Divider sx={{ marginBottom: '2rem' }} variant="middle" />
      <Typography sx={{ marginBottom: '2rem' }} variant={'h5'}>
        {'Find Match'}
      </Typography>
      <SelectDifficulty
        pageTitle="Select Difficulty"
        ctaText="Find Match"
        handleFindMatch={handleFindMatch}
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
        dialogTitle={dialogTitle}
        dialogMsg={dialogMsg}
      />
    </Box>
  )
}

export default HomePage
