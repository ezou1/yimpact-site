import { createClient } from '@supabase/supabase-js';
import { supabaseAnonKey, supabaseUrl } from './env';

// One client for the whole application. The anon key is safe in the browser.
// Row Level Security decides what each reader gets back.
//
// detectSessionInUrl is false because there is no OAuth and no magic link.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});
