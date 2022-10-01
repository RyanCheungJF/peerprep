import { io } from 'socket.io-client'
import { useState, useEffect, useRef } from 'react'
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

//const socket = io('http://localhost:8001')

//socket.on('connect', () => {})

const Chat = () => {
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [chatMessages, setChatMessages] = useState(['hi', 'bye'])

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
    setChatMessages([...chatMessages, message])
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
                <List sx={{ height: '20rem' }}>{displayChatMessages()}</List>
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
