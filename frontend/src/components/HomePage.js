import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SelectDifficulty from './SelectDifficulty'
  
const HomePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')

  const handleFindMatch = (difficulty) => {
    if (difficulty === "Easy" || difficulty === "Medium" || difficulty === "Hard") {
      console.log('Difficulty Level Selected: ' + difficulty)
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
    <SelectDifficulty
      pageTitle="Select Difficulty"
      ctaText="Find Match"
      handleFindMatch={handleFindMatch}
      isDialogOpen={isDialogOpen}
      closeDialog={closeDialog}
      dialogTitle={dialogTitle}
      dialogMsg={dialogMsg}
    />
  )
}

export default HomePage
