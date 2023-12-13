import { ApiResponse, User, Video } from '@/interfaces';
import dbConnect from '@/lib/mongo/dbConnect';
import dbDisconnect from '@/lib/mongo/dbDisconnect';
import userModel from '@/lib/mongo/models/user';
import videoModel from '@/lib/mongo/models/video';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body: User = await req.json();
    if (!body || !body.username || !body.password)
      throw new Error('Missing Body');

    const { username, password } = body;

    await dbConnect();
    const data = await userModel.findOne({ username, password });

    if (!data) throw new Error('Login failed');

    data!.password = String('*').repeat(password.length);

    return NextResponse.json<ApiResponse>({
      info: 'Login successfull',
      data: data,
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
