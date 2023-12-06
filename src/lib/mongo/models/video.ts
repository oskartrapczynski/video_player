import mongoose, { Schema, Types } from 'mongoose';
import { Video } from '@/interfaces';
import { videoSchema } from '../schemas';

let videoModel: mongoose.Model<Video>;
try {
  videoModel = mongoose.model<Video>('videos');
} catch (error) {
  videoModel = mongoose.model<Video>('videos', videoSchema);
}

export default videoModel;
