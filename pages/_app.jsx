import '../styles/globals.css';
import '../styles/_header.css';
import '@fortawesome/fontawesome-free/css/all.css';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
// import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import axios from 'axios';
import { SWRConfig } from 'swr';

import Header from '../components/header';
import Footer from '../components/footer';
import AuthGuard from '../components/authGuard';
import RedirGuard from '../components/redirGuard';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <SWRConfig
        value={{
          fetcher: (url) => axios(url).then((res) => res.data),
        }}
      >
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : Component.redir ? (
          <RedirGuard>
            <Component {...pageProps} />
          </RedirGuard>
        ) : (
          <Component {...pageProps} />
        )}
      </SWRConfig>
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
