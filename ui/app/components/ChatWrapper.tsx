'use client';

import { useState, useEffect } from 'react';
import GlobalChatPanel from './GlobalChatPanel';
import { ReactNode } from 'react';

export default function ChatWrapper({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsChatOpen(true);
    window.addEventListener('openGlobalChat', handler);
    return () => window.removeEventListener('openGlobalChat', handler);
  }, []);

  return (
    <main className="flex-1 relative overflow-auto p-8">
      {children}
      <GlobalChatPanel visible={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}
