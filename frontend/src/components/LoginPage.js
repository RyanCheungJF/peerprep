import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import UserAuth from './UserAuth'
import { URL_USER_LOGIN_SVC } from '../configs'
import { STATUS_CODE_SUCCESS, STATUS_CODE_UNAUTHORIZED } from '../constants'

const LoginPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMsg, setDialogMsg] = useState('')
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)

  const handleLogin = async (username, password) => {
    setIsLoginSuccess(false)
    try {
      const res = await axios.post(URL_USER_LOGIN_SVC, { username, password })
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

  /**
   * TODO: just a placeholder link right now
   */
  const redirectButton = (
    <Button component={Link} to="/home">
      Go To Home
    </Button>
  )

  return (
    <UserAuth
      pageTitle="Log in"
      ctaText="Log in"
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
