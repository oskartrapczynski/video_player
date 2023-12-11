import axios from 'axios';
import { dbConnect, dbDisconnect } from '@/lib/mongo';
import { userModel } from '@/lib/mongo/models';
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse, User } from '@/interfaces';
import { USER_ROLE } from '@/constants/index';

export const POST = async (req: NextRequest) => {
  try {
    const body: User | User[] = await req.json();
    if (!body) throw new Error('Missing Body');

    console.log(body);

    let processedData: User | User[];

    await dbConnect();

    if (Array.isArray(body)) {
      processedData = body.map((item) => ({
        ...item,
        registerAt: item.registerAt ? item.registerAt : Date.now(),
        role: item.role ? item.role : USER_ROLE.USER,
        // isAvailable: item.isAvailable ? 1 : 0,
      }));
      await userModel.insertMany(processedData);
    } else {
      processedData = {
        ...body,
        registerAt: body.registerAt ? body.registerAt : Date.now(),
        role: body.role ? body.role : USER_ROLE.USER,
        // isAvailable: body.isAvailable ? 1 : 0,
      };
      await userModel.insertMany(processedData);
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
