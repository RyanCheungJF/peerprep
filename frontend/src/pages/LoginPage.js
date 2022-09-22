import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Button } from '@mui/material'
import UserAuth from '../components/UserAuth'
import {
  AUTH_REDIRECT,
  STATUS_CODE_SUCCESS,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_UNAUTHORIZED,
} from '../utils/constants'
import { homeUrl } from '../utils/routeConstants'
import { checkFormFields } from '../utils/main'
import { loginUser, isUserLoggedIn } from '../api/userService'

const LoginPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)

  if (isUserLoggedIn()) {
    return <Navigate to={homeUrl} replace={true} />
  }

  const handleLogin = async (username, password) => {
    setIsLoginSuccess(false)
    checkFormFields(username, password, setErrorDialog)
    try {
      const res = await loginUser(username, password)
      if (res && res.status === STATUS_CODE_SUCCESS) {
        setSuccessDialog('Logged in successfully!')
        setIsLoginSuccess(true)
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
        setErrorDialog('Wrong username/password.')
      } else if (err.response.status === STATUS_CODE_BAD_REQUEST) {
        setErrorDialog('Username and/or Password are missing!')
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

  const redirectButton = () => {
    const redirectUrl = window.localStorage.getItem(AUTH_REDIRECT) ?? homeUrl
    return (
      <Button component={Link} to={redirectUrl} replace={true}>
        Close
      </Button>
    )
  }

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
