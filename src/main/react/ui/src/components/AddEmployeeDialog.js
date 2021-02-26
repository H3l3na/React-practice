import React ,{useState, useEffect}from 'react'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import '../styles/EditDialog.css';
import ErrorMessage from './ErrorMessage';
import Label from '@material-ui/core/FormLabel';

export default function AddEmployeeDialog({addDialogHandleClose, open, addDialogHandleSaveAndClose, refreshList}) {

  const [user, setUser]=useState({})
  const [showErrorMessage, setShowErrorMessage]=useState(false)

  const handleChange=(event)=>{
    setUser({...user, [event.target.name]:event.target.value})
  }

  const handleClose = () => {
    setShowErrorMessage(false);
  }
 

  const handleSubmit=()=>{
     //backend request PUT
     axios.post('http://localhost:8080/app/employees', user)
     .then(res => {
       refreshList();
       console.log(res); 
       console.log(res.data);
     }).catch(error => {
      console.log(error)
      setShowErrorMessage(true)
    });
     addDialogHandleSaveAndClose(user, showErrorMessage)
  }

  
  return (
    <Dialog onClose={addDialogHandleClose} open={open}>
      <DialogTitle id="simple-dialog-title">Add new employee</DialogTitle>
      <DialogContent>
        <Label className="label">Name</Label>
        <TextField id="name" className="input"  name="name" variant="outlined"  onChange={handleChange}/>
        <Label className="label">Department ID</Label>
        <TextField id="departmentId" className="input"  name="departmentId" variant="outlined"  onChange={handleChange}/>
        <Label className="label">Employee category ID</Label>
        <TextField id="employeeCategoryId" className="input" name="employeeCategoryId" variant="outlined"  onChange={handleChange}/>
        <Label className="label">Age</Label>
        <TextField id="age" className="input"  name="age" variant="outlined"  onChange={handleChange}/>
        <Label className="label">Gender</Label>
        <TextField id="gender" className="input"  name="gender" variant="outlined"  onChange={handleChange}/>
        <Label className="label">Position</Label>
        <TextField id="position" className="input"  name="position" variant="outlined"  onChange={handleChange}/>
        <Label className="label">Details</Label>
        <TextField id="details" className="input"  name="details" variant="outlined"  onChange={handleChange}/>
       { <button onClick={handleSubmit} className="submit">Submit</button>}
       <ErrorMessage open={showErrorMessage} handleClose={handleClose}/>
      </DialogContent> 
      <DialogActions>
        <Button onClick={addDialogHandleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

