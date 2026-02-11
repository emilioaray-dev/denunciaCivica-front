import { NextResponse } from 'next/server';
import { MOCK_TRACKING } from '@/lib/mock-data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ trackingCode: string }> },
) {
  const { trackingCode } = await params;

  const result = MOCK_TRACKING[trackingCode];
  if (!result) {
    return NextResponse.json(
      { errors: [{ code: 'NOT_FOUND', message: 'Código de seguimiento no encontrado' }] },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: result });
}
