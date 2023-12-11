import { DATE_TYPE, USER_ROLE } from '@/constants';
import { User } from '@/interfaces';
import { decodeTimeStamp } from '@/utils';
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
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Types } from 'mongoose';

interface Props {
  users: User[];
  handleDelete: (id: Types.ObjectId) => Promise<void>;
}

const UserTable = ({ users, handleDelete }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell>id</TableCell> */}
            <TableCell align="left">Nick</TableCell>
            <TableCell align="left">Hasło</TableCell>
            <TableCell align="left">Rola</TableCell>
            <TableCell align="left">Imie</TableCell>
            <TableCell align="left">Nazwisko</TableCell>
            <TableCell align="left">Adres</TableCell>
            <TableCell align="left">Telefon</TableCell>
            <TableCell align="left">Data rejestracji</TableCell>
            <TableCell align="left">Zarządzaj</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(
            (
              {
                _id,
                username,
                password,
                role,
                firstname,
                lastname,
                address,
                tel,
                registerAt,
              },
              index
            ) => (
              <TableRow key={index}>
                {/* <TableCell component="th" scope="row">
                      {_id}
                    </TableCell> */}
                <TableCell component="th" scope="row">
                  {username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {String('*').repeat(password.length)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {role === USER_ROLE.ADMIN ? <SecurityIcon /> : <PersonIcon />}
                </TableCell>
                <TableCell component="th" scope="row">
                  {firstname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {lastname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {address}
                </TableCell>
                <TableCell component="th" scope="row">
                  {tel}
                </TableCell>
                <TableCell component="th" scope="row">
                  {decodeTimeStamp(registerAt!, DATE_TYPE.DATE_TIME)}
                </TableCell>
                <TableCell component="th" scope="row">
                  <>
                    <Link href={`/admin/users/edit/${_id}`}>
                      <IconButton color="warning">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(_id!)}
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

export default UserTable;
