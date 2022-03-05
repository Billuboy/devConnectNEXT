import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { handleGoogleLogin, handleCredentialsLogin } from '@lib/authHelper';

export default (req, res) => {
  // console.log('error', req.body);
  const options = {
    session: {
      jwt: true,
    },
    providers: [
      GoogleProvider({
        name: 'google',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        async profile(profile) {
          const user = await handleGoogleLogin(
            profile.email,
            profile.name,
            profile.picture
          );
          return user;
        },
      }),
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          username: {
            label: 'Username',
            type: 'text',
            placeholder: 'Username',
          },
          password: {
            label: 'Password',
            type: 'password',
            placeholder: 'Password',
          },
        },
        async authorize(credentials) {
          const user = await handleCredentialsLogin(
            credentials.username,
            credentials.password
          );
          return user;
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        session.user.uid = token.sub;
        return Promise.resolve(session);
      },
      // redirect({ url, baseUrl }) {
      //   console.log('base', baseUrl);
      //   console.log('url', url);
      //   // if (url.startsWith(baseUrl)) return url;
      //   // else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      //   return `${baseUrl}/books`;
      // },
    },
  };

  return NextAuth(req, res, options);
};
