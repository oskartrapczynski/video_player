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
import Link from 'next/link';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface Props {
  colorCard: string;
}

const VideoCard = ({
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
  colorCard,
  isAvailable,
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
        backgroundColor: isAvailable ? colorCard : '#aaa',
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
              {`Długość: ${length}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {`Data wydania: ${decodeTimeStamp(releasedAt, DATE_TYPE.DATE)}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {'Dostępność:'}
              {isAvailable ? (
                <CheckCircleOutlineIcon color="success" />
              ) : (
                <HighlightOffIcon color="error" />
              )}
            </Typography>
          </Box>
          <Rating value={rate} max={10} readOnly />
        </Stack>
      </CardContent>
      <CardActions>
        <Link href={`/video/${_id}`}>
          <Button variant="outlined" size="small">
            Czytaj więcej
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default VideoCard;
