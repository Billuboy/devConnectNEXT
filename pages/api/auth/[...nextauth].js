import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { handleGoogleLogin, handleCredentialsLogin } from '@lib/authHelper';

export default (req, res) => {
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
        return Promise.resolve({
          ...session,
          user: { ...session.user, uid: token.sub },
        });
      },
    },
  };

  return NextAuth(req, res, options);
};
