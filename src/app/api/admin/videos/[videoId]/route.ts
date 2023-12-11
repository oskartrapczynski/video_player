import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { videoModel } from '@/lib/mongo/models';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/interfaces';

interface Params {
  params: {
    videoId: string | null;
  };
}

export const DELETE = async (
  req: NextRequest,
  { params: { videoId } }: Params
) => {
  try {
    if (!videoId) throw new Error('Missing ID');
    await dbConnect();

    const { deletedCount } = await videoModel.deleteOne({
      _id: videoId,
    });
    if (!deletedCount) throw new Error('Film został już usunięty');

    return NextResponse.json<ApiResponse>({
      info: 'Film pomyślnie usunięty',
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

export const PUT = async (
  req: NextRequest,
  { params: { videoId } }: Params
) => {
  try {
    if (!videoId) throw new Error('Missing ID');
    const body = await req.json();
    if (!body) throw new Error('Missing Body');
    await dbConnect();

    const { modifiedCount } = await videoModel.updateOne(
      {
        _id: videoId,
      },
      { ...body }
    );
    if (!modifiedCount) throw new Error('Film został już zmodyfikowany');

    return NextResponse.json<ApiResponse>({
      info: 'Film pomyślnie zmodyfikowany',
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
