import mongoose, { Schema, Types } from 'mongoose';
import { Borrow } from '@/interfaces';
import { borrowSchema } from '../schemas';

let borrowModel: mongoose.Model<Borrow>;
try {
  borrowModel = mongoose.model<Borrow>('borrows');
} catch (error) {
  borrowModel = mongoose.model<Borrow>('borrows', borrowSchema);
}

export default borrowModel;
