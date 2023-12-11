export default interface Borrow {
  _id?: string;
  userId: string;
  videoId: string;
  borrowDate: number;
  expectedBorrowDate: number;
  realBorrowDate: number | null;
}
