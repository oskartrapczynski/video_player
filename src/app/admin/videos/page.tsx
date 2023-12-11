'use client';
import { Video } from '@/interfaces';
import { Alert, Box, Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Link from 'next/link';
import { LoadingCircle, VideoTable } from '@/components/index';

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
    console.log(processedData);

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
        <VideoTable videos={videos} handleDelete={handleDelete} />
      )}

      {!videos && !loading && <Alert severity="error">Brak filmów</Alert>}
    </Box>
  );
};

export default AdminVideosPage;
