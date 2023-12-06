import { Types } from 'mongoose';

const mongoId = (id: string) => {
  return new Types.ObjectId(id);
};
export default mongoId;
