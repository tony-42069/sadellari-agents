import { NextResponse } from 'next/server';

interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  status: 'initialized' | 'running' | 'stopped';
}

export async function GET() {
  const agents: Agent[] = [
    {
      id: 'ceo',
      name: 'CEO Agent',
      description: 'Strategic leader responsible for high-level decisions and coordinating other agents.',
      avatar: '/ceo-agent.png',
      status: 'initialized',
    },
    {
      id: 'cfo',
      name: 'CFO Agent',
      description: 'Handles financial oversight, budgeting, and analysis.',
      avatar: '/cfo-agent.png',
      status: 'initialized',
    },
    {
      id: 'cto',
      name: 'CTO Agent',
      description: 'Oversees technology strategy and infrastructure.',
      avatar: '/cto-agent.png',
      status: 'initialized',
    },
    {
      id: 'clo',
      name: 'CLO Agent',
      description: 'Manages compliance, legal risks, and regulatory matters.',
      avatar: '/clo-agent.png',
      status: 'initialized',
    },
  ];
  return NextResponse.json({ agents });
}
