import { BorrowVideo } from '@/interfaces';
import { Alert, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import { VideoProfileDetails } from '..';

interface Props {
  data: BorrowVideo[];
}
const VideoProfile = ({ data }: Props) => {
  const session = useSession();
  return (
    <>
      <Typography variant="h4">{`Cześć, ${
        session.data?.user.username ? session.data?.user.username : 'Nieznajomy'
      }`}</Typography>
      {!data || data.length === 0 ? (
        <Alert severity="warning">Brak wypożyczeń</Alert>
      ) : (
        data.map((item, index) => (
          <VideoProfileDetails key={index} data={item} />
        ))
      )}
    </>
  );
};

export default VideoProfile;
