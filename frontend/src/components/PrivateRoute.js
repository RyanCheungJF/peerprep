import { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { UserContext } from '../contexts/UserContext'
import { isUserLoggedIn, getUser } from '../api/userService'
import { loginUrl } from '../utils/routeConstants'
import { AUTH_REDIRECT, COOKIES_AUTH_TOKEN } from '../utils/constants'

// enum for the different view states in an FSM-pattern
const PrivateRouteViewState = {
  loading: 'LOADING',
  authed: 'AUTHED',
  unauthed: 'UNAUTHED',
}

const PrivateRoute = ({ children }) => {
  const [viewState, setViewState] = useState(PrivateRouteViewState.loading)
  const [user, setUser] = useState({})
  const location = useLocation()

  useEffect(() => {
    setViewState(PrivateRouteViewState.loading)

    const authCheck = async () => {
      if (!isUserLoggedIn()) {
        setViewState(PrivateRouteViewState.unauthed)
        return
      }

      try {
        const response = await getUser()
        setUser(response.data)
        setViewState(PrivateRouteViewState.authed)
      } catch (err) {
        // JWT possibly expired or invalid
        console.error('Error initializaing app', err)
        setViewState(PrivateRouteViewState.unauthed)
      }
    }

    // set a delay so that the loading state lasts at least 300ms.
    // Otherwise, the loading spinner might flash for a very short time and cause flicker
    setTimeout(authCheck, 300)
  }, [location.pathname])

  const _renderLoading = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '5%' }}>
        <CircularProgress />
      </Box>
    )
  }

  const _renderRedirect = () => {
    // Save the url of the current page before redirecting the user to log in.
    // Allows us to bring the user back to the page he/she was trying to access after logging in.
    window.localStorage.setItem(AUTH_REDIRECT, location.pathname)
    Cookies.remove(COOKIES_AUTH_TOKEN)
    return <Navigate to={loginUrl} replace={true} />
  }

  switch (viewState) {
    case PrivateRouteViewState.loading:
      return _renderLoading()

    case PrivateRouteViewState.unauthed:
      return _renderRedirect()

    case PrivateRouteViewState.authed:
      return (
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      )

    default:
      return null
  }
}

export default PrivateRoute
