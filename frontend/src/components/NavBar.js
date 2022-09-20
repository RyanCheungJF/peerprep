import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { logoutUser, isUserLoggedIn } from '../api/userService'
import { loginUrl, profileUrl } from '../utils/routeConstants'

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    handleClose();
    navigate(profileUrl)
  }

  const handleLogout = async () => {
    try {
      await logoutUser()
      handleClose()
      navigate(loginUrl, { replace: true })
    } catch (err) {
      console.error(`Failed to log user out: ${err}`)
    }
  }

  const _renderAccountIcon = () => {
    if (!isUserLoggedIn()) {
      return null
    }

    return (
      <>
        <IconButton size="large" onClick={handleMenu} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={!!anchorEl}
          onClose={handleClose}
        >
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>
      </>
    )
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PeerPrep
        </Typography>
        {_renderAccountIcon()}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
