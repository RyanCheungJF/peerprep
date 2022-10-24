import { useState } from 'react'
import Editor from 'react-simple-code-editor'
import { Box, Paper } from '@mui/material'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'
import { collabSocket } from '../utils/socket'
import { getCollabRoomId } from '../utils/main'

const CodeEditor = ({ room }) => {
  const [code, setCode] = useState('')

  collabSocket.on('pull-code', (code) => {
    setCode(code)
  })
  collabSocket.on('restore-code', (code) => {
    setCode(code)
  })

  // TODO: look into throttling this.
  const handleCodeChange = (newCode) => {
    setCode(newCode)
    collabSocket.emit('push-code', newCode, getCollabRoomId(room))
  }

  return (
    <Paper sx={{ height: '100%', width: '100%' }} elevation={5}>
      <Box className="code-editor-wrapper">
        <p className="code-editor-title">Code Editor</p>
        <Editor
          value={code}
          onValueChange={handleCodeChange}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            width: '100%',
            height: '100%',
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: '1.1rem',
            backgroundColor: '#F5F5F5',
            border: '1px solid rgba(0, 0, 0, 0.15)',
          }}
        />
      </Box>
    </Paper>
  )
}

export default CodeEditor
