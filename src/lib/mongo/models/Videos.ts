import mongoose, { Schema, Types } from 'mongoose';

interface IVideo {
  name: string;
  genre: string;
  director: Types.Array<string>;
  length: string;
  rate: number;
  description: string;
  actors: Types.Array<string>;
  addedAt: number;
}

const videoSchema = new Schema<IVideo>({
  name: String,
  genre: [String],
  director: String,
  length: String,
  rate: Number,
  description: String,
  actors: [String],
  addedAt: Number,
});

let videoModel: mongoose.Model<IVideo>;
try {
  videoModel = mongoose.model<IVideo>('Videos');
} catch (error) {
  videoModel = mongoose.model<IVideo>('Videos', videoSchema);
}

export default videoModel;
