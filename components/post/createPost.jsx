import React, { useState } from 'react';
import { IconButton, Box, Flex, createStandaloneToast } from '@chakra-ui/react';

import InputTextArea from '../templates/inputTextArea';
import { useAuth } from '../authContext';

export default function CreatePost({ error, create, placeholder, mt, label }) {
  const [text, setText] = useState('');
  const { userInfo } = useAuth();

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

  const onFormSubmit = async e => {
    e.preventDefault();

    if (userInfo?._id) {
      const post = {
        text,
        user: userInfo._id,
        commentCount: 0,
        likeCount: 0,
        name: userInfo.name,
        date: Date.now(),
      };

      create(post);
      setText('');
    } else {
      loginPopup();
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <Flex justify="space-evenly" mt={mt}>
          <InputTextArea
            placeholder={placeholder}
            label={label}
            onChange={e => setText(e.target.value)}
            value={text}
            w="90%"
            error={error?.text}
          />
          <Box w="10%" position="relative">
            <IconButton
              position="absolute"
              borderRadius="5px"
              bottom="1px"
              right="0px"
              variant="outline"
              color="#16c79a"
              w="38.5px"
              h="38.5px"
              border="1px solid #333"
              icon={<i className="fas fa-chevron-right"></i>}
              type="Submit"
              borderColor="#00a37a"
              _hover={{ borderColor: '#00a37a' }}
              _focus={{ outline: 'none' }}
            />
          </Box>
        </Flex>
      </form>
    </div>
  );
}
