import React, {useEffect, useState} from 'react';
import '../styles/employees.css';
import AddEmployeeDialog from './AddEmployeeDialog';
import AddIcon from "@material-ui/icons/Add";
import CardMedia from '@material-ui/core/CardMedia';
import {Card} from "@material-ui/core";
import cat from '../images/cat.jpg';
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {CardContent, Typography, CardActions, CardActionArea} from '@material-ui/core';
import '../styles/ThumbnailView.css';
import AuthContextProvider, {AuthContext} from './context';
import { useContext } from 'react';
import CategorySelect from './CategorySelect';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
});

export default function ThumbnailView({employees, refreshList}) {

  const [isAddDialogOpen, setIsAddDialogOpen]=useState(false);

  const classes = useStyles();

  const authContext=useContext(AuthContext);

  const role = authContext.role;

  const addEmployee = () => (event) => {
    setIsAddDialogOpen(true)
  }

  const addDialogHandleClose = () => {
    setIsAddDialogOpen(false)
  }

  const addDialogHandleSaveAndClose = (user) => {

    setIsAddDialogOpen(false)
  }

  return (
    <div>
      {role==='Admin' || role==='admin'?<button className="btn-add" onClick={addEmployee()}>Add employee</button>:null}
    <div className="imageGridContainer">
    {employees.map((employee, index) => (
    <Card className={classes.root} key={employee.id} className="imageGridItem" raised={true}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Profile pic"
          height="90"
          width="90"
          image={cat}
          title="Profile pic"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {employee.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Details
        </Button>
      </CardActions>
    </Card>
    ))}
        </div>
        {<AddEmployeeDialog open={isAddDialogOpen} addDialogHandleClose={addDialogHandleClose} /*selectedUser={selectedUser} */ addDialogHandleSaveAndClose={addDialogHandleSaveAndClose} refreshList={refreshList} />}
    </div>
  );
}