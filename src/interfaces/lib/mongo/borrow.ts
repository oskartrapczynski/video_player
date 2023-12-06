export default interface Borrow {
  _id: string;
  userId: string;
  borrowDate: number;
  expectedBorrowDate: number;
  realBorrowDate: number | null;
}
