'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-6">Agents Dashboard</h1>
        {loading && <p>Loading agents...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map(agent => (
              <div key={agent.id} className="bg-white p-4 rounded shadow">
                <Image
                  src={agent.avatar}
                  alt={`${agent.name} avatar`}
                  width={100}
                  height={100}
                  className="mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-center mb-2">{agent.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
                <p className="text-sm mb-4">
                  Status:{' '}
                  <span className={`font-medium ${
                    agent.status === 'running'
                      ? 'text-green-600'
                      : agent.status === 'initialized'
                      ? 'text-blue-600'
                      : 'text-red-600'
                  }`}>
                    {agent.status}
                  </span>
                </p>
                <button
                  onClick={() => startAgent(agent.id)}
                  className="block w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
                  disabled={agent.status === 'running'}
                >
                  {agent.status === 'running' ? 'Running' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
