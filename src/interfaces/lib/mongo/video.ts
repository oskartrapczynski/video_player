import { Types } from 'mongoose';

export default interface Video {
  _id?: Types.ObjectId;
  title: string;
  genre: string[];
  director: string;
  length: string;
  rate: number;
  description: string;
  actors: string[];
  releasedAt: number;
  addedAt?: number;
  isAvailable: boolean;
}
