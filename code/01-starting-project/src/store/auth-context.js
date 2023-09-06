import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogin: (email, password) => { }
});

const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };

    useEffect(() => {
        const storedUserInfo = localStorage.getItem("isLoggedIn");

        if (storedUserInfo === "1") {
            setIsLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };


    return <AuthContextProvider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>{props.children}</AuthContextProvider>
}

export default AuthContext;