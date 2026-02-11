import { NextRequest, NextResponse } from 'next/server';
import { MOCK_USERS } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  // Mock auth: use ?role=moderator|communicator|admin query param to simulate login
  const role = request.nextUrl.searchParams.get('role');

  if (role && MOCK_USERS[role]) {
    return NextResponse.json({ data: MOCK_USERS[role] });
  }

  // Default: not authenticated
  return NextResponse.json(
    { errors: [{ code: 'UNAUTHORIZED', message: 'No autenticado' }] },
    { status: 401 },
  );
}
