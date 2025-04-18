import Link from 'next/link';
import Image from 'next/image';

// Server component fetching agents list
async function getAgents() {
  const res = await fetch('http://localhost:3000/api/agents', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch agents');
  return res.json();
}

export default async function Sidebar() {
  const { agents } = await getAgents();
  return (
    <aside className="w-64 bg-white border-r p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Agents</h2>
      <ul className="space-y-2">
        {agents.map((agent: any) => (
          <li key={agent.id}>
            <Link href={`/?agent=${agent.id}`} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
              <Image
                src={agent.avatar}
                width={32}
                height={32}
                alt={agent.name}
                className="rounded-full"
              />
              <span className="text-gray-800">{agent.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
