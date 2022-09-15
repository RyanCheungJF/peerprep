import { Box, Button, Divider, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectDifficulty from '../components/SelectDifficulty'

const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [difficulty, setDifficulty] = useState('');
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
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography variant={'h3'}>
          {'Home Page'}
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography sx={{ marginBottom: '2rem' }} variant={'h6'}>
          {'Account Management'}
        </Typography>
        <Button
          sx={{ my: '2px' }}
          variant={'outlined'}
          onClick={() => navigate('/profile')} 
        >
          {'Profile Page'}
        </Button>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography sx={{ marginBottom: '2rem' }} variant={'h6'}>
        {'Find Match'}
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: '2rem' }}>
          <InputLabel>Select Difficulty</InputLabel>
          <Select
            value={difficulty}
            label="Select Difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        </FormControl>

        <Button
          sx={{ my: '2px' }}
          variant={'outlined'}
          onClick={() => handleFindMatch(difficulty)}
        >
          {'Find Match'}
        </Button>
      </Box>
    </Box>
  )
}

export default HomePage
