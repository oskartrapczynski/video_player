'use client';
import { DATE_TYPE, VIDEO_FIELD, VIDEO_INPUT } from '@/constants';
import { ApiResponse, Video } from '@/interfaces';
import { decodeTimeStamp } from '@/utils';
import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { LoadingCircle } from '@/components/index';

const AdminVideosPage = () => {
  const [videos, setVideos] = useState<null | Video[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const {
      data: { data },
    } = await axios.get('/api/videos');
    const processedData = data && data.length > 0 ? data : null;

    setVideos(processedData);
    // console.log(processedData);

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const {
        data: { info, type },
      } = await axios.delete(`/api/admin/videos/${id}`);
      console.log(info);
      enqueueSnackbar(info, {
        variant: type,
      });
      loadVideos();
    } catch {
      enqueueSnackbar('Błąd podczas usuwania', {
        variant: 'error',
      });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <SnackbarProvider />
      <Link href="/admin/videos/add">
        <Button
          sx={{ mb: 2 }}
          variant="contained"
          color="success"
          startIcon={<AddToPhotosIcon />}
        >
          Dodaj filmy
        </Button>
      </Link>
      {loading && <LoadingCircle />}
      {videos && !loading && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                {/* <TableCell>id</TableCell> */}
                <TableCell align="left">Tytuł</TableCell>
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
                          onClick={() => handleDelete(_id)}
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
      )}

      {!videos && !loading && <Alert severity="error">Brak filmów</Alert>}
    </Box>
  );
};

export default AdminVideosPage;
