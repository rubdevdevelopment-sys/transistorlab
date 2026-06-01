import { NextRequest, NextResponse } from 'next/server';

const sheetsApiUrl = process.env.GOOGLE_SHEETS_API_URL ?? '';

if (!sheetsApiUrl) {
  throw new Error('Missing GOOGLE_SHEETS_API_URL environment variable');
}

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get('limit') || '10';
  const url = `${sheetsApiUrl}?action=leaderboard&limit=${encodeURIComponent(limit)}`;
  const response = await fetch(url);
  const data = await response.json();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const payload = { ...body, action: 'save' };
  const response = await fetch(sheetsApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
