import { Types } from 'mongoose';

export default interface Borrow {
  title: string;
  genre: Types.Array<string>;
  director: string;
  length: string;
  rate: number;
  description: string;
  actors: Types.Array<string>;
  releasedAt: number;
  addedAt: number;
}
