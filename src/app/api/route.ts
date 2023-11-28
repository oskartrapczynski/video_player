import { type NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import dbConnect from '@/lib/mongo/mongodb';
import Videos from '@/lib/mongo/models/Videos';

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    await dbConnect();
    console.log('Connected to database');
    const data = await Videos.find();

    // await Videos.insertMany([
    //   {
    //     name: 'Napoleon',
    //     genre: ['Biograficzny', 'Dramat'],
    //     director: 'Ridley Scott',
    //     length: '2:38',
    //     rate: 6,
    //     description:
    //       'Napoleon Bonaparte pnie się po kolejnych szczeblach władzy. Towarzyszy mu przy tym ukochana Józefina.',
    //     actors: [
    //       'Joaquin Phoenix',
    //       'Vanessa Kirby',
    //       'Tahar Rahim',
    //       'Ben Miles',
    //     ],
    //     addedAt: 1701039600,
    //   },
    // ]);

    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
};
