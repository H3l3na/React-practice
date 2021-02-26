import React ,{useState, useEffect}from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import '../styles/EditDialog.css';
import Label from '@material-ui/core/FormLabel';

export default function EditUserDialog({handleClose, open, selectedUser, handleSaveAndClose}) {

  const [user, setUser]=useState({})

  useEffect(()=>{
    const newUser = {
      id:selectedUser.id,
      name:selectedUser.name,
      age:selectedUser.age,
      gender:selectedUser.gender,
      position:selectedUser.position,
      details:selectedUser.details
    }
    setUser(newUser)
  },[selectedUser])

  const handleChange=(event)=>{
    setUser({...user, [event.target.name]:event.target.value})
  }

  const handleSubmit=()=>{
     //backend request PUT
     handleSaveAndClose(user)
  }

  
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">Employee info</DialogTitle>
      <DialogContent>
        <Label className="label">Name</Label>
        <TextField id="name" className="input" name="name" variant="outlined" value={user.name} onChange={handleChange}/>
        <Label className="label">Age</Label>
        <TextField id="age" className="input" name="age" variant="outlined" value={user.age} onChange={handleChange}/>
        <Label className="label">Gender</Label>
        <TextField id="gender" className="input" name="gender" variant="outlined" value={user.gender} onChange={handleChange}/>
        <Label className="label">Position</Label>
        <TextField id="position" className="input" name="position" variant="outlined" value={user.position} onChange={handleChange}/>
        <Label className="label">Details</Label>
        <TextField id="details" className="input" name="details" variant="outlined" value={user.details} onChange={handleChange}/>
      </DialogContent> 
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

