import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { homeUrl } from '../utils/routeConstants'
import ChangePasswordDialog from '../components/ChangePasswordDialog'
import DeleteAccountDialog from '../components/DeleteAccountDialog'

const ProfilePage = () => {
  // Change Password Dialog
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false)
  const handleChangePasswordCloseDialog = () => setChangePasswordDialogOpen(false)
  const handleChangePasswordOpenDialog = () => setChangePasswordDialogOpen(true)

  // Delete Account Dialog
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false)
  const handleDeleteAccountCloseDialog = () => setDeleteAccountDialogOpen(false)
  const handleDeleteAccountOpenDialog = () => setDeleteAccountDialogOpen(true)

  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '30%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Box sx={{ my: 3, mx: 2 }}>
        <Typography variant={'h3'}>
          Profile Page
        </Typography>
      </Box>

      <Box sx={{ my: 3, mx: 2 }}>
        <Divider>
          <Chip sx={{ p:2 }} style={{ fontSize: "1.1rem" }} label="Personal Information" color="primary" />
        </Divider>
        <Typography sx={{ mt:5 }} variant={'h6'}>
          Coming Soon!
        </Typography>
      </Box>

      <Box sx={{ my: 3, mx: 2 }}>
        <Divider>
          <Chip sx={{ p:2 }} style={{ fontSize: "1.1rem" }} label="Account Management" color="primary" />
        </Divider>
        <Stack direction="row" spacing={2} sx={{ mt:5 }}>
          <Chip
            icon={<EditIcon />}
            label="Change Password"
            color="info"
            variant="outlined"
            style={{ fontSize: "1rem" }}
            onClick={handleChangePasswordOpenDialog}
            />
          <Chip
            icon={<DeleteIcon />}
            label="Delete Account"
            color="error"
            variant="outlined"
            style={{ fontSize: "1rem" }}
            onClick={handleDeleteAccountOpenDialog}
          />
        </Stack>
      </Box>

      <ChangePasswordDialog
        isDialogOpen={changePasswordDialogOpen}
        handleCloseDialog={handleChangePasswordCloseDialog}
      />

      <DeleteAccountDialog
        isDialogOpen={deleteAccountDialogOpen}
        handleNo={handleDeleteAccountCloseDialog}
      />

      <Box sx={{ my: 3, mx: 2 }}>
        <Button
          sx={{ margin: '2px' }}
          variant={'outlined'}
          onClick={() => navigate(homeUrl)}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  )
}

export default ProfilePage
