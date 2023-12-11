'use client';
import { BackButton, VideoAdd } from '@/components';
import { Borrow, Video } from '@/interfaces/index';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import { Types } from 'mongoose';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

const AddPage = () => {
  const handleInsert = async () => {
    const borrows: Borrow[] = [
      {
        _id: new Types.ObjectId('3573b04e0804493456e58400'),
        userId: new Types.ObjectId('6573b04e0804493456e584f0'),
        videoId: new Types.ObjectId('5573b1150804493456e584f8'),
        borrowDate: 1699701071000,
        expectedBorrowDate: 1699873871000,
      },
      {
        _id: new Types.ObjectId('3573b04e0804493456e58401'),
        userId: new Types.ObjectId('6573b04e0804493456e584f1'),
        videoId: new Types.ObjectId('5573b1150804493456e584f9'),
        borrowDate: 1675303322000,
        expectedBorrowDate: 1675476122000,
      },
      {
        _id: new Types.ObjectId('3573b04e0804493456e58402'),
        userId: new Types.ObjectId('6573b04e0804493456e584f1'),
        videoId: new Types.ObjectId('5573b1150804493456e584fa'),
        borrowDate: 1677812583000,
        expectedBorrowDate: 1677985383000,
      },
      {
        _id: new Types.ObjectId('3573b04e0804493456e58403'),
        userId: new Types.ObjectId('6573b04e0804493456e584f2'),
        videoId: new Types.ObjectId('5573b1150804493456e584fb'),
        borrowDate: 1680581044000,
        expectedBorrowDate: 1680753844000,
        realBorrowDate: 1680779044000,
      },
    ];
    const {
      data: { info, type },
    } = await axios.post('/api/admin/borrows', borrows);
    enqueueSnackbar(info, {
      variant: type,
    });
    console.log(info);
  };

  return (
    <Box sx={{ p: 2 }}>
      <BackButton />
      <Button variant="contained" color="success" onClick={handleInsert}>
        Importuj wypożyczenia
      </Button>
    </Box>
  );
};

export default AddPage;
