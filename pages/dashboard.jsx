import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Divider,
  Center,
  Spinner,
} from '@chakra-ui/react';
import Head from 'next/head';
import axios from 'axios';
import useSwr, { trigger } from 'swr';
import RouterLink from 'next/link';

import Education from '../components/dashboard/eduDisplay';
import Experience from '../components/dashboard/expDisplay';

export default function Dashboard() {
  const { data, mutate } = useSwr('/api/profile');

  const deleteProfile = async () => {
    if (
      window.confirm(
        'This will delete your account permanently. This cannot be undone!!! '
      )
    ) {
      const res = {};
      mutate(res, false);
      await axios.delete('/api/profile');
      trigger('/api/profile');
    }
  };

  const deleteExp = async id => {
    const filter = data.experience.filter(exp => exp._id !== id);
    const res = { ...data, experience: filter };

    mutate(res, false);
    await axios.delete(`/api/profile/experience/${id}`);
  };

  const deleteEdu = async id => {
    const filter = data.education.filter(edu => edu._id !== id);
    const res = { ...data, education: filter };

    mutate(res, false);
    await axios.delete(`/api/profile/education/${id}`);
  };

  const renderProfile = () => {
    if (data?.data?.length === 0) {
      return (
        <Flex direction="column" p="1rem">
          <Box mb="0.5rem">
            <Heading textAlign="center" mb="0.5rem" fontWeight="700">
              Dashboard
            </Heading>
            <Box fontWeight="600" fontSize="1.4rem">
              Welcome{' '}
              <Text display="inline" color="#54c3a7" fontWeight="800">
                {data.name}
              </Text>
            </Box>
          </Box>
          <Box>
            <Flex align="center" justify="flex-start">
              <RouterLink href="/profileform">
                <Button
                  bg="#11698e"
                  color="#f8f1f1"
                  m="0.5rem"
                  leftIcon={<i className="fas fa-pencil-alt" />}
                  _hover={{ background: '#0d5471' }}
                  _focus={{ outline: 'none' }}>
                  Create Profile
                </Button>
              </RouterLink>
            </Flex>
          </Box>
          <Center>
            <Divider orientation="horizontal" colorScheme="blue" />
          </Center>
        </Flex>
      );
    }

    return (
      <Flex direction="column" p="1rem">
        <Box mb="0.5rem">
          <Heading textAlign="center" mb="0.5rem" fontWeight="700">
            Dashboard
          </Heading>
          <Box fontWeight="600" fontSize="1.4rem">
            Welcome{' '}
            <Text display="inline" color="#54c3a7" fontWeight="800">
              {data?.user?.name}
            </Text>
          </Box>
        </Box>
        <Box>
          <Flex align="center" justify="flex-start">
            <RouterLink href="/profileform">
              <Button
                bg="#11698e"
                color="#f8f1f1"
                m="0.5rem"
                leftIcon={<i className="fas fa-pencil-alt" />}
                _hover={{ background: '#0d5471' }}
                _focus={{ outline: 'none' }}>
                Update Profile
              </Button>
            </RouterLink>
            <RouterLink href="/experienceform">
              <Button
                bg="#11698e"
                color="#f8f1f1"
                mr="0.5rem"
                leftIcon={<i className="fas fa-user-edit" />}
                _hover={{ background: '#0d5471' }}
                _focus={{ outline: 'none' }}>
                Experience
              </Button>
            </RouterLink>
            <RouterLink href="/educationform">
              <Button
                bg="#11698e"
                color="#f8f1f1"
                mr="0.5rem"
                leftIcon={<i className="fas fa-book-open" />}
                _hover={{ background: '#0d5471' }}
                _focus={{ outline: 'none' }}>
                Education
              </Button>
            </RouterLink>
          </Flex>
          <Center>
            <Divider orientation="horizontal" colorScheme="blue" />
          </Center>
          <Box></Box>
        </Box>

        <Box>
          <Experience data={data?.experience} del={deleteExp} />
        </Box>
        <Box>
          <Education data={data?.education} del={deleteEdu} />
        </Box>

        <Button
          onClick={deleteProfile}
          display="inline-block"
          bg="#e50052"
          color="#f8f1f1"
          mx="auto"
          mt="4rem"
          mb="0.5rem"
          _hover={{ background: '#cc0049' }}
          _focus={{ outline: 'none' }}>
          Delete My Account
        </Button>
      </Flex>
    );
  };

  if (!data) {
    return (
      <Box h="calc(100vh - 126px)">
        <Flex justify="center" align="center" h="100%">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="#f8f1f1"
            color="#19456b"
            size="xl"
          />
        </Flex>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>DashBoard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box minH="calc(100vh - 130px)">
        <Flex justify="center">
          <Box
            minH="588px"
            w="70%"
            border="solid 1px #eee  "
            bg="#E7FBFF"
            borderRadius="5px"
            boxShadow="lg"
            my="1rem">
            {renderProfile()}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

Dashboard.requireAuth = true;
