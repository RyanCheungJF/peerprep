import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, DialogContentText } from '@mui/material'
import UserAuth from '../components/UserAuth'
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CREATED,
} from '../utils/constants'
import { homeUrl } from '../utils/routeConstants'
import { signupUser, isUserLoggedIn } from '../api/userService'

const SignupPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [isSignupSuccess, setIsSignupSuccess] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate(homeUrl, { replace: true })
    }
  }, [navigate])

  const handleSignup = async (username, password) => {
    setIsSignupSuccess(false)

    try {
      const res = await signupUser(username, password)
      if (res && res.status === STATUS_CODE_CREATED) {
        setSuccessDialog()
        setIsSignupSuccess(true)
      }
    } catch (err) {
      if (err.response.status === STATUS_CODE_CONFLICT) {
        setErrorDialog('This username already exists.')
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
    setDialogTitle('Sign up Success')
    setDialogMsg(
      <>
        <DialogContentText>
          {'Your account has been successfully created.'}
        </DialogContentText>
        <DialogContentText>
          {'You will now be redirected to the Log in page.'}
        </DialogContentText>
      </>
    )
  }

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Unable To Create Account')
    setDialogMsg(
      <>
        <DialogContentText>{msg}</DialogContentText>
      </>
    )
  }

  const redirectButton = () => (
    <Button className="font-inter" component={Link} to="/login">
      OK
    </Button>
  )

  return (
    <UserAuth
      pageTitle="Sign up"
      ctaText="Sign up"
      toggleText="Log in instead"
      toggleDestination="/login"
      handleAuth={handleSignup}
      isDialogOpen={isDialogOpen}
      closeDialog={closeDialog}
      dialogTitle={dialogTitle}
      dialogMsg={dialogMsg}
      isAuthSuccess={isSignupSuccess}
      redirectButton={redirectButton}
    />
  )
}

export default SignupPage
