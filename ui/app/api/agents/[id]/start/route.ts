import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(`Start request received for agent: ${id}`);
  // TODO: Wire this up to actual start logic
  return NextResponse.json({ success: true, id }, { status: 200 });
}
