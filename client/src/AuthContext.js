import React, { useState, createContext } from "react";

const { Provider, Consumer } = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const defaultState = {
        user,
        setLoggedUser: (user) => setUser(user),
        logout: () => setUser(null)
    };
    return (
        <Provider
            value={defaultState}>
            { children }
        </Provider>)
};

export { AuthProvider as AuthContextProvider, Consumer as AuthContextConsumer };