import { VideoCard } from '@/components';
import { Video } from '@/interfaces';
import { dbConnect } from '@/lib/mongo';
import { dbDisconnect } from '@/lib/mongo';
import { videoModel } from '@/lib/mongo/models';
import { Box, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { getServerSideProps } from 'next/dist/build/templates/pages';

const getVideos = async () => {
  await dbConnect();
  const data = await videoModel.find();
  await dbDisconnect();
  return JSON.stringify(data);
};

const Home = async () => {
  const data = await getVideos();
  const videos = JSON.parse(data);
  return (
    <Grid container direction="row" spacing={2} px="25px" py="10px">
      {videos.map((video: Video, index: number) => (
        <Grid item key={index} mx="auto" xs={12} sm={5} md={4} lg={3} xl={2}>
          <VideoCard
            {...video}
            colorCard={index % 2 === 0 ? '#0cebebaa' : '#29ffc6aa'}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default Home;
