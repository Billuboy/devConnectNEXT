import React from 'react';
import { Box, Heading, Flex, Text, IconButton } from '@chakra-ui/react';
import Moment from 'react-moment';

import { useAuth } from '../authContext';

export default function CommentCard({ comment, bg, bgText, deleteComment }) {
  const { userInfo } = useAuth();

  const renderDelete = () => {
    if (userInfo?._id === comment.user) {
      return (
        <IconButton
          variant="outline"
          color="red"
          bg="#ebf8f5"
          icon={<i className="fas fa-trash"></i>}
          _focus={{ outlne: 'none' }}
          onClick={() => deleteComment(comment._id)}
        />
      );
    }
    return;
  };

  return (
    <Box
      w="90%"
      p="1rem"
      m="1rem"
      bg={bg}
      borderRadius="10px"
      _hover={{ boxShadow: '5px 5px 13px rgba(71,71,71,0.25)' }}
      boxShadow="lg">
      <Flex justify="space-between" mb="0.75rem">
        <Heading fontWeight="500" fontSize="1.3rem" color="#11a17c">
          {comment.name}
        </Heading>
        <Box fontWeight="600" fontSize="1.1rem" color="#11698e">
          <Moment format="HH:MM DD-MM-YYYY">{comment.date}</Moment>
        </Box>
      </Flex>
      <Flex justify="center" align="bottom">
        <Box w="100%" border="1px solid #eee" bg={bgText} borderRadius="10px">
          <Text p="0.5rem" fontWeight="500">
            {comment.text}
          </Text>
        </Box>
      </Flex>
      {userInfo?._id ? (
        <Flex direction="row-reverse" mt="0.75rem">
          <Box>{renderDelete()}</Box>
        </Flex>
      ) : null}
    </Box>
  );
}
