import {createContext, useState} from 'react';

export const UserContext = createContext({
    isLoggedIn: false,
    login: () => {},
});

const UserContextProvider = props => {
    const [isLoggedIn,  setIsLoggedIn] = useState(false);

    const loginHandler = () => {
        setIsLoggedIn(true)
    }

    return (
        <UserContext.Provider value={{login: loginHandler, isLoggedIn:isLoggedIn}}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;