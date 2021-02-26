import React ,{useState, useEffect}from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import ErrorMessage from './ErrorMessage';
import classes from '../styles/EditDialog.css';
import Label from '@material-ui/core/FormLabel';
import api from './Api';

export default function EditEmployeeDialog({editDialogHandleClose, open, selectedUser, editDialogHandleSaveAndClose, refreshList}) {

  const [user, setUser]=useState({})
  const [showErrorMessage, setShowErrorMessage]=useState(false)

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

  const handleClose = () => {
    setShowErrorMessage(false);
  }


 const handleSubmit = () => {
   api.update(selectedUser.id, user)
   .then(res => {
    refreshList();
    console.log(res); 
    console.log(res.data);
  }).catch(error => {
   console.log(error)
   setShowErrorMessage(true)
 });
  editDialogHandleSaveAndClose(user, showErrorMessage)
 }
 

  return (
    <Dialog onClose={editDialogHandleClose} open={open}>
      <DialogTitle id="simple-dialog-title">Edit employee info</DialogTitle>
      <DialogContent>
        <Label className="label">Name</Label>
        <TextField id="name" className="input" name="name" variant="outlined" placeholder={selectedUser.name}  onChange={handleChange}/>
        <Label className="label">Department ID</Label>
        <TextField id="departmentId" className="input" name="departmentId" variant="outlined" placeholder={selectedUser.departmentId}  onChange={handleChange}/>
        <Label className="label">Employee category ID</Label>
        <TextField id="employeeCategoryId" className="input" name="employeeCategoryId" placeholder={selectedUser.employeeCategoryId} variant="outlined"  onChange={handleChange}/>
        <Label className="label">Age</Label>
        <TextField id="age" className="input" name="age" variant="outlined" placeholder={selectedUser.age} onChange={handleChange}/>
        <Label className="label">Gender</Label>
        <TextField id="gender" className="input" name="gender" variant="outlined" placeholder={selectedUser.gender} onChange={handleChange}/>
        <Label className="label">Position</Label>
        <TextField id="position" className="input" name="position" variant="outlined" placeholder={selectedUser.position} onChange={handleChange}/>
        <Label className="label">Details</Label>
        <TextField id="details" className="input" name="details" variant="outlined" placeholder={selectedUser.details} onChange={handleChange}/>
       { <button onClick={handleSubmit} className="submit">Submit</button>}
       <ErrorMessage open={showErrorMessage} handleClose={handleClose}/>
       
      </DialogContent> 
      <DialogActions>
        <Button onClick={editDialogHandleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

