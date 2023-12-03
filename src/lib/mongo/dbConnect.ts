import mongoose from 'mongoose';

const dbConnect = async () => {
  if (
    mongoose.connection.readyState === mongoose.ConnectionStates.disconnected
  ) {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to database');
  }
};

export default dbConnect;
