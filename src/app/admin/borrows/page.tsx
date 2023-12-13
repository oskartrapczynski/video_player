'use client';
import { Borrow, Video } from '@/interfaces';
import { Alert, Box, Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Link from 'next/link';
import { BorrowTable, LoadingCircle } from '@/components';
import { Types } from 'mongoose';

const AdminVideosPage = () => {
  const [borrows, setBorrows] = useState<null | Borrow[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const {
      data: { data },
    } = await axios.get('/api/borrows');
    const processedData = data && data.length > 0 ? data : null;

    setBorrows(processedData);
    console.log(processedData);

    setLoading(false);
  };

  const handleDelete = async (id: Types.ObjectId, videoId: Types.ObjectId) => {
    try {
      const {
        data: { info, type },
      } = await axios.delete(`/api/admin/borrows/${id}?videoId=${videoId}`);
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

  const handleBorrowReturn = async (id: Types.ObjectId) => {
    try {
      const {
        data: { info, type },
      } = await axios.get(`/api/admin/borrows/${id}`);
      console.log(info);
      enqueueSnackbar(info, {
        variant: type,
      });
    } catch {
      enqueueSnackbar('Błąd podczas zwracania', {
        variant: 'error',
      });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <SnackbarProvider />
      <Link href="/admin/borrows/add">
        <Button
          sx={{ mb: 2 }}
          variant="contained"
          color="success"
          startIcon={<AddToPhotosIcon />}
        >
          Dodaj wypożyczenia
        </Button>
      </Link>
      {loading && <LoadingCircle />}
      {borrows && !loading && (
        <BorrowTable
          borrows={borrows}
          handleDelete={handleDelete}
          handleBorrowReturn={handleBorrowReturn}
        />
      )}

      {!borrows && !loading && <Alert severity="error">Brak wypożyczeń</Alert>}
    </Box>
  );
};

export default AdminVideosPage;
