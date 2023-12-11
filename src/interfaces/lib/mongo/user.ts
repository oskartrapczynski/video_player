import { USER_ROLE } from '@/constants/index';

export default interface User {
  _id?: string;
  username: string;
  password: string;
  role: USER_ROLE;
  firstname: string;
  lastname: string;
  address: string;
  tel: string;
  registerAt?: number;
}
