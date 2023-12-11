import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { userModel } from '@/lib/mongo/models';
import { NextResponse } from 'next/server';
import { ApiResponse } from '@/interfaces';

export const GET = async (req: NextResponse) => {
  try {
    await dbConnect();

    const data = await userModel.find({});

    // console.log(data);

    return NextResponse.json<ApiResponse>({
      info: 'Data loaded successful',
      data,
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
    await dbDisconnect();
  }
};
