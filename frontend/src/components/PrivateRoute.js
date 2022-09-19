import { Navigate, useLocation } from 'react-router-dom'
import { isUserLoggedIn } from '../api/userService'
import { loginUrl } from '../utils/routeConstants'
import { AUTH_REDIRECT } from '../utils/constants'

const PrivateRoute = ({ children }) => {
  const location = useLocation()

  if (!isUserLoggedIn()) {
    // Save the url of the current page before redirecting the user to log in.
    // Allows us to bring the user back to the page he/she was trying to access after logging in.
    window.localStorage.setItem(AUTH_REDIRECT, location.pathname)
    return <Navigate to={loginUrl} replace={true} />
  }

  return children
}

export default PrivateRoute
