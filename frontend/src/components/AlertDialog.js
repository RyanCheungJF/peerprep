import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

const AlertDialog = ({
  isDialogOpen,
  handleCloseDialog,
  dialogTitle,
  dialogMsg,
  dialogButtonText
}) => {
  return (
    <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
      <DialogTitle dividers>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMsg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>{dialogButtonText}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AlertDialog
