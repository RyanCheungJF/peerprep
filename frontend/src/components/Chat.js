import { useContext, useEffect, useRef, useState } from 'react'
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { UserContext } from '../contexts/UserContext'
import { collabSocket } from '../utils/socket'
import { getCollabRoomId } from '../utils/main'

const Chat = ({ room }) => {
  collabSocket.on('receive-message', (msg) => {
    setChatMessages([...chatMessages, msg])
  })
  collabSocket.on('restore-chat', (chat) => {
    setChatMessages(chat.map((msg) => msg.content))
  })

  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])

  const user = useContext(UserContext)

  const scrollPositionRef = useRef(null)

  useEffect(() => {
    if (scrollPositionRef.current) {
      scrollPositionRef.current.scrollIntoView({ behaviour: 'smooth' })
    }
  }, [chatMessages])

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const handleEnterKeyDown = (event) => {
    const ENTER_KEY_CODE = 13
    if (event.keyCode === ENTER_KEY_CODE) {
      sendMessage()
    }
  }

  const displayChatMessages = () => {
    return chatMessages.map((msg, i) => (
      <ListItem key={i}>
        <ListItemText primary={msg} />
      </ListItem>
    ))
  }

  const sendMessage = () => {
    if (message) {
      const messageWithUsername = user.username + ': ' + message
      setChatMessages([...chatMessages, messageWithUsername])
      setMessage('')
      collabSocket.emit(
        'send-message',
        messageWithUsername,
        getCollabRoomId(room),
        user._id
      )
    }
  }

  return (
    <Paper sx={{ height: '100%', width: '100%' }} elevation={5}>
      <Box className="chat-container">
        <Box className="chat-title-container">
          <p className="chat-title">Chat</p>
          <Divider />
        </Box>
        <Box className="chat-messages-container">
          <List sx={{ position: 'absolute', padding: '5px' }}>
            {displayChatMessages()}
            <ListItem ref={scrollPositionRef}></ListItem>
          </List>
        </Box>
        <Box className="chat-message-and-send-button-container">
          <Divider />
          <Box className="chat-message-and-send-button">
            <FormControl fullWidth>
              <TextField
                label="Type your message..."
                variant="outlined"
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleEnterKeyDown}
              />
            </FormControl>
            <IconButton aria-label="send" color="primary" onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default Chat
