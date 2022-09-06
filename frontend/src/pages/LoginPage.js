import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import UserAuth from '../components/UserAuth'
import {
  STATUS_CODE_SUCCESS,
  STATUS_CODE_UNAUTHORIZED,
} from '../utils/constants'
import { checkFormFields } from '../utils/main'
import { loginUser } from '../api/userService'

const LoginPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)

  const handleLogin = async (username, password) => {
    setIsLoginSuccess(false)
    checkFormFields(username, password)
    try {
      const res = await loginUser(username, password, setErrorDialog)
      if (res && res.status === STATUS_CODE_SUCCESS) {
        setSuccessDialog('Logged in successfully!')
        setIsLoginSuccess(true)
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
        setErrorDialog('Wrong username/password.')
      } else {
        setErrorDialog('Please try again later')
      }
    }
  }

  const closeDialog = () => setIsDialogOpen(false)

  const setSuccessDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Success')
    setDialogMsg(msg)
  }

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Error')
    setDialogMsg(msg)
  }

  const redirectButton = (
    <Button component={Link} to="/home">
      Go To Home
    </Button>
  )

  return (
    <UserAuth
      pageTitle="Log in"
      ctaText="Log in"
      toggleText="Create an account!"
      toggleDestination="/signup"
      handleAuth={handleLogin}
      isDialogOpen={isDialogOpen}
      closeDialog={closeDialog}
      dialogTitle={dialogTitle}
      dialogMsg={dialogMsg}
      isAuthSuccess={isLoginSuccess}
      redirectButton={redirectButton}
    />
  )
}

export default LoginPage
