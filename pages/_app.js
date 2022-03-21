import '../styles/globals.css';
import '../styles/_header.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import axios from 'axios';
import { SWRConfig } from 'swr';

import Header from '../components/header';
import Footer from '../components/footer';
import { AuthGuard, LoginGuard } from '../components/guard';
import { AuthProvider } from '../components/authContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider portalZIndex='10'>
      <AuthProvider>
        <CSSReset />
        <div id='app'>
          <Header />
          <SWRConfig
            value={{
              fetcher: url => axios(url).then(res => res.data),
            }}>
            {Component.requireAuth ? (
              <AuthGuard>
                <Component {...pageProps} />
              </AuthGuard>
            ) : null}
            {Component.redir ? (
              <LoginGuard>
                <Component {...pageProps} />
              </LoginGuard>
            ) : null}
            {!Component.requireAuth && !Component.redir ? (
              <Component {...pageProps} />
            ) : null}
          </SWRConfig>
          <Footer />
        </div>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
