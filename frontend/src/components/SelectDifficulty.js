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
  } from '@mui/material'
  import { useState } from 'react'
  
  const SelectDifficulty = ({
    ctaText,
    handleFindMatch,
    isDialogOpen,
    closeDialog,
    dialogTitle,
    dialogMsg,
  }) => {
    const [difficulty, setDifficulty] = useState('');

    return (
      <Box display={'flex'} flexDirection={'column'} width={'30%'}>
        <FormControl fullWidth>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficulty}
            label="Difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
            sx={{ marginBottom: '2rem' }}
          >
            <MenuItem value="Easy">Easy</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Hard">Hard</MenuItem>
          </Select>
        </FormControl>

        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
          <Button
            variant={'outlined'}
            onClick={() => handleFindMatch(difficulty)}
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
            <Button onClick={closeDialog}>OK</Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  }

  export default SelectDifficulty
  