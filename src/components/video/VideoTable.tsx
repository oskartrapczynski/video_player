import { DATE_TYPE } from '@/constants';
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
import RuleIcon from '@mui/icons-material/Rule';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Video } from '@/interfaces';

interface Props {
  videos: Video[];
  handleDelete: (id: string) => Promise<void>;
}

const VideoTable = ({ videos, handleDelete }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell>id</TableCell> */}
            <TableCell align="left">Tytuł</TableCell>
            <TableCell align="left">
              <RuleIcon />
            </TableCell>
            <TableCell align="left">Gatunek</TableCell>
            <TableCell align="left">Reżyser</TableCell>
            <TableCell align="left">Długość</TableCell>
            <TableCell align="left">Ocena</TableCell>
            <TableCell align="left">Opis</TableCell>
            <TableCell align="left">Aktorzy</TableCell>
            <TableCell align="left">Wydano</TableCell>
            <TableCell align="left">Dodano</TableCell>
            <TableCell align="left">Zarządzaj</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {videos.map(
            (
              {
                _id,
                title,
                isAvailable,
                genre,
                director,
                length,
                rate,
                description,
                actors,
                releasedAt,
                addedAt,
              },
              index
            ) => (
              <TableRow key={index}>
                {/* <TableCell component="th" scope="row">
                      {_id}
                    </TableCell> */}
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {isAvailable ? (
                    <CheckCircleOutlineIcon color="success" />
                  ) : (
                    <HighlightOffIcon color="error" />
                  )}
                </TableCell>
                <TableCell component="th" scope="row">
                  {genre && genre.length > 1 ? genre.length : genre}
                </TableCell>
                <TableCell component="th" scope="row">
                  {director}
                </TableCell>
                <TableCell component="th" scope="row">
                  {length}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rate}
                </TableCell>
                <TableCell component="th" scope="row">
                  {description && description.length > 30
                    ? `${description.slice(0, 30)}...`
                    : description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {actors && actors.length}
                </TableCell>
                <TableCell component="th" scope="row">
                  {decodeTimeStamp(releasedAt, DATE_TYPE.DATE)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {decodeTimeStamp(addedAt!, DATE_TYPE.DATE_TIME)}
                </TableCell>
                <TableCell component="th" scope="row">
                  <>
                    <Link href={`/admin/videos/edit/${_id}`}>
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

export default VideoTable;
