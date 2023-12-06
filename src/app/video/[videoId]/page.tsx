import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { videoModel } from '@/lib/mongo/models';
import { mongoId } from '@/utils';
import React from 'react';
import { Types } from 'mongoose';
import { VideoCard, VideoPage } from '@/components';
import { Alert } from '@mui/material';

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

const VideoPageById = async ({ params: { videoId } }: Params) => {
  const data = videoId ? await getDataVideo(videoId) : null;
  const video = data ? JSON.parse(data) : null;
  return !video ? (
    <Alert severity="error">Nie załadowano</Alert>
  ) : (
    <VideoPage {...video[0]} />
  );
};

export default VideoPageById;
