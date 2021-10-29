import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import decode from 'jwt-decode';

export const AuthContext = createContext({
  auth: false,
  init: true,
  userInfo: {},
  changeState: null,
});

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    console.log('No Auth');
  }

  return auth;
}

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [auth, setAuth] = useState(false);
  const [init, setInit] = useState(true);

  useEffect(async () => {
    const { data } = await axios.get('/api/auth/status');
    if (data.payload) {
      setUserInfo(data.payload);
      setAuth(true);
    }

    setInit(false);
  }, []);

  const changeState = (authStatus, initStatus, userStatus) => {
    setAuth(authStatus);
    setInit(initStatus);
    setUserInfo(userStatus);
  };

  const value = {
    auth,
    init,
    userInfo,
    changeState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
