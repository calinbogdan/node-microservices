import React, { useState, createContext } from "react";

const { Provider, Consumer } = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  return (
    <Provider
        value={{
            state: user,
            login: (user) => setUser(user),
            logout: () => setUser(null)
        }}>
        { children }
    </Provider>)
};

export { AuthProvider as AuthContextProvider, Consumer as AuthContextConsumer };