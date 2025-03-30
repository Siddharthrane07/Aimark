import { createClient } from '@supabase/supabase-js';
import { NetworkMonitor } from '../utils/networkUtils';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Enhanced debug logging
console.log('[Debug] Supabase Configuration:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  url: supabaseUrl?.substring(0, 10) + '...'
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: window.localStorage,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    },
    // Custom fetch with retry logic
    fetch: async (url, options) => {
      return NetworkMonitor.withRetry(async () => {
        const isOnline = await NetworkMonitor.checkConnection();
        if (!isOnline) {
          throw new Error('No internet connection');
        }
        return fetch(url, options);
      });
    }
  }
});

// Enhanced initialization
const initSupabase = async () => {
  try {
    await NetworkMonitor.withRetry(async () => {
      // Check connection first
      const isOnline = await NetworkMonitor.checkConnection();
      if (!isOnline) {
        throw new Error('No internet connection');
      }

      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      console.log('[Debug] Auth state:', {
        isAuthenticated: !!session,
        user: session?.user?.id
      });

      const { error: dbError } = await supabase
        .from('profiles')
        .select('count')
        .single();

      if (dbError) throw dbError;
      console.log('[Debug] Database connection successful');
    });
  } catch (error) {
    console.error('[Debug] Initialization error:', error);
  }
};

// Add connection state listeners
window.addEventListener('online', () => {
  console.log('[Network] Connection restored');
  initSupabase();
});

window.addEventListener('offline', () => {
  console.error('[Network] Connection lost');
});

// Initialize
initSupabase();

// Export connection check utility
export const checkConnection = async () => {
  return NetworkMonitor.checkConnection();
};