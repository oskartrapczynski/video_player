import { DATE_TYPE } from '@/constants/index';
import { BorrowVideo } from '@/interfaces';
import { decodeTimeStamp } from '@/utils/index';
import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  data: BorrowVideo;
}

const VideoProfileDetails = ({ data }: Props) => {
  const { borrowDate, director, expectedBorrowDate, realBorrowDate, title } =
    data;

  return (
    <Box
      sx={{
        p: 2,
        mx: 'auto',
        my: '15px',
        width: '50%',
        border: '1px solid black',
        borderRadius: '15px',
      }}
    >
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h6">{director}</Typography>
      <Typography variant="subtitle1">
        {'Wypożyczono: '}
        {borrowDate ? decodeTimeStamp(borrowDate, DATE_TYPE.DATE_TIME) : '-'}
      </Typography>
      <Typography variant="subtitle1">
        {'Oczekiwany zwrot: '}
        {expectedBorrowDate
          ? decodeTimeStamp(expectedBorrowDate, DATE_TYPE.DATE_TIME)
          : '-'}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {'Zwrócono: '}
        {realBorrowDate
          ? decodeTimeStamp(realBorrowDate, DATE_TYPE.DATE_TIME)
          : '-'}
      </Typography>
    </Box>
  );
};

export default VideoProfileDetails;
