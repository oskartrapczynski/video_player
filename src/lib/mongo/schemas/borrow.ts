import { Schema, Types } from 'mongoose';
import { Borrow } from '@/interfaces';

const borrowSchema = new Schema<Borrow>({
  _id: Types.ObjectId,
  userId: {
    type: String,
    required: true,
  },
  borrowDate: {
    type: Number,
    required: true,
  },
  expectedBorrowDate: {
    type: Number,
    required: true,
  },
  realBorrowDate: {
    type: Number,
    required: false,
  },
});

export default borrowSchema;
