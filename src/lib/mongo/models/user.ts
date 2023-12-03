import mongoose, { Schema } from 'mongoose';
import { User } from '../dbTypes/index';
import { userSchema } from '../schemas/index';

let userModel: mongoose.Model<User>;
try {
  userModel = mongoose.model<User>('users');
} catch (error) {
  userModel = mongoose.model<User>('users', userSchema);
}

export default userModel;
