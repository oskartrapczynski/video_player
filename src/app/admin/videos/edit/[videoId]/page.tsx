import { BackButton, VideoAdd } from '@/components';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { videoModel } from '@/lib/mongo/models';
import { mongoId } from '@/utils';
import { Alert, Box } from '@mui/material';
import React from 'react';

interface Params {
  params: {
    videoId: string | null;
  };
}

export const getDataVideo = async (id: string) => {
  await dbConnect();
  const data = await videoModel.find({ _id: mongoId(id) });
  await dbDisconnect();
  return data ? JSON.stringify(data) : null;
};

const EditPage = async ({ params: { videoId } }: Params) => {
  const data = videoId ? await getDataVideo(videoId) : null;
  const video = data ? JSON.parse(data) : null;
  return !video ? (
    <Alert severity="error">Nie załadowano</Alert>
  ) : (
    <Box sx={{ p: 2 }}>
      <BackButton />
      <VideoAdd data={video[0]} method="update" />
    </Box>
  );
};

export default EditPage;
