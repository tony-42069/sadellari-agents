'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export default function ConversationPage() {
  const { conversationId } = useParams();
  // Ensure a single string ID for params
  const convId = Array.isArray(conversationId) ? conversationId[0] : conversationId ?? '';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await fetch(`/api/messages/${convId}`);
        if (!res.ok) throw new Error('Failed to fetch messages');
        const data = await res.json();
        setMessages(data.messages);
      } catch (e) {
        console.error(e);
      }
    }
    loadMessages();
  }, [convId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch(`/api/messages/${convId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      const result = await res.json();
      setMessages(prev => [...prev, result.message]);
      setInput('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mx-auto h-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
          <div className="flex items-center px-6 py-4 border-b">
            <h2 className="text-2xl font-semibold text-gray-800 uppercase">
              Chat with {convId}
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`max-w-[60%] p-4 rounded-2xl shadow ${
                  msg.sender === 'user'
                    ? 'self-end bg-indigo-600 text-white'
                    : 'self-start bg-white text-gray-900 border border-gray-200'
                }`}
              >
                <p className="text-base">{msg.text}</p>
                <p className="text-xs text-gray-500 mt-2 text-right">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="px-6 py-4 bg-white border-t">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                className="flex-1 p-3 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
