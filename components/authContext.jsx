import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';
import axios from 'axios';
import decode from 'jwt-decode';
import { Box, Spinner, Flex } from '@chakra-ui/react';

export const AuthContext = createContext({
  auth: false,
  init: true,
  userInfo: {},
  changeState: null,
});

export const useAuth = () => useContext(AuthContext);

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

  async function login(body) {
    const { data } = await axios.post('/api/auth/login', body);
    const info = decode(data.token);
    setAuth(true);
    setUserInfo(info);
  }

  async function logout() {
    await axios.post('/api/auth/logout');
    setAuth(false);
    setUserInfo({});
  }

  const value = useMemo(
    () => ({
      auth,
      init,
      userInfo,
      logout,
      login,
    }),
    [userInfo],
  );

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
