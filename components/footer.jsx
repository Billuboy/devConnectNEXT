import React from 'react';

// import { Box, Text } from '@chakra-ui/react';

function Footer() {
  const RenderFooter = () => (
    // <Box>
    //   <Text fontWeight="600" fontSize="1.1rem">
    <div>
      Copyright &copy; {new Date().getFullYear()}, DevConnect, All Rights
      Reserved
    </div>
    //   </Text>
    // </Box>
  );

  return (
    // <Box w="100%" bg="#b2d2d7" color="#333" p="1rem" textAlign="center">
    <div>
      <RenderFooter />
    </div>
    // </Box>
  );
}

export default Footer;
