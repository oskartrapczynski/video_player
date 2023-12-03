import mongoose, { Schema, Types } from 'mongoose';
import { Borrow } from '../dbTypes';
import { borrowSchema } from '../schemas';

let borrowModel: mongoose.Model<Borrow>;
try {
  borrowModel = mongoose.model<Borrow>('videos');
} catch (error) {
  borrowModel = mongoose.model<Borrow>('videos', borrowSchema);
}

export default borrowModel;
