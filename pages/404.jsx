import React from 'react';
import Head from 'next/head';
import { Box, Grid, Text } from '@chakra-ui/react';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Box h="calc(100vh - 130px)">
        <Grid h="100%" placeItems="center">
          <Box>
            <Text
              color="#fff"
              textAlign="center"
              fontSize="2.5rem"
              fontWeight="700">
              404
            </Text>
            <Text color="#fff" fontSize="1.75rem" fontWeight="600">
              Page Not Found
            </Text>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
