'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  author: string;
  avatar?: string;
  text: string;
  isAgent: boolean;
}

export default function GlobalChatPanel({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) {
      (async () => {
        try {
          const res = await fetch('/api/messages/global');
          if (res.ok) {
            const data = await res.json();
            setMessages(data.messages || []);
          }
        } catch {}
      })();
    }
  }, [visible]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      author: 'You',
      text: input,
      isAgent: false,
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    try {
      await fetch('/api/messages/global', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newMsg.text }),
      });
    } catch {}
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-indigo-50 shadow-xl transform transition-transform w-96 z-50 flex flex-col ${
        visible ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="px-4 py-3 bg-indigo-600 text-white flex items-center justify-between">
        <h2 className="text-lg font-semibold">Global Chat</h2>
        <button onClick={onClose} className="text-white hover:text-gray-200 text-xl">&times;</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start ${msg.isAgent ? 'justify-start' : 'justify-end'}`}
          >
            {msg.isAgent && (
              <Image
                src={msg.avatar || '/default-avatar.png'}
                width={32}
                height={32}
                alt={msg.author}
                className="rounded-full mr-2"
              />
            )}
            <div
              className={`p-2 rounded-lg max-w-xs break-words ${
                msg.isAgent ? 'bg-gray-100 text-gray-900' : 'bg-indigo-500 text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 bg-white text-gray-900 placeholder-gray-500 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
