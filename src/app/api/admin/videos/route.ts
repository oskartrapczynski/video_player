import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { videoModel } from '@/lib/mongo/models';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, Video } from '@/interfaces';

export const POST = async (req: NextRequest) => {
  try {
    const body: Video | Video[] = await req.json();
    if (!body) throw new Error('Missing Body');

    let processedData: Video | Video[];

    await dbConnect();

    if (Array.isArray(body)) {
      processedData = body.map((item) => ({
        ...item,
        addedAt: item.addedAt ? item.addedAt : Date.now(),
        // isAvailable: item.isAvailable ? 1 : 0,
      }));
      await videoModel.insertMany(processedData);
    } else {
      processedData = {
        ...body,
        addedAt: body.addedAt ? body.addedAt : Date.now(),
        // isAvailable: body.isAvailable ? 1 : 0,
      };
      await videoModel.insertMany(processedData);
    }

    console.log(processedData);

    return NextResponse.json<ApiResponse>({
      info: 'Data added successfull',
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
