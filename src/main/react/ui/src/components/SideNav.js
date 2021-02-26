import { Link } from "react-router-dom";
import '../styles/SideNav.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { AuthContext } from './context';
import React, { useState, useContext } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * ': {
      marginLeft: theme.spacing(0),
      textDecoration: 'none',
      color: 'white',
      fontWeight: "bold",
      focusVisible: true,
      mt: '10rem'
    },
  },
}));

export default function SideNav ({isLogged}) {

    const classes = useStyles();

    const authContext = useContext(AuthContext);
  
    const logoutHandler = () => {
      isLogged = false;
      authContext.logout();
    };

    return (
        <div className="sidenav">
          <Typography className={classes.root}>
              <Link className="header" to="/">Home</Link>
              <Link className="header" to="/about">About</Link>
              <Link className="header" to="/employees">Employees</Link>
              <Link className="header" to="/departments">Departments</Link>
              <Link className="header" to="/categories">Categories</Link>
              <Link className="header" to="/reports">Reports</Link>
              <button className="btn" onClick={logoutHandler}>Logout</button>
          </Typography>
        </div>
      );
}