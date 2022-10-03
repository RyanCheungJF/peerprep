import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { collabSocket } from '../utils/socket'

const CodeEditor = ({ room }) => {
  const [code, setCode] = useState('')

  collabSocket.on('pull-code', (code) => {
    setCode(code)
  })

  useEffect(() => {
    console.log(code)
  }, [code])

  // TODO: look into throttling this.
  const handleCodeChange = (event) => {
    const newCode = event.target.value
    setCode(newCode)
    collabSocket.emit('push-code', newCode, room)
  }

  return (
    <TextField
      label="Code"
      multiline
      minRows={30}
      maxRows={30}
      value={code}
      onChange={handleCodeChange}
      sx={{
        width: '70%',
        height: '100%',
      }}
    />
  )
}

export default CodeEditor
