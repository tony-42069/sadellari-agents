'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Agent {
  id: string;
  name: string;
  avatar: string;
}

export default function Sidebar() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await fetch('/api/agents');
        if (!res.ok) throw new Error('Failed to fetch agents');
        const data = await res.json();
        setAgents(data.agents);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAgents();
  }, []);

  if (loading) {
    return <aside className="w-64 p-4">Loading agents…</aside>;
  }

  if (error) {
    return <aside className="w-64 p-4 text-red-600">Error: {error}</aside>;
  }

  return (
    <aside className="w-64 bg-indigo-700 text-white flex flex-col overflow-auto">
      <div className="mb-6 flex items-center justify-center py-4 border-b border-indigo-600">
        <span className="text-2xl font-bold">AgentChat</span>
      </div>
      <ul className="space-y-2">
        {agents.map(agent => (
          <li key={agent.id}>
            <Link
              href={`/conversations/${agent.id}`}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 ${pathname.includes(agent.id) ? 'bg-indigo-800' : 'hover:bg-indigo-600'}`}
            >
              <Image src={agent.avatar} width={32} height={32} alt={agent.name} className="rounded-full" />
              <span className="text-white font-medium">{agent.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
