import { Box, Chip, Divider } from '@mui/material'
import FindMatch from '../components/FindMatch'
import { findRoomService, deleteRoomService } from '../api/roomservice'
import { UserContext } from '../contexts/UserContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collabUrl } from '../utils/routeConstants'
import moment from 'moment'

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
            const now = moment()
            const expiration = moment(res.data.datetime)

            // get the difference between the moments of the two dates in minutes
            const diff = now.diff(expiration, 'minutes')

            if (diff <= 30) {
              navigate(collabUrl, {
                state: {
                  room: res.data.room_id,
                  difficulty: res.data.difficulty,
                  qnsid: res.data.qnsid,
                },
              })
            } else {
              await deleteRoomService(res.data.room_id)
            }
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box sx={{ my: 3, mx: 2 }}>
        <p className="home-header">Welcome back, {user.username}!</p>
      </Box>
      <Box sx={{ my: 3, mx: 2 }}>
        <Divider>
          <Chip
            sx={{ p: 2, fontSize: '1.1rem' }}
            label="Find Match"
            color="primary"
          />
        </Divider>
        <FindMatch />
      </Box>
    </Box>
  )
}

export default HomePage
