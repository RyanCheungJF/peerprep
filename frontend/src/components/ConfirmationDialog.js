import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'

const ConfirmationDialog = ({
  dialogOpen,
  handleDismiss,
  handleConfirmation,
  dialogTitle,
  dialogMsg,
  dialogDismissButtonText,
  dialogConfirmationButtonText,
}) => {
  return (
    <Dialog open={dialogOpen}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{dialogMsg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDismiss}>{dialogDismissButtonText}</Button>
        <Button onClick={handleConfirmation}>
          {dialogConfirmationButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
