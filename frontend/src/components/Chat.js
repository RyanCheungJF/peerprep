import { useState, useEffect, useRef } from 'react'
import { socket } from '../utils/socket'
import {
  Box,
  Button,
  Container,
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

const Chat = () => {
  socket.on('receive-message', (msg) => {
    setChatMessages([...chatMessages, msg])
  })

  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState(['hi', 'bye'])

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
      socket.emit('send-message', message, '')
    }
  }

  return (
    <div>
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            <Typography variant="h4" gutterBottom>
              Happy chatting!
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid xs={12} item>
                <List sx={{ height: '20rem', overflow: 'auto' }}>
                  {displayChatMessages()}
                  <ListItem ref={scrollPositionRef}></ListItem>
                </List>
              </Grid>
              <Grid xs={9} item>
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
              <Grid xs={1} item>
                <IconButton
                  onClick={sendMessage}
                  aria-label="send"
                  color="primary"
                >
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  )
}

export default Chat
