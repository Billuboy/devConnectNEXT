import React, { useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Button,
  Checkbox,
  Text,
  Flex,
} from '@chakra-ui/react';
import Router from 'next/router';
import Head from 'next/head';
import axios from 'axios';
import decode from 'jwt-decode';

import InputField from '../components/templates/inputField';
import PasswordField from '../components/templates/passwordField';
import { useAuth } from '../components/authContext';

export default function Login() {
  const [fields, setFields] = useState({
    email: '',
    password: '',
    remMe: false,
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { changeState } = useAuth();

  const onFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/api/auth/login', fields);
      const info = decode(data.token);
      changeState(true, false, info);

      Router.push('/dashboard');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const renderForm = () => {
    return (
      <Flex align="center" direction="column" bg="#e7fbff">
        <Box mt="1.5rem" textAlign="center">
          <Heading size="xl">Login</Heading>
        </Box>
        <Text fontSize="xl" my="1rem" fontWeight="600">
          Login in to access dashboard
        </Text>
        <Box w="90%">
          <form onSubmit={onFormSubmit}>
            <InputField
              label="Email"
              m="1.5rem"
              mb="0.75rem"
              fontSize="1.3rem"
              placeholder="Enter Registered Email"
              type="email"
              isRequired={true}
              onChange={e => setFields({ ...fields, email: e.target.value })}
              value={fields.email}
              error={errors?.email}
            />
            <PasswordField
              label="Password"
              show={show}
              isRequired={true}
              value={fields.password}
              onChange={e => setFields({ ...fields, password: e.target.value })}
              onClick={e => setShow(!show)}
              error={errors?.password}
            />
            <Checkbox
              mx="1.3rem"
              borderColor="#007a5b"
              onChange={e => {
                setFields({
                  ...fields,
                  remMe: !fields.remMe,
                });
              }}
              defaultIsChecked={fields.remMe}>
              <Text fontSize="1.1rem" fontWeight="500" color="#007a5b">
                Remember Me
              </Text>
            </Checkbox>

            <Button
              type="submit"
              bg="#16c79a"
              display="block"
              mx="auto"
              w="80%"
              my="2rem"
              isLoading={loading}
              loadingText="Loading..."
              spinnerPlacement="middle"
              _focus={{ outline: 'none' }}
              _hover={{ background: '#13b38a' }}>
              Login
            </Button>
          </form>
        </Box>
      </Flex>
    );
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box h="calc(100vh - 130px)">
        <Grid h="100%" placeItems="center">
          <Box w="30%" border="solid 1px #eee" borderRadius="5px">
            {renderForm()}
          </Box>
        </Grid>
      </Box>
    </>
  );
}

Login.redir = true;
