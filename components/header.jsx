import React from 'react';
import RouterLink from 'next/link';
import Router from 'next/router';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import axios from 'axios';

import { useAuth } from './authContext';

export default function Header() {
  const { auth, changeState } = useAuth();

  const authLinks = () => {
    return (
      <>
        <RouterLink href="/register">
          <Button
            ml="0.5rem"
            fontWeight="700"
            bg="#b5eaea"
            color="#11698e"
            _hover={{ background: '#abe8e8', color: '#11698e' }}
            _focus={{ outline: 'none' }}>
            Register
          </Button>
        </RouterLink>
        <RouterLink href="/login">
          <Button
            ml="0.5rem"
            fontWeight="700"
            bg="#b5eaea"
            color="#11698e"
            _hover={{ background: '#abe8e8', color: '#11698e' }}
            _focus={{ outline: 'none' }}>
            Login
          </Button>
        </RouterLink>
      </>
    );
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    changeState(false, false, {});
    Router.replace('/');
  };

  const userLinks = () => {
    return (
      <>
        <RouterLink href="/dashboard">
          <Button
            ml="0.5rem"
            fontWeight="700"
            bg="#b5eaea"
            color="#11698e"
            _hover={{ background: '#abe8e8', color: '#11698e' }}
            _focus={{ outline: 'none' }}>
            Dashboard
          </Button>
        </RouterLink>
        <Button
          ml="0.5rem"
          fontWeight="700"
          bg="#b5eaea"
          color="#11698e"
          _hover={{ background: '#abe8e8', color: '#11698e' }}
          _focus={{ outline: 'none' }}
          onClick={logout}>
          Logout
        </Button>
      </>
    );
  };

  const renderHeader = () => {
    return (
      <Flex justifyContent="space-between">
        <Box>
          <RouterLink href="/">
            <Box
              fontSize="1.5rem"
              cursor="pointer"
              fontWeight="800"
              color="#4087a4"
              display="inline">
              <Text display="inline" color="#76c2c0">
                Dev
              </Text>
              Connect
            </Box>
          </RouterLink>
        </Box>
        <Box className="router" color="#eee">
          <RouterLink href="/devs">
            <Button
              ml="0.5rem"
              fontWeight="700"
              bg="#b5eaea"
              color="#11698e"
              _hover={{ background: '#abe8e8', color: '#11698e' }}
              _focus={{ outline: 'none' }}>
              Devs
            </Button>
          </RouterLink>
          {auth ? userLinks() : authLinks()}
        </Box>
      </Flex>
    );
  };

  return (
    <Flex alignItems="center">
      <Box w="100%" p="1rem">
        {renderHeader()}
      </Box>
    </Flex>
  );
}
