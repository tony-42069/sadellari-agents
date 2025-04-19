import { NextResponse } from 'next/server';

interface Message {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  timestamp: string;
}

// In-memory store for global messages (non-persistent)
const globalMessages: Message[] = [];

export async function GET() {
  return NextResponse.json({ messages: globalMessages });
}

export async function POST(request: Request) {
  const body = await request.json();
  const newMsg: Message = {
    id: Date.now().toString(),
    author: body.author || 'user',
    avatar: body.avatar,
    text: body.text,
    timestamp: new Date().toISOString(),
  };
  globalMessages.push(newMsg);
  return NextResponse.json({ message: newMsg });
}
