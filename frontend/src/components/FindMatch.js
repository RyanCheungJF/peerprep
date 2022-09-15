import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
  } from '@mui/material'
  import { useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  
  const FindMatch = () => {
    const [difficulty, setDifficulty] = useState('');
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
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography sx={{ mb:3 }} variant={'h5'}>
          {'Find Match'}
        </Typography>

        <FormControl fullWidth sx={{ mb:3 }}>
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
          variant={'outlined'}
          onClick={() => handleFindMatch(difficulty)}
        >
          {'Find Match'}
        </Button>

        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMsg}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>OK</Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }

  export default FindMatch
  