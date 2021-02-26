import React, { useState, useEffect } from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default function EditUserDialog({ handleClose, open, selectedUser, handleSaveAndClose }) {

  const [user, setUser] = useState({})

  useEffect(() => {
    const newUser = {
      id: selectedUser.id,
      name: selectedUser.name,
    }
    setUser(newUser)
  }, [selectedUser])

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const handleSubmit = () => {
    //backend request PUT
    handleSaveAndClose(user)
  }


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">User info</DialogTitle>
      <DialogContent>
        <TextField id="name" label="Name" name="name" variant="outlined" value={user.name} onChange={handleChange} />
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

