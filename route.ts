import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // Assuming this path is correct and the module exists

export async function GET(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const planillas = await db
      .collection('planillas')
      .find({})
      .toArray();
    return NextResponse.json({ planillas });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch planillas' }, { status: 500 });
  }
}