import mongoose from 'mongoose';

const dbConnect = async () =>
  await mongoose.connect(process.env.MONGODB_URI as string);

export default dbConnect;
