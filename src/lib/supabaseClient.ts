import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials are missing. Please update your .env file. The app will use fallback data.');
}

// Create a dummy client if credentials are missing to prevent crashes
const createDummyClient = () => {
  const dummyQuery = {
    maybeSingle: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
    order: () => ({ data: null, error: { message: 'Supabase not configured' } })
  };
  
  return {
    from: () => ({
      select: () => dummyQuery,
      order: () => dummyQuery
    }),
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  } as any;
};

export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : createDummyClient();
