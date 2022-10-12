import { useEffect } from 'react'
import '../index.css'
import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from '../api/userService'
import { homeUrl } from '../utils/routeConstants'

const LandingPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate(homeUrl, { replace: true })
    }
  }, [navigate])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '70%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box className="landingpage-text-container">
        <p className="landingpage-title">{'PeerPrep'}</p>
        <p className="landingpage-question">{'What is PeerPrep?'}</p>
        <p className="landingpage-description">
          {
            'PeerPrep is an online collaborative tool to discuss algorithmic questions.'
          }
        </p>
        <p className="landingpage-description">
          {
            'It simulates technical interviews and lets you and your partner simulate the different roles!'
          }
        </p>
      </Box>
      <Box className="landingpage-button-container">
        <Box className="landingpage-button-wrapper pt-16">
          <Button
            className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-2xl w-1/2"
            onClick={() => navigate('/login')}
          >
            {'Log In!'}
          </Button>
        </Box>
        <Box className="landingpage-button-wrapper">
          <Button
            className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-bold rounded-2xl w-1/2"
            onClick={() => navigate('/signup')}
          >
            {'Sign Up!'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default LandingPage
