import { useEffect, useState } from 'react';
import AdminSectionCard from './AdminSectionCard';
import { supabase } from '../../lib/supabaseClient';
import type { ContactMessage } from '../../types/portfolio';
import { createToast } from '../ui/ToastContainer';

const MessagesPanel = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  const loadMessages = async () => {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    const toastId = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now());
    if (error) {
      createToast.emit({ id: toastId, message: error.message, type: 'error' });
    } else {
      setMessages((data ?? []) as ContactMessage[]);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    const toastId = typeof crypto?.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now());
    if (error) {
      createToast.emit({ id: toastId, message: error.message, type: 'error' });
    } else {
      setMessages((prev) => prev.filter((message) => message.id !== id));
    }
  };

  return (
    <AdminSectionCard title="Contact messages" description="Synced with Supabase + Resend">
      <button onClick={loadMessages} className="button-secondary">
        Refresh
      </button>
      <ul className="space-y-4">
        {messages.map((message) => (
          <li key={message.id} className="rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{message.name}</p>
                <p className="text-slate-500">{message.email}</p>
              </div>
              <button onClick={() => handleDelete(message.id)} className="text-xs font-semibold text-rose-500">
                Delete
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">{message.message}</p>
          </li>
        ))}
      </ul>
    </AdminSectionCard>
  );
};

export default MessagesPanel;
