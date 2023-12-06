import { Types, Schema } from 'mongoose';
import { Video } from '@/interfaces';

const videoSchema = new Schema<Video>({
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

export default videoSchema;
