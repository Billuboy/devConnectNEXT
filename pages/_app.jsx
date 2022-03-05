import '../styles/globals.css';
import '../styles/_header.css';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { SWRConfig } from 'swr';

import Header from '../components/header';
import Footer from '../components/footer';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <SWRConfig
        value={{
          fetcher: (url) => fetch(url).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
