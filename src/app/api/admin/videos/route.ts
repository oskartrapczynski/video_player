import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { videoModel } from '@/lib/mongo/models';
import { NextResponse } from 'next/server';
import { ApiResponse } from '@/interfaces';

export const POST = async (req: NextResponse) => {
  try {
    const body = await req.json();
    if (!body) throw new Error('Missing Body');

    await dbConnect();

    await videoModel.insertMany(body);

    return NextResponse.json({
      info: 'Data added successfull',
      data: null,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json<ApiResponse>({
      data: null,
      info: (error as Error).message,
    });
  } finally {
    dbDisconnect();
  }
};
