import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'

const PartnerOfflineDialog = ({ isDialogOpen, leaveRoom }) => (
  <Dialog fullWidth={true} maxWidth="sm" open={isDialogOpen}>
    <DialogContent dividers>
      <DialogContentText>
        Your partner has disconnected. Waiting for him/her to reconnect...
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={leaveRoom}>Leave Room Instead</Button>
    </DialogActions>
  </Dialog>
)

export default PartnerOfflineDialog
