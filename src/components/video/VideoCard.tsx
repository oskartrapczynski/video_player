'use client';
import { DATE_TYPE } from '@/constants/index';
import { Video } from '@/interfaces';
import { decodeTimeStamp } from '@/utils';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Chip,
  Rating,
  Box,
} from '@mui/material';
import React from 'react';

interface Props {
  colorCard: string;
}

const VideoCard = ({
  title,
  genre,
  director,
  length,
  rate,
  description,
  actors,
  releasedAt,
  addedAt,
  colorCard,
}: Video & Props) => {
  const shortDescription = !description
    ? 'Brak opisu'
    : description && description.length > 12
    ? `${description.slice(0, 50)}...`
    : `${description}...`;
  return (
    <Card
      sx={{
        maxWidth: 300,
        height: 400,
        mx: 'auto',
        backgroundColor: colorCard,
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="h6" fontStyle="italic" gutterBottom>
            {director}
          </Typography>
          <Chip label={genre} sx={{ mb: 1 }} />
          <Typography
            sx={{ fontStyle: 'italic' }}
            variant="body2"
            color="text.secondary"
            gutterBottom
          >
            {`"${shortDescription}"`}
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
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small">
          Czytaj więcej
        </Button>
      </CardActions>
    </Card>
  );
};

export default VideoCard;
