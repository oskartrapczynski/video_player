import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { userModel } from '@/lib/mongo/models';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/interfaces';

interface Params {
  params: {
    userId: string | null;
  };
}

export const DELETE = async (
  req: NextRequest,
  { params: { userId } }: Params
) => {
  try {
    if (!userId) throw new Error('Missing ID');
    await dbConnect();

    const { deletedCount } = await userModel.deleteOne({
      _id: userId,
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

export const PUT = async (req: NextRequest, { params: { userId } }: Params) => {
  try {
    if (!userId) throw new Error('Missing ID');
    const body = await req.json();
    if (!body) throw new Error('Missing Body');
    await dbConnect();

    const { modifiedCount } = await userModel.updateOne(
      {
        _id: userId,
      },
      { ...body }
    );
    if (!modifiedCount) throw new Error('Użytkownik został już zmodyfikowany');

    return NextResponse.json<ApiResponse>({
      info: 'Użytkownik pomyślnie zmodyfikowany',
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
