import { Schema, Types } from 'mongoose';
import { Borrow } from '@/interfaces';

const borrowSchema = new Schema<Borrow>({
  _id: Types.ObjectId,
  title: String,
  genre: [String],
  director: String,
  length: String,
  rate: Number,
  description: String,
  actors: [String],
  releasedAt: Number,
  addedAt: Number,
});

export default borrowSchema;
