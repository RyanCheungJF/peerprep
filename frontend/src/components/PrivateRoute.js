import { Navigate, useLocation } from 'react-router-dom'
import { getJWT } from '../api/userService'
import { loginUrl } from '../utils/routeConstants'
import { AUTH_REDIRECT } from '../utils/constants'

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  let isLoggedIn = false
  try {
    isLoggedIn = !!getJWT()
  } catch (_) {
    // Save the url of the current page before redirecting the user to log in.
    // Allows us to bring the user back to the page he/she was trying to access after logging in.
    window.localStorage.setItem(AUTH_REDIRECT, location.pathname)
  }

  if (!isLoggedIn) {
    return <Navigate to={loginUrl} replace={true} />
  }
  return children
}

export default PrivateRoute
