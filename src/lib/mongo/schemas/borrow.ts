import { Schema, Types } from 'mongoose';
import { Borrow } from '../dbTypes/index';

const borrowSchema = new Schema<Borrow>({
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
