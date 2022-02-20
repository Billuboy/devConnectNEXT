import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import dbConnect from '@utils/startup/db';
import User from '@utils/models/user';
import { comparePassword } from '@lib/bcrypt';
import { json } from '@lib/parseJSON';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        await dbConnect();
        const result = await User.findOne({ username: credentials.username });
        const data = json(result);

        if (!data) return null;
        if (!(await comparePassword(credentials.password, data.password)))
          return null;

        const user = {
          id: data._id,
          name: data.displayName,
          image: data.avatar,
        };
        return user;
      },
    }),
    GoogleProvider({
      name: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        await dbConnect();
        const result = await User.findOne(
          { email: profile.email },
          { avatar: 1, displayName: 1, _id: 1 }
        );
        const data = json(result);

        return {
          id: data._id,
          name: data.displayName,
          image: data.avatar,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.uid = token.sub;
      return Promise.resolve(session);
    },
  },
});
