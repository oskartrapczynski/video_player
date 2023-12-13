'use client';

import { VideoProfile } from '@/components/index';
import { Alert } from '@mui/material';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserPageId = () => {
  const [data, setData] = useState<any | null>(null);
  const params = useParams();

  const fetchData = async () => {
    if (!params || !params.userId) setData(null);
    const { data } = await axios.get(`/api/user/${params.userId}`);
    if (!data || !data.data || data.data.length === 0) setData(null);

    const processedData = data.data.borrowData.map((borrow: any) => {
      const videoBorrow = data.data.videoData.map(
        ({ _id, title, director }: any, index: number) => {
          if (String(borrow.videoId) === String(_id)) {
            data.data.videoData.splice(index, 1);

            return { title, director };
          }
          return null;
        }
      );
      return {
        ...borrow,
        ...videoBorrow[0],
      };
    });

    console.log(processedData);

    setData(processedData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(params);

  return (
    <>
      <VideoProfile data={data} />
    </>
  );
};

export default UserPageId;
