import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import CollaborationPage from './pages/CollaborationPage'
import NavBar from './components/NavBar'
import PrivateRoute from './components/PrivateRoute'
import {
  baseUrl,
  signupUrl,
  loginUrl,
  homeUrl,
  profileUrl,
  collabUrl,
} from './utils/routeConstants'

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path={baseUrl} element={<LandingPage />} />
          <Route path={signupUrl} element={<SignupPage />} />
          <Route path={loginUrl} element={<LoginPage />} />
          <Route
            exact
            path={collabUrl}
            element={
              <PrivateRoute>
                <CollaborationPage />
              </PrivateRoute>
            }
          />
          <Route
            path={homeUrl}
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path={profileUrl}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App