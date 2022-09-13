import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import NavBar from './components/NavBar'
import {
  baseUrl,
  signupUrl,
  loginUrl,
  homeUrl,
  profileUrl,
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
          <Route path={homeUrl} element={<HomePage />} />
          <Route path={profileUrl} element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
