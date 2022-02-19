import Head from 'next/head';
import React, { useState, useRef, useMemo } from 'react';
import {
  Box,
  Flex,
  useDisclosure,
  Button,
  Heading,
  Text,
  createStandaloneToast,
} from '@chakra-ui/react';
import axios from 'axios';
import useSwr, { mutate } from 'swr';
// import * as _ from 'lodash';

import PostCard from '../components/post/postCard';
import PostCreate from '../components/post/createPost';
import dbConnect from '../utils/startup/db';
import Post from '../utils/models/post';
import { useAuth } from '../components/authContext';

function Index(props) {
  const { isOpen, onToggle } = useDisclosure();
  const [errors, setErrors] = useState({});
  const likeColor = useRef('#000');

  const { data } = useSwr('/api/post', {
    initialData: props.data,
  });
  //auth
  const { userInfo, auth } = useAuth();

  const createPost = async (post) => {
    try {
      data.push(post);
      mutate('/api/post', data, false);
      await axios.post('/api/post', { text: post.text });
      mutate('/api/post');
    } catch (err) {
      data.pop();
      setErrors(err.response.data);
    }
  };

  // const deletePost = async (postId) => {
  //   if (
  //     window.confirm(
  //       'This will delete your account permanently. This cannot be undone!!! '
  //     )
  //   ) {
  //     const res = data.filter(({ _id }) => _id !== postId);

  //     mutate('/api/post', res, false);
  //     await axios.delete(`/api/post/${postId}`);
  //     mutate('/api/post');
  //   }
  // };

  const loginPopup = () => {
    const toast = createStandaloneToast();
    const id = 'remove-duplication';

    if (toast.isActive(id)) return null;

    return toast({
      id,
      title: 'Unauthorized Access',
      description: 'Please Login First',
      position: 'top',
      status: 'error',
      duration: 3500,
      isClosable: true,
    });
  };

  const onLike = async (postId) => {
    if (auth) {
      // const index = data.findIndex((d) => d._id === postId);

      // if (
      //   data[index].likes.filter(({ user }) => user === userInfo?._id).length >
      //   0
      // ) {
      //   likeColor.current = '#61B15A';
      //   _.remove(data[index].likes, ({ user }) => user === userInfo?._id);
      //   --data[index].likeCount;
      // } else {
      //   likeColor.current = '#000';
      //   data[index].likes.push({ user: userInfo?._id });
      //   ++data[index].likeCount;
      // }

      // mutate(`/api/post`, data, false);
      // await axios.post(`/api/post/like/${postId}`);
      // mutate(`/api/post`);
      console.log('post-id', postId);
    } else {
      loginPopup();
    }
  };

  const RenderPost = () =>
    data.map((post) => {
      // const memoizedPost = useMemo(() => post, [post.likeCount]);
      return (
        <PostCard
          // key={memoizedPost._id}
          // post={memoizedPost}
          key={post._id}
          post={post}
          // bg="#cfefe7"
          // bgText="#f0faf7"
          // comment={true}
          // // deletePost={deletePost}
          // onLike={onLike}
          // likeColor={likeColor}
          // userInfo={userInfo}
        />
      );
    });

  const renderPostButton = () => (
    <Button
      p="0"
      h="50px"
      w="50px"
      borderRadius="50%"
      mb="2rem"
      mr="2rem"
      bg="#16c79a"
      _focus={{ outline: 'none' }}
      _hover={{ background: '#13b38a' }}
      onClick={onToggle}
    >
      <i className="fas fa-plus"></i>
    </Button>
  );

  const renderPostInput = () => {
    if (isOpen) {
      return (
        <Box
          w="90%"
          p="1rem"
          m="1rem"
          bg="#bce9dd"
          borderRadius="10px"
          boxShadow="lg"
        >
          <PostCreate
            create={createPost}
            error={errors}
            placeholder="Message"
            label="Post Input"
          />
        </Box>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <>
        <Head>
          <title>DevConnect</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Box h="calc(100vh - 130px)">
          <Flex
            justify="center"
            align="center"
            h="100%"
            direction="column"
            color="#fff"
          >
            <Heading fontWeight="500" fontSize="3rem" mb="1.5rem">
              No Posts Yet
            </Heading>
            <Text fontWeight="400" fontSize="1.4rem">
              Be the first one to post
            </Text>
          </Flex>
          <Flex justify="center" align="center">
            <Box w="100%" position="fixed" bottom="0" textAlign="right">
              {renderPostButton()}
            </Box>
            <Box w="45%" position="fixed" bottom="0">
              {renderPostInput()}
            </Box>
          </Flex>
        </Box>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>DevConnect</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box minH="calc(100vh - 130px)">
        <Flex align="center" direction="column">
          <Box w="45%">{RenderPost()}</Box>
          <Box w="100%" position="fixed" bottom="0" textAlign="right">
            {renderPostButton()}
          </Box>
          <Box w="45%" position="fixed" bottom="0">
            {renderPostInput()}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export async function getStaticProps() {
  await dbConnect();

  const response = await Post.find()
    .sort({ date: -1 })
    .select({ comments: 0, _v: 0 });

  if (!response) return { props: { data: [] } };

  const json = JSON.parse(JSON.stringify(response));
  return { props: { data: json }, revalidate: 10 };
}

export default Index;
