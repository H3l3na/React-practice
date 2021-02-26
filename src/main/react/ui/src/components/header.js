import { Link } from "react-router-dom";
import '../styles/header.css';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from "@material-ui/core";
import { AuthContext } from './context';
import React, { useState, useContext } from 'react';
import cat from '../images/cat1.jpg';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * ': {
      marginLeft: theme.spacing(6),
      textDecoration: 'none',
      color: 'white',
      fontWeight: "bold",
      focusVisible: true,
      mt: '10rem'
    },
  },
}));

export default function Header({ isLogged }) {

  const classes = useStyles();

  const authContext = useContext(AuthContext);

  const logoutHandler = () => {
    isLogged = false;
    authContext.logout();
  };

  return (
    <div className="headerContainer">
      <ol>
        {authContext.role!==''?<li><img className="img-profile" src={cat} height="50" width="50"></img></li> : null}
        {authContext.role !== '' ?<li><p>{authContext.role}</p></li> : null}
        {authContext.role!==''?<li><p>{authContext.username},</p></li> : <li><p>{authContext.username}</p></li>}
      </ol>
    </div>
  );
}

