import React, { useState, useEffect } from 'react';
import { Button, Box, Grid, Heading, Text, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';

import InputField from '../components/templates/inputField';
import PasswordField from '../components/templates/passwordField';
import { useAuth } from '../components/authContext';

export default function Register() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  let timer;

  useEffect(() => clearTimeout(timer), []);

  const onFormSubmit = async e => {
    e.preventDefault();
    setDisabled(true);

    try {
      await axios.post('/api/auth/register', fields);
      await login({
        email: fields.email,
        password: fields.password,
        remMe: false,
      });
      timer = setTimeout(() => router.replace('/dashboard'), 500);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const renderForm = () => {
    return (
      <Flex align='center' direction='column' bg='#e7fbff'>
        <Box mt='1.5rem' textAlign='center'>
          <Heading size='xl'>Register</Heading>
        </Box>
        <Text fontSize='xl' my='1rem' fontWeight='600'>
          Register on website to have a dev profile
        </Text>
        <Box w='90%'>
          <form onSubmit={onFormSubmit}>
            <InputField
              label='UserName'
              m='1.5rem'
              mb='0.75rem'
              fontSize='1.3rem'
              placeholder='Enter UserName'
              isRequired={true}
              onChange={e => setFields({ ...fields, name: e.target.value })}
              value={fields.name}
              error={errors?.name}
            />

            <InputField
              label='Email'
              m='1.5rem'
              mb='0.75rem'
              fontSize='1.3rem'
              placeholder='Enter Email'
              type='email'
              isRequired={true}
              onChange={e => setFields({ ...fields, email: e.target.value })}
              value={fields.email}
              error={errors?.email}
            />

            <PasswordField
              label='Password'
              show={show}
              isRequired={true}
              onChange={e => setFields({ ...fields, password: e.target.value })}
              value={fields.password}
              onClick={e => setShow(!show)}
              error={errors?.password}
            />

            <Button
              type='submit'
              bg='#16c79a'
              display='block'
              mx='auto'
              w='80%'
              my='2rem'
              isLoading={disabled}
              loadingText='Registering...'
              _focus={{ outline: 'none' }}
              _hover={{ background: '#13b38a' }}>
              Register
            </Button>
          </form>
        </Box>
      </Flex>
    );
  };

  return (
    <>
      <Head>
        <title>DevConnect</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Box h='calc(100vh - 130px)'>
        <Grid h='100%' placeItems='center'>
          <Box w='30%' border='solid 1px #eee' borderRadius='5px'>
            {renderForm()}
          </Box>
        </Grid>
      </Box>
    </>
  );
}

Register.redir = true;
