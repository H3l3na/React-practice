import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './components/mainRouter';
import Header from './components/header';
import AuthContextProvider, { AuthContext } from './components/context';
import Auth from './components/Auth';
import { useContext, useState } from 'react';
import SideNav from './components/SideNav';

const App = () => {
  const authContext = useContext(AuthContext);
  
  return (
    authContext.isAuth ?
      <BrowserRouter>
        <Header />
        <SideNav />
        <MainRouter />
      </BrowserRouter>
      :
      <Auth />
  )
}

export default App;

