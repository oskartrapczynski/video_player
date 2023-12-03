'use client';
import { ApiResponse, Video } from '@/interfaces';
import {
  Alert,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';

const AdminVideosPage = () => {
  const [videos, setVideos] = useState<null | Video[]>();
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const {
      data: { data },
    } = await axios.get('/api/videos');
    setVideos(data);
    console.log(data);
    console.log(typeof data);
    data
      ? enqueueSnackbar('Załadowano wszystkie filmy', {
          variant: 'success',
        })
      : enqueueSnackbar('Brak filmów', {
          variant: 'error',
        });
  };
  // const handleInsert = async () => {
  //   const {
  //     data: { info },
  //   } = await axios.post('/api/admin/videos', videos);
  //   enqueueSnackbar(info, {
  //     variant: 'success',
  //   });
  //   console.log(info);
  // };
  return (
    <>
      <SnackbarProvider />
      {videos ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">tytuł</TableCell>
                <TableCell align="right">gatunek</TableCell>
                <TableCell align="right">reżyser</TableCell>
                <TableCell align="right">długość</TableCell>
                <TableCell align="right">ocena</TableCell>
                <TableCell align="right">opis</TableCell>
                <TableCell align="right">aktorzy</TableCell>
                <TableCell align="right">wydano</TableCell>
                <TableCell align="right">dodano</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map(
                (
                  {
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
                    <TableCell component="th" scope="row">
                      {title}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {genre}
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
                      {description}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {actors}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {releasedAt}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {addedAt}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="error">Brak filmów</Alert>
      )}

      {/* <Button onClick={handleInsert}>Dodaj filmy</Button> */}
    </>
  );
};

export default AdminVideosPage;
