import { Schema, Types } from 'mongoose';
import { Borrow } from '@/interfaces';

const borrowSchema = new Schema<Borrow>({
  _id: Types.ObjectId,
  userId: Types.ObjectId,
  videoId: Types.ObjectId,
  borrowDate: Number,
  expectedBorrowDate: Number,
  realBorrowDate: Number,
});

export default borrowSchema;
