import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import UserAuth from '../components/UserAuth'
import { signupUser, isUserLoggedIn } from '../api/userService'
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CREATED,
} from '../utils/constants'
import { homeUrl } from '../utils/routeConstants'
import { checkFormFields } from '../utils/main'

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

    // This is not utilised because setErrorDialog() in the catch replaces
    // the message in the error dialog
    checkFormFields(username, password, setErrorDialog)

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
        // With the modified implementation of UserAuth,
        // we ensure that both username and/or password are not empty
        // before we process the authentication (sign up).

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
    setDialogTitle('Account Created Successfully')
    setDialogMsg('You will now be redirected to the Login page.')
  }

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true)
    setDialogTitle('Unable To Create Account')
    setDialogMsg(msg)
  }

  const redirectButton = () => (
    <Button className="font-inter" component={Link} to="/login">
      Log in
    </Button>
  )

  return (
    <UserAuth
      pageTitle="Sign up"
      ctaText="Sign up"
      toggleText="Login instead!"
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
