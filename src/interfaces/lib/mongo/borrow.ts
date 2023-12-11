import { Types } from 'mongoose';

export default interface Borrow {
  _id?: Types.ObjectId;
  userId?: Types.ObjectId;
  videoId?: Types.ObjectId;
  borrowDate?: number;
  expectedBorrowDate?: number;
  realBorrowDate?: number;
}
