'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  status: 'initialized' | 'running' | 'stopped';
}

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const skeletonCount = 8;

  useEffect(() => {
    async function fetchAgents() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/agents');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const { agents }: { agents: Agent[] } = await res.json();
        setAgents(agents);
      } catch (e: any) {
        console.error('Fetch agents error:', e);
        setError(e.message || 'Failed to fetch agents.');
      } finally {
        setLoading(false);
      }
    }
    fetchAgents();
  }, []);

  const startAgent = async (id: string) => {
    try {
      const res = await fetch(`/api/agents/${id}/start`, { method: 'POST' });
      if (!res.ok) throw new Error(`Start failed: ${res.status}`);
      setAgents(prev =>
        prev.map(agent =>
          agent.id === id ? { ...agent, status: 'running' } : agent
        )
      );
    } catch (e: any) {
      console.error('Start agent error:', e);
      setError(e.message || 'Failed to start agent.');
    }
  };

  const statusMap = {
    running: { label: 'Active', bg: 'bg-green-100', text: 'text-green-600' },
    initialized: { label: 'Ready', bg: 'bg-blue-100', text: 'text-blue-600' },
    stopped: { label: 'Offline', bg: 'bg-red-100', text: 'text-red-600' },
  } as const;

  const groupedAgents = {
    running: filteredAgents.filter(a => a.status === 'running'),
    initialized: filteredAgents.filter(a => a.status === 'initialized'),
    stopped: filteredAgents.filter(a => a.status === 'stopped'),
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-white">AgentChat</span>
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-4">
              <Link href="/" className="text-white hover:text-indigo-200">Dashboard</Link>
              <Link href="/conversations" className="text-white hover:text-indigo-200">Conversations</Link>
            </nav>
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Agents Dashboard</h1>
          <div className="relative mt-4 sm:mt-0 w-full sm:w-1/2 lg:w-1/3">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 014 4c0 .89-.3 1.71-.8 2.38l4.24 4.24a1 1 0 01-1.42 1.42l-4.24-4.24A4 4 0 118 4zm0 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search agents..."
              className="pl-12 w-full p-3 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(skeletonCount)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 mx-auto" />
                <div className="h-10 bg-gray-200 rounded-full w-full" />
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && (
          <>
            {Object.entries(groupedAgents).map(([status, sectionAgents]) => {
              if (!sectionAgents.length) return null;
              const info = statusMap[status as keyof typeof statusMap];
              return (
                <div key={status} className="mb-12">
                  <div className="sticky top-0 bg-gray-50 py-2">
                    <h2 className="text-2xl font-semibold text-gray-800 capitalize">{info.label} ({sectionAgents.length})</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                    {sectionAgents.map(agent => (
                      <div
                        key={agent.id}
                        className="relative flex flex-col bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition"
                      >
                        <span
                          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${statusMap[agent.status].bg} ${statusMap[agent.status].text}`}
                        >
                          {statusMap[agent.status].label}
                        </span>
                        <Image
                          src={agent.avatar}
                          alt={`${agent.name} avatar`}
                          width={96}
                          height={96}
                          className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
                          {agent.name}
                        </h2>
                        <p className="text-gray-600 text-center mb-6">{agent.description}</p>
                        <button
                          onClick={() => startAgent(agent.id)}
                          disabled={agent.status === 'running'}
                          className={`mt-auto py-2 font-semibold text-white rounded-full transition ${
                            agent.status === 'running'
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
                          }`}
                        >
                          {agent.status === 'running' ? 'Running...' : 'Start Agent'}
                        </button>
                        <Link
                          href={`/conversations/${agent.id}`}
                          className="mt-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-50 transition text-center"
                        >
                          Chat
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </main>
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          &copy; 2025 AgentChat. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
