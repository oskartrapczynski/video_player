import { USER_ROLE, DATE_TYPE } from '@/constants/index';
import { decodeTimeStamp } from '@/utils/index';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Borrow } from '@/interfaces';
import { Types } from 'mongoose';
import axios from 'axios';

interface Props {
  borrows: Borrow[];
  handleDelete: (id: Types.ObjectId, videoId: Types.ObjectId) => Promise<void>;
  handleBorrowReturn: (id: Types.ObjectId) => Promise<void>;
}

const BorrowTable = ({ borrows, handleDelete, handleBorrowReturn }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell>id</TableCell> */}
            <TableCell align="left">UserId</TableCell>
            <TableCell align="left">VideoId</TableCell>
            <TableCell align="left">Wypożyczono</TableCell>
            <TableCell align="left">Planowany zwrot</TableCell>
            <TableCell align="left">Zwrócono</TableCell>
            <TableCell align="left">Zarządzaj</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {borrows.map(
            (
              {
                _id,
                userId,
                videoId,
                borrowDate,
                expectedBorrowDate,
                realBorrowDate,
              },
              index
            ) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {userId ? userId.toString() : '-'}
                </TableCell>
                <TableCell component="th" scope="row">
                  {videoId ? videoId.toString() : '-'}
                </TableCell>
                <TableCell component="th" scope="row">
                  {borrowDate
                    ? decodeTimeStamp(borrowDate!, DATE_TYPE.DATE_TIME)
                    : '-'}
                </TableCell>
                <TableCell component="th" scope="row">
                  {borrowDate
                    ? decodeTimeStamp(expectedBorrowDate!, DATE_TYPE.DATE_TIME)
                    : '-'}
                </TableCell>
                <TableCell component="th" scope="row">
                  {realBorrowDate
                    ? decodeTimeStamp(realBorrowDate!, DATE_TYPE.DATE_TIME)
                    : '-'}
                </TableCell>
                <TableCell component="th" scope="row">
                  <>
                    <IconButton
                      color="success"
                      onClick={() => handleBorrowReturn(_id!)}
                    >
                      <CheckCircleOutlineIcon />
                    </IconButton>
                    <Link href={`/admin/users/edit/${_id}`}>
                      <IconButton color="warning">
                        <VisibilityIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(_id!, videoId!)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BorrowTable;
