import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import Chat from '../components/Chat'
import { Button } from '@mui/material'
import { socket } from '../utils/socket'
import { deleteRoomSvc } from '../api/roomservice'

const RenderPage = () => {
  const location = useLocation()

  const [question, setQuestion] = useState({})

  useEffect(() => {
    getQuestion()
  }, [])

  const getQuestion = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8100/api/question?difficulty=easy'
      )
      setQuestion(res.data)
    } catch (err) {
      console.log('ERROR', err)
    }
  }

  const navigate = useNavigate()

  const leaveRoom = async () => {
    try {
      console.log('deleteing room with id: ' + location.state.room)
      const res = await deleteRoomSvc(location.state.room)
      socket.emit('leave-room', location.state.room, 'partner left')
      console.log(JSON.stringify(res.data))
    } catch (err) {
      console.log(err)
    }
    navigate('/home')
  }

  useEffect(() => {
    socket.on('partner-left', (data) => {
      console.log('data received from socket', data)
      if (data === 'partner left') {
        navigate('/home')
      }
    })
  }, [navigate])

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: question['title'] }}></p>
      <br />
      <p dangerouslySetInnerHTML={{ __html: question['description'] }}></p>
      <br />
      <p>Example 1</p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_1_input'] }}></p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_1_output'] }}></p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_1_explanation'] }}></p>
      <p>Example 2</p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_2_input'] }}></p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_2_output'] }}></p>
      <p dangerouslySetInnerHTML={{ __html: question['ex_2_explanation'] }}></p>
      <Chat room={location.state.room} />
      <Button variant={'outlined'} onClick={() => leaveRoom()}>
        Leave Room
      </Button>
    </>
  )
}

export default RenderPage
