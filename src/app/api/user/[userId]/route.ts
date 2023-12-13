import { ApiResponse, Video } from '@/interfaces/index';
import dbConnect from '@/lib/mongo/dbConnect';
import dbDisconnect from '@/lib/mongo/dbDisconnect';
import borrowModel from '@/lib/mongo/models/borrow';
import userModel from '@/lib/mongo/models/user';
import videoModel from '@/lib/mongo/models/video';
import { NextRequest, NextResponse } from 'next/server';
import { VariantType } from 'notistack';

interface Params {
  params: {
    userId: string | null;
  };
}

export const GET = async (req: NextRequest, { params: { userId } }: Params) => {
  try {
    let data: Video[] | null = null,
      info: string = 'Brak wypożyczeń',
      type: VariantType = 'warning';

    if (!userId) throw new Error('Missing ID');
    await dbConnect();

    const borrowData = await borrowModel.find({ userId });

    const videoIds = borrowData.map((item) => item.videoId);

    const videoData = await videoModel.find({ _id: { $in: videoIds } });

    console.log('videoData', videoData);

    if (videoData.length > 0) {
      info = 'Znaleziono wypożyczenia';
      data = videoData;
      type = 'success';
    }

    return NextResponse.json<ApiResponse>({
      info,
      data: { borrowData, videoData },
      type,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json<ApiResponse>({
      data: null,
      info: (error as Error).message,
      type: 'error',
    });
  } finally {
    dbDisconnect();
  }
};
