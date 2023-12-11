'use client';
import { User, Video } from '@/interfaces';
import { Alert, Box, Button } from '@mui/material';
import axios from 'axios';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import Link from 'next/link';
import { LoadingCircle, UserTable } from '@/components';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<null | User[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    const {
      data: { data },
    } = await axios.get('/api/users');
    const processedData = data && data.length > 0 ? data : null;

    setUsers(processedData);
    console.log(processedData);

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const {
        data: { info, type },
      } = await axios.delete(`/api/admin/users/${id}`);
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
      <Link href="/admin/users/add">
        <Button
          sx={{ mb: 2 }}
          variant="contained"
          color="success"
          startIcon={<AddToPhotosIcon />}
        >
          Dodaj użytkownika
        </Button>
      </Link>
      {loading && <LoadingCircle />}
      {users && !loading && (
        <UserTable users={users} handleDelete={handleDelete} />
      )}

      {!users && !loading && <Alert severity="error">Brak użytkowników</Alert>}
    </Box>
  );
};

export default AdminUsersPage;
