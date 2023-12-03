import { Schema } from 'mongoose';
import { User } from '../dbTypes/index';

const userSchema = new Schema<User>({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  tel: String,
  registerAt: Number,
});

export default userSchema;
