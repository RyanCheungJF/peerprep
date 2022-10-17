import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'

const TransitionAlert = ({
  alertOpen,
  setAlertOpen,
  severity, // values for the respective alert design: error, warning, info, success
  alertMsg,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={alertOpen}>
        <Alert
          variant="filled"
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false)
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alertMsg}
        </Alert>
      </Collapse>
    </Box>
  )
}

export default TransitionAlert
