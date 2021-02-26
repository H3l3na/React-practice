import React, {useState, useContext} from 'react';
import {UserContext} from './UserContext';

import styles from '../styles/Login.css';
 
 
function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn]=useState(false)

    const {value, setValue}=useContext(UserContext);
    const userContext=useContext(UserContext);

    const loginHandler = () => {
       userContext.login();
       setValue(username);
    };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Login Page</h1>
        <form>
          <div className={styles.loginForm}>
            <div className={styles.loginFormItem}>
              <label >Username</label>
              <input type='text' id='username' nChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className={styles.loginFormItem}>
              <label>Password</label>
              <input type='password' id='password' nChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <button onClick={loginHandler}>login</button>
        </form>
      </div>
    </div>
  );
}
 
export default Login;