'use client';
import { DATE_TYPE } from '@/constants/index';
import { Video } from '@/interfaces';
import { decodeTimeStamp } from '@/utils/index';
import { Stack, Typography, Chip, Box, Rating, Button } from '@mui/material';
import React from 'react';
import { BackButton } from '..';

const VideoPage = ({
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
}: Video) => {
  return (
    <Box sx={{ p: 2, maxWidth: 500 }}>
      <BackButton />
      <Stack spacing={1} mt={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="caption" fontWeight="italic">
            Dodano: {decodeTimeStamp(addedAt!, DATE_TYPE.DATE_TIME)}
          </Typography>
        </Box>

        <Typography variant="h6" fontStyle="italic" gutterBottom>
          {director}
        </Typography>
        <Chip label={genre} sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {actors.map((actor, index) => (
            <Chip key={index} label={actor} variant="outlined" sx={{ mx: 1 }} />
          ))}
        </Box>

        <Typography
          sx={{ fontStyle: 'italic' }}
          variant="body2"
          color="text.secondary"
          gutterBottom
        >
          {`"${description}"`}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" color="text.secondary">
            Długość: {length}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Data wydania: {decodeTimeStamp(releasedAt, DATE_TYPE.DATE)}
          </Typography>
        </Box>
        <Rating value={rate} max={10} readOnly />
        <Button variant="contained">Wypożycz</Button>
      </Stack>
    </Box>
  );
};

export default VideoPage;
