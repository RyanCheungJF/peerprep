import { useState, useEffect, useRef, useContext } from 'react'
import {
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { collabSocket } from '../utils/socket'
import { getCollabRoomId } from '../utils/main'
import { UserContext } from '../contexts/UserContext'

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
      setChatMessages([...chatMessages, message])
      setMessage('')
      collabSocket.emit(
        'send-message',
        message,
        getCollabRoomId(room),
        user._id
      )
    }
  }

  return (
    <Paper sx={{ height: '100%', width: '100%' }} elevation={5}>
      <Box className="coding-chat-div">
        <p className="coding-chat-title">Chat</p>
        <Divider />
        <Grid container spacing={4} alignItems="center">
          <Grid xs={12} item>
            <List sx={{ maxHeight: '15rem', overflow: 'auto' }}>
              {displayChatMessages()}
              <ListItem ref={scrollPositionRef}></ListItem>
            </List>
          </Grid>
          <Grid xs={11} item sx={{ position: 'static', pb: 1 }}>
            <FormControl fullWidth>
              <TextField
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleEnterKeyDown}
                label="Type your message..."
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid xs={1} item sx={{ paddingLeft: '12px' }}>
            <IconButton onClick={sendMessage} aria-label="send" color="primary">
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default Chat
