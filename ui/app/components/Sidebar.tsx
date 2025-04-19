'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: string;
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
    return <aside className="w-80 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white flex flex-col h-screen border-r border-indigo-600">Loading agents…</aside>;
  }

  if (error) {
    return <aside className="w-80 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white flex flex-col h-screen border-r border-indigo-600 text-red-600">Error: {error}</aside>;
  }

  return (
    <aside className="w-80 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white flex flex-col h-screen border-r border-indigo-600">
      <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-700">
        <span className="text-2xl font-bold">AgentChat</span>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
      <nav className="flex-1 px-6 py-6 overflow-y-auto">
        <ul className="space-y-4">
          <li>
            <Link
              href="/"
              className={`relative flex items-center px-6 py-3 rounded-lg transition-colors ${pathname === '/' ? 'bg-indigo-600 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white' : 'hover:bg-indigo-600'}`}
            >
              <span className="ml-4 text-lg font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/conversations"
              className={`relative flex items-center px-6 py-3 rounded-lg transition-colors ${pathname.startsWith('/conversations') && !pathname.includes('[') ? 'bg-indigo-600 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white' : 'hover:bg-indigo-600'}`}
            >
              <span className="ml-4 text-lg font-medium">Conversations</span>
            </Link>
          </li>
          <li>
            <Link
              href="/analytics"
              className={`relative flex items-center px-6 py-3 rounded-lg transition-colors ${pathname === '/analytics' ? 'bg-indigo-600 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white' : 'hover:bg-indigo-600'}`}
            >
              <span className="ml-4 text-lg font-medium">Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={`relative flex items-center px-6 py-3 rounded-lg transition-colors ${pathname === '/settings' ? 'bg-indigo-600 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-white' : 'hover:bg-indigo-600'}`}
            >
              <span className="ml-4 text-lg font-medium">Settings</span>
            </Link>
          </li>
          <li>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openGlobalChat'))}
              className="relative flex items-center px-6 py-3 rounded-lg transition-colors hover:bg-indigo-600 w-full text-left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 16c0 1.656-1.344 3-3 3H6l-4 4V5c0-1.656 1.344-3 3-3h12c1.656 0 3 1.344 3 3v11z" />
              </svg>
              <span className="ml-4 text-lg font-medium">Global Chat</span>
            </button>
          </li>
        </ul>
        <div className="mt-8">
          <h3 className="text-sm uppercase font-semibold text-indigo-300 mb-2">Pinned Agents</h3>
          <ul className="space-y-2">
            {agents.filter(a => a.status === 'running').map(agent => (
              <li key={agent.id}>
                <Link
                  href={`/conversations/${agent.id}`}
                  className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  <Image
                    src={agent.avatar}
                    width={28}
                    height={28}
                    alt={agent.name}
                    className="rounded-full"
                  />
                  <span className="ml-3 text-base font-medium text-white">{agent.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className="px-6 py-4 text-sm text-indigo-300 border-t border-indigo-700 text-center">
        Logged in as John Doe
        <br />
        <button className="mt-2 text-indigo-400 hover:text-white text-xs">Logout</button>
      </div>
    </aside>
  );
}
