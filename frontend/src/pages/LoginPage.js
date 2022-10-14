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
import { checkFormFields } from '../utils/main'
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

    // This is not utilised because setErrorDialog() in the catch replaces
    // the message in the error dialog
    checkFormFields(username, password, setErrorDialog)

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
        // With the modified implementation of UserAuth,
        // we ensure that both username and/or password are not empty
        // before we process the authentication (login).

        // Hence, we should be able to remove this else if clause.
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
    setDialogTitle('Unable To Login')
    setDialogMsg(msg)
  }

  const redirectButton = () => {
    const redirectUrl = window.localStorage.getItem(AUTH_REDIRECT) ?? homeUrl
    // reset the redirect url since it's only used this one time
    window.localStorage.removeItem(AUTH_REDIRECT)
    return (
      <Button component={Link} to={redirectUrl} replace={true}>
        Close
      </Button>
    )
  }

  return (
    <UserAuth
      pageTitle="Login"
      ctaText="Login"
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
