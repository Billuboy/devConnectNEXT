import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import dbConnect from '@utils/startup/db';
import User from '@utils/models/user';

export default NextAuth({
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
      async authorize(credentials, req) {
        console.log('here');
        await dbConnect();
        const user = await User.findOne({ username: credentials.username });
        if (user)
          return {
            displayName: user.displayName,
            id: user._id,
            avatar: user.avatar,
          };
        else return null;
      },
    }),
  ],
});
