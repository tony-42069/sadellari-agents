import { NextResponse } from 'next/server';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

// In-memory store for messages (non-persistent)
const messagesStore: { [key: string]: Message[] } = {};

export async function GET(
  request: Request,
  context: { params: Promise<{ conversationId: string }> }
) {
  const { conversationId } = await context.params;
  const msgs = messagesStore[conversationId] || [];
  return NextResponse.json({ messages: msgs });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ conversationId: string }> }
) {
  const { conversationId } = await context.params;
  const body = await request.json();
  const newMsg: Message = {
    id: Date.now().toString(),
    sender: body.sender || 'user',
    text: body.text,
    timestamp: new Date().toISOString(),
  };
  if (!messagesStore[conversationId]) messagesStore[conversationId] = [];
  messagesStore[conversationId].push(newMsg);
  return NextResponse.json({ message: newMsg });
}
