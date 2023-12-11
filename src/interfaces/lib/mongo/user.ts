import { USER_ROLE } from '@/constants/index';
import { Types } from 'mongoose';

export default interface User {
  _id?: Types.ObjectId;
  username: string;
  password: string;
  role: USER_ROLE;
  firstname: string;
  lastname: string;
  address: string;
  tel: string;
  registerAt?: number;
}
