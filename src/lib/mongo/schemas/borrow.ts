import { Schema, Types } from 'mongoose';
import { Borrow } from '@/interfaces';

const borrowSchema = new Schema<Borrow>({
  _id: Types.ObjectId,
  userId: { type: Types.ObjectId, ref: 'users' },
  videoId: { type: Types.ObjectId, ref: 'videos' },
  borrowDate: Number,
  expectedBorrowDate: Number,
  realBorrowDate: Number,
});

export default borrowSchema;
