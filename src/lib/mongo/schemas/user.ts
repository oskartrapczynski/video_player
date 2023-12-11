import { Schema, Types } from 'mongoose';
import { User } from '@/interfaces';

const userSchema = new Schema<User>({
  _id: Types.ObjectId,
  username: String,
  password: String,
  role: String,
  firstname: String,
  lastname: String,
  address: String,
  tel: String,
  registerAt: Number,
});

export default userSchema;
