import React, { useState, createContext } from 'react';
import { isLoggedIn, getAccessToken, getRefreshToken } from '../utils/index';

const initialState = {
  authState: {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    loggedIn: isLoggedIn(),
  },
  authActions: {
    setLoggedIn: (loggedIn: boolean) => {},
    setAccessToken: (accessToken: string) => {},
    setRefreshToken: (refreshToken: string) => {},
  },
};

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [state, setState] = useState(initialState.authState);

  function setLoggedIn(loggedIn: boolean) {
    setState({ ...state, loggedIn });
  }

  function setAccessToken(accessToken: string) {
    setState({ ...state, accessToken });
    if (accessToken)
      return localStorage.setItem('authAccessToken', accessToken);
    localStorage.removeItem('authAccessToken');
  }

  function setRefreshToken(refreshToken: string) {
    setState({ ...state, refreshToken });
    if (refreshToken)
      return localStorage.setItem('authRefreshToken', refreshToken);
    localStorage.removeItem('authRefreshToken');
  }

  const actions = {
    setLoggedIn,
    setAccessToken,
    setRefreshToken,
  };

  return (
    <AuthContext.Provider value={{ authState: state, authActions: actions }}>
      {children}
    </AuthContext.Provider>
  );
};
