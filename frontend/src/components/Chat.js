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
import { UserContext } from '../contexts/UserContext'

const Chat = ({ room }) => {
  collabSocket.on('receive-message', (msg) => {
    setChatMessages([...chatMessages, msg])
  })

  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState(['hi', 'bye'])
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
      collabSocket.emit('send-message', message, room, user._id)
    }
  }

  return (
    <Paper elevation={5}>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Chat
        </Typography>
        <Divider />
        <Grid container spacing={4} alignItems="center">
          <Grid xs={12} item>
            <List sx={{ maxHeight: '10rem', overflow: 'auto' }}>
              {displayChatMessages()}
              <ListItem ref={scrollPositionRef}></ListItem>
            </List>
          </Grid>
          <Grid xs={11} item>
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
