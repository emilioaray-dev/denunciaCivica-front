import { NextResponse } from 'next/server';
import { MOCK_STATS } from '@/lib/mock-data';

export async function GET() {
  return NextResponse.json({ data: MOCK_STATS });
}
