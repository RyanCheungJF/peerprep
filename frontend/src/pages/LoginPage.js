import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import UserAuth from '../components/UserAuth'
import SnackbarAlert from '../components/SnackbarAlert'
import {
  AUTH_REDIRECT,
  STATUS_CODE_SUCCESS,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_UNAUTHORIZED,
} from '../utils/constants'
import { homeUrl, param_forcedLogout } from '../utils/routeConstants'
import { loginUser, isUserLoggedIn } from '../api/userService'

const LoginPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)
  const [forcedLogoutAlertOpen, setForcedLogoutAlertOpen] = useState(false)

  const navigate = useNavigate()
  const { search } = useLocation()

  useEffect(() => {
    // reset the state of the toast each time the search params change
    setForcedLogoutAlertOpen(false)

    const params = new URLSearchParams(search)
    if (params.get(param_forcedLogout)) {
      setForcedLogoutAlertOpen(true)
    }
  }, [search])

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
        setSuccessDialog(username)
        setIsLoginSuccess(true)
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
        setErrorDialog('Wrong username and/or password.')
      } else if (err.response.status === STATUS_CODE_BAD_REQUEST) {
        setErrorDialog('Username and/or Password are missing.')
      } else {
        setErrorDialog('Please try again later.')
      }
    }
  }

  const closeDialog = () => setIsDialogOpen(false)

  const setSuccessDialog = (username) => {
    setIsDialogOpen(true)
    setDialogTitle('Logged In Successfully')
    setDialogMsg(`Hi, ${username}!👋 Welcome back to PeerPrep!`)
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
      <Button component={Link} to={redirectUrl} replace={true}>
        OK
      </Button>
    )
  }

  const renderForcedLoggedOutAlert = () => (
    <SnackbarAlert
      alertOpen={forcedLogoutAlertOpen}
      setAlertOpen={setForcedLogoutAlertOpen}
      autoHideDuration={8000}
      severity="error"
      alertMsg={`You have been logged out of your session.
          You may be logged in on another device or your session may have expired.`}
    />
  )

  return (
    <>
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
      {renderForcedLoggedOutAlert()}
    </>
  )
}

export default LoginPage
