import { NextRequest, NextResponse } from 'next/server';
import { MOCK_CASES } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  const sort = searchParams.get('sort') || 'recent';

  let filtered = [...MOCK_CASES];

  if (category) {
    filtered = filtered.filter((c) => c.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.detaineeName.toLowerCase().includes(q) ||
        c.detentionLocation.toLowerCase().includes(q) ||
        c.residenceCity.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q),
    );
  }

  if (sort === 'support') {
    filtered.sort((a, b) => b.supportCount - a.supportCount);
  } else {
    filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  const data = filtered.slice(0, limit);

  return NextResponse.json({
    data,
    meta: {
      total: filtered.length,
      hasNext: filtered.length > limit,
    },
  });
}

export async function POST() {
  const trackingCode = `DC-2026-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;

  return NextResponse.json(
    {
      data: {
        trackingCode,
        message:
          'Su denuncia ha sido recibida exitosamente. Guarde su código de seguimiento para consultar el estado.',
        createdAt: new Date().toISOString(),
      },
    },
    { status: 201 },
  );
}
