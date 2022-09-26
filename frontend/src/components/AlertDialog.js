import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const AlertDialog = ({
  dialogOpen,
  handleCloseDialog,
  dialogTitle,
  dialogMsg,
  dialogButtonText,
}) => {
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{dialogMsg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>{dialogButtonText}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
