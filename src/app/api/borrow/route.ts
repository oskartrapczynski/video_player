import { ApiResponse } from '@/interfaces/index';
import dbConnect from '@/lib/mongo/dbConnect';
import dbDisconnect from '@/lib/mongo/dbDisconnect';
import borrowModel from '@/lib/mongo/models/borrow';
import userModel from '@/lib/mongo/models/user';
import videoModel from '@/lib/mongo/models/video';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    if (!body || !body.userId || !body.videoId) throw new Error('Missing Body');

    const { userId, videoId } = body;

    await dbConnect();

    await videoModel.updateOne({ _id: videoId }, { isAvailable: false });

    const timestamp = Date.now();

    await borrowModel.insertMany({
      userId,
      videoId,
      borrowDate: timestamp,
      expectedBorrowDate: timestamp + 172800000,
    });

    const { modifiedCount } = await userModel.updateOne(
      {
        _id: userId,
      },
      { ...body }
    );
    if (!modifiedCount) throw new Error('Użytkownik został już zmodyfikowany');

    return NextResponse.json<ApiResponse>({
      info: 'Pomyślnie wypożyczono',
      data: null,
      type: 'success',
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
