import { NextRequest, NextResponse } from 'next/server';
import { MOCK_MODERATION_QUEUE } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');

  let queue = [...MOCK_MODERATION_QUEUE];

  if (status) {
    const statuses = status.split('|');
    queue = queue.filter((item) => statuses.includes(item.status));
  }

  return NextResponse.json({
    data: queue,
    meta: {
      total: queue.length,
      hasNext: false,
    },
  });
}
