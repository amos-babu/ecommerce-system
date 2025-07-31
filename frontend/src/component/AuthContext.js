import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

//custom hook for the provider
export const useAuth = () => useContext(AuthContext);

//provider
export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(true);

    const login = () => setLoggedIn(false);
    const logout = () => setLoggedIn(true);

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
