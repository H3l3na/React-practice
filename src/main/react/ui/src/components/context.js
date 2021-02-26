import React, {useState} from 'react';
import {username} from './Auth';

export const AuthContext = React.createContext ({
    isAuth: false,
    login: () => {},
    logout: () => {},
    username:"Guest",
    role: ""
});

const AuthContextProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('Guest');
    const [role, setRole]=useState('')
    const [filter, setFilter] = useState('')

    const loginHandler = (username, role)=> {
        setIsAuthenticated(true)
        setUsername(username)
        setRole(role)
    }

    const logoutHandler = () => {
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{login: loginHandler, isAuth:isAuthenticated, username:username, role:role, logout:logoutHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;