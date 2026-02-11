import { NextResponse } from 'next/server';
import { MOCK_CASE_DETAILS, MOCK_CASES } from '@/lib/mock-data';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const detail = MOCK_CASE_DETAILS[id];
  if (detail) {
    return NextResponse.json({ data: detail });
  }

  const publicCase = MOCK_CASES.find((c) => c.id === id);
  if (publicCase) {
    return NextResponse.json({
      data: {
        ...publicCase,
        circumstances: publicCase.summary,
        createdAt: publicCase.publishedAt,
        timeline: [
          { event: 'Denuncia recibida', date: publicCase.publishedAt, type: 'info' },
          { event: 'Caso verificado y publicado', date: publicCase.publishedAt, type: 'success' },
        ],
      },
    });
  }

  return NextResponse.json(
    { errors: [{ code: 'NOT_FOUND', message: 'Caso no encontrado' }] },
    { status: 404 },
  );
}
