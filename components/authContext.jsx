import React, { useEffect, useState, createContext, useContext } from 'react';
import axios from 'axios';
import { Box, Spinner, Flex } from '@chakra-ui/react';

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

  if (init)
    return (
      <Box h='100vh' className='authLoader'>
        <Flex justify='center' align='center' h='100%'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='#f8f1f1'
            color='#19456b'
            size='xl'
          />
        </Flex>
      </Box>
    );

  return (
    <AuthContext.Provider value={value}>
      {!init && children}
    </AuthContext.Provider>
  );
}
