import { USER_ROLE } from '@/constants/index';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      address: string;
      firstname: string;
      lastname: string;
      password: string;
      registerAt: number;
      role: USER_ROLE;
      tel: string;
      username: string;
      __v: number;
      _id: string;
    };
  }
}
