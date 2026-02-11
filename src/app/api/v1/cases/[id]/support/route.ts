import { NextResponse } from 'next/server';
import { MOCK_CASES } from '@/lib/mock-data';

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const caseItem = MOCK_CASES.find((c) => c.id === id);
  if (!caseItem) {
    return NextResponse.json(
      { errors: [{ code: 'NOT_FOUND', message: 'Caso no encontrado' }] },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      data: {
        supportCount: caseItem.supportCount + 1,
        supported: true,
      },
    },
    { status: 201 },
  );
}
