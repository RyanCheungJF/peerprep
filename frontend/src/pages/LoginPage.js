import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import UserAuth from '../components/UserAuth'
import {
  AUTH_REDIRECT,
  STATUS_CODE_SUCCESS,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_UNAUTHORIZED,
} from '../utils/constants'
import { homeUrl } from '../utils/routeConstants'
import { loginUser, isUserLoggedIn } from '../api/userService'

const LoginPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate(homeUrl, { replace: true })
    }
  }, [navigate])

  const handleLogin = async (username, password) => {
    setIsLoginSuccess(false)

    try {
      const res = await loginUser(username, password)
      if (res && res.status === STATUS_CODE_SUCCESS) {
        setSuccessDialog()
        setIsLoginSuccess(true)
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
        setErrorDialog('Wrong username/password.')
      } else if (err.response.status === STATUS_CODE_BAD_REQUEST) {
        setErrorDialog('Username and/or Password are missing.')
      } else {
        setErrorDialog('Please try again later.')
      }
    }
  }

  const closeDialog = () => setIsDialogOpen(false)

  const setSuccessDialog = () => {
    setIsDialogOpen(true)
    setDialogTitle('Logged In Successfully')
    setDialogMsg('You will now be redirected to the Home page.')
  }

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Unable To Log In')
    setDialogMsg(msg)
  }

  const redirectButton = () => {
    const redirectUrl = window.localStorage.getItem(AUTH_REDIRECT) ?? homeUrl
    // reset the redirect url since it's only used this one time
    window.localStorage.removeItem(AUTH_REDIRECT)
    return (
      <Button
        className="font-inter"
        component={Link}
        to={redirectUrl}
        replace={true}
      >
        OK
      </Button>
    )
  }

  return (
    <UserAuth
      pageTitle="Log in"
      ctaText="Log in"
      toggleText="Create an account"
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
