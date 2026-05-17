import { createClient } from '@/lib/supabase/client';
import { track } from '@vercel/analytics';

export async function signOut(): Promise<{ error: Error | null }> {
  track('user_signed_out');

  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error };
  }

  return { error: null };
}
