import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { videoModel } from '@/lib/mongo/models';
import { NextResponse } from 'next/server';
import { ApiResponse } from '@/interfaces';

export const GET = async (req: NextResponse) => {
  try {
    await dbConnect();

    const data = await videoModel.find({});

    // console.log(data);

    return NextResponse.json({
      info: 'Data loaded successful',
      data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json<ApiResponse>({
      data: null,
      info: (error as Error).message,
    });
  } finally {
    await dbDisconnect();
  }
};
