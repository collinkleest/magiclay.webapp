import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import { useState } from 'react'
import { useAuthContext } from '../providers/AuthContext'
import { createGroup } from '../api/GroupService'

export const CreateGroup = (): JSX.Element => {
  const authContext = useAuthContext()
  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = () => {
    if (groupName !== '' && authContext.authState.token) {
      createGroup(authContext.authState.token, groupName)
        .then(() => {})
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A betting group can be shared with friends to participate in
            combined parlays. Please choose a unique betting group name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleClick}>Create</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={() => setOpen(true)} variant="contained" fullWidth>
        Create Group
      </Button>
    </>
  )
}
