import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { borrowModel } from '@/lib/mongo/models';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, Borrow } from '@/interfaces';

export const POST = async (req: NextRequest) => {
  try {
    const body: Borrow | Borrow[] = await req.json();
    if (!body) throw new Error('Missing Body');

    let processedData: Borrow | Borrow[];

    await dbConnect();

    if (Array.isArray(body)) {
      processedData = body.map((item) => ({
        ...item,
        borrowDate: item.borrowDate ? item.borrowDate : Date.now(),
      }));
      await borrowModel.insertMany(processedData);
    } else {
      processedData = {
        ...body,
        borrowDate: body.borrowDate ? body.borrowDate : Date.now(),
      };
      await borrowModel.insertMany(processedData);
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
