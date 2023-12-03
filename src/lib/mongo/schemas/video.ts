import { Types, Schema } from 'mongoose';
import { Video } from '../dbTypes/index';

const videoSchema = new Schema<Video>({
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
