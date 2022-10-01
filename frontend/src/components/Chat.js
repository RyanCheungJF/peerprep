import '../css/Chat.css'
import { io } from 'socket.io-client'
import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'

const socket = io('http://localhost:8001')
var id ='NULL'

socket.on('connect', () => {
  // setId(socket.id)
  id = socket.id
})

function Chat() {
  // const [id, setId] = useState('NULL')
  const [msg, setMsg] = useState('')
  // socket.on('connect', () => {
  //   setId(socket.id)
  // })
  const displayMessage = (message) => {
    const newMsg = id + ': ' + message + '\n'
    setMsg(msg + newMsg)
    document.getElementById('message').value = ''
    socket.emit('room1', newMsg)
  }

  useEffect(() => {
    socket.on('room1', (message) => {
      console.log('message: ' + message)
      const newMsg = msg + message
      setMsg(newMsg)
    })
  }, [socket, msg])

  return (
    <div id="container">
      <p id="header" style={{ color: 'Blue' }}>
        your Id is: {id}
      </p>
      <textarea id="chatBox" type="text" value={msg} readOnly disabled />

      <input id="message" type="text" />
      <Button
        id="sendBtn"
        onClick={() => {
          console.log('F K THIS SHYT')
          displayMessage(document.getElementById('message').value)
        }}
        variant={'outlined'}
      >
        Send
      </Button>
    </div>
  )
}

export default Chat
