import mongoose, { Schema, Types } from 'mongoose';

interface IUsers {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  tel: string;
  registerAt: number;
}

const userSchema = new Schema<IUsers>({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  tel: String,
  registerAt: Number,
});

let userModel: mongoose.Model<IUsers>;
try {
  userModel = mongoose.model<IUsers>('Users');
} catch (error) {
  userModel = mongoose.model<IUsers>('Users', userSchema);
}

export default userModel;
