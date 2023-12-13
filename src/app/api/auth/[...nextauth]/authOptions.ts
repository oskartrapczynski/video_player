import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import { userModel } from '@/lib/mongo/models';
import { dbConnect, dbDisconnect } from '@/lib/mongo';

import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;

        const { username, password } = credentials;

        // const { data } = await axios.post('/api/auth/login', {
        //   username: username,
        //   password: password,
        // });

        await dbConnect();
        const data = await userModel.findOne({
          username: username.toString(),
          password: password.toString(),
        });
        await dbDisconnect();

        if (!data) return null;

        data!.password = String('*').repeat(password.length);

        const user = data;

        return user as any;

        // if (!data || !data.data) return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/user/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (!session || !session.user) {
        return session;
      }
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

export default authOptions;
