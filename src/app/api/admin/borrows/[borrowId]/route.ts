import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { borrowModel, videoModel } from '@/lib/mongo/models';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/interfaces';

interface Params {
  params: {
    borrowId: string | null;
  };
}

export const GET = async (
  req: NextRequest,
  { params: { borrowId } }: Params
) => {
  try {
    if (!borrowId) throw new Error('Missing ID');
    await dbConnect();

    const borrowData = await borrowModel.find({ _id: borrowId });

    const newBorrow = { ...borrowData, realBorrowDate: Date.now() };

    await videoModel.updateOne(
      { _id: borrowData[0].videoId },
      { isAvailable: true }
    );

    const { modifiedCount } = await borrowModel.updateOne(
      {
        _id: borrowId,
      },
      { ...newBorrow }
    );
    if (!modifiedCount)
      throw new Error('Wypożyczenie zostało już zmodyfikowane');

    return NextResponse.json<ApiResponse>({
      info: 'Wypożyczenie pomyślnie zmodyfikowane',
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

export const DELETE = async (req: NextRequest, { params }: Params) => {
  try {
    if (!params || !params.borrowId) throw new Error('Missing ID');
    if (!req.nextUrl.searchParams || !req.nextUrl.searchParams.get('videoId'))
      throw new Error('Missing videoId');

    const { borrowId } = params;
    const videoId = req.nextUrl.searchParams.get('videoId');

    await dbConnect();

    await videoModel.updateOne({ _id: videoId }, { isAvailable: true });

    const { deletedCount } = await borrowModel.deleteOne(
      {
        _id: borrowId,
      },
      { isAvailable: true }
    );
    if (!deletedCount) throw new Error('Wypożyczenie zostało już usunięte');

    return NextResponse.json<ApiResponse>({
      info: 'Wypożyczenie pomyślnie usunięte',
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
