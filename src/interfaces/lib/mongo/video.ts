export default interface Video {
  _id: string;
  title: string;
  genre: string[];
  director: string;
  length: string;
  rate: number;
  description: string;
  actors: string[];
  releasedAt: number;
  addedAt?: number;
}
