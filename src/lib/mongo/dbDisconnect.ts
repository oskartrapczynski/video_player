import mongoose from 'mongoose';

const dbDisconnect = async () => {
  if (mongoose.connection.readyState === mongoose.ConnectionStates.connected) {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  }
};

export default dbDisconnect;
