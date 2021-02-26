import React, { useContext, useState } from 'react';
import { Card } from '@material-ui/core';
import { AuthContext } from './context';
import '../styles/Auth.css';

const Auth = props => {
    const [username, setUsername] = useState('Guest')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setIsLoggedIn]=useState(false)
    const [role, setRole]=useState('user')

    const authContext = useContext(AuthContext);

    const loginHandler = (username, role) => (event)=>{
        event.preventDefault();
        authContext.login(username, role);
    };

    return (
        <div className="auth">
            <Card raised={true}>
                <h2>You are not authenticated!</h2>
                <p>Please log in to continue.</p>
                <div >
                    <label className="label">Username</label>
                    <input className="input" type='text' id='username' onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div >
                    <label className="label">Password</label>
                    <input className="input" type='password' id='password' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div >
                    <label className="label">Role</label>
                    <input className="input" type='role' id='role' placeholder="i.e. 'Admin' or 'User'" onChange={(e) => setRole(e.target.value)} />
                </div>
                <button className="login" onClick={loginHandler(username, role)}>Login</button>
                <div>
                    <button className="guest-login" onClick={loginHandler(username, '')}>Continue as guest</button>
                </div>
            </Card>
        </div>
    );
};

export default Auth;