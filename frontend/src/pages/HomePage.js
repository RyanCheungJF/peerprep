import { Box, Chip, Divider } from '@mui/material'
import FindMatch from '../components/FindMatch'
import { findRoomService, deleteRoomService } from '../api/roomservice'
import { UserContext } from '../contexts/UserContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collabUrl } from '../utils/routeConstants'
import { expirationCheck } from '../utils/main'

const HomePage = () => {
  const navigate = useNavigate()

  const user = useContext(UserContext)

  useEffect(() => {
    const findExistingRoom = () => {
      const filters = [{ id1: user.username }, { id2: user.username }]

      filters.forEach(async (filter) => {
        try {
          const res = await findRoomService(filter)
          if (res.data && JSON.stringify(res.data) !== '{}') {
            expirationCheck(
              res.data.datetime,
              async () => {
                await deleteRoomService(res.data.room_id)
              },
              async () =>
                navigate(collabUrl, {
                  state: {
                    room: res.data.room_id,
                    difficulty: res.data.difficulty,
                    qnsid: res.data.qnsid,
                  },
                })
            )
          }
        } catch (err) {
          console.log(err)
        }
      })
    }
    findExistingRoom()
  }, [navigate, user.username])

  return (
    <Box
      className="home-page-container"
      sx={{
        // content height = 100vh - nav bar height
        height: 'calc(100vh - 64px)',
      }}
    >
      <Box className="home-page-container-wrapper">
        <Box className="p-6">
          <p className="home-page-header">Welcome back, {user.username}!</p>
        </Box>
        <Box className="p-6">
          <Divider>
            <Chip
              className="font-inter"
              sx={{ p: 2, fontSize: '1.1rem' }}
              label="Select Difficulty & Find Match"
              color="primary"
            />
          </Divider>
          <FindMatch />
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
