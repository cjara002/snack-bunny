// hooks/useSnackEvents.ts
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FEATURES } from '@/lib/features';

type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

export function useSnackEvents() {
  const [events, setEvents] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');

  // On mount: detect auth state and load events
  useEffect(() => {
    async function load() {
      if (!FEATURES.AUTH_ENABLED) {
        // localStorage only
        const raw = localStorage.getItem('snack_events') || '[]';
        setEvents(JSON.parse(raw));
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      if (user) {
        // Migrate local data on first sign-in if Supabase is empty
        const alreadyMigrated = localStorage.getItem('sb_migrated');
        if (!alreadyMigrated) {
          const local: number[] = JSON.parse(localStorage.getItem('snack_events') || '[]');
          if (local.length > 0) {
            const rows = local.map(ts => ({
              user_id: user.id,
              created_at: new Date(ts).toISOString(),
            }));
            await supabase.from('snack_events').insert(rows);
          }
          localStorage.setItem('sb_migrated', 'true');
        }

        // Cloud is truth
        const { data } = await supabase
          .from('snack_events')
          .select('created_at')
          .order('created_at', { ascending: false });
        const timestamps = (data ?? []).map(d => new Date(d.created_at).getTime());
        setEvents(timestamps);
        localStorage.setItem('snack_events', JSON.stringify(timestamps));
      } else {
        // Anonymous: localStorage only
        const raw = localStorage.getItem('snack_events') || '[]';
        setEvents(JSON.parse(raw));
      }
      setLoading(false);
    }
    load();
  }, []);

  const addEvent = useCallback(async () => {
    const now = Date.now();
    // Optimistic update
    setEvents(prev => [now, ...prev]);

    if (FEATURES.AUTH_ENABLED && userId) {
      const syncTimer = setTimeout(() => setSyncStatus('syncing'), 100);
      const supabase = createClient();
      const { error } = await supabase
        .from('snack_events')
        .insert({ user_id: userId });
      clearTimeout(syncTimer);
      if (error) {
        queueOfflineEvent(now);
        setSyncStatus('error');
        setTimeout(() => setSyncStatus('idle'), 4000);
      } else {
        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 1500);
      }
    }
    // Always update localStorage (cache for offline + anonymous)
    const updated = [now, ...events];
    localStorage.setItem('snack_events', JSON.stringify(updated));
  }, [userId, events]);

  const removeLastEvent = useCallback(async () => {
    if (events.length === 0) return;
    setEvents(prev => prev.slice(1));

    if (FEATURES.AUTH_ENABLED && userId) {
      const supabase = createClient();
      const { data } = await supabase
        .from('snack_events')
        .select('id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (data) {
        await supabase.from('snack_events').delete().eq('id', data.id);
      }
    }
    const updated = events.slice(1);
    localStorage.setItem('snack_events', JSON.stringify(updated));
  }, [userId, events]);

  return { events, loading, userId, syncStatus, addEvent, removeLastEvent };
}

function queueOfflineEvent(timestamp: number) {
  const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
  queue.push(timestamp);
  localStorage.setItem('offlineQueue', JSON.stringify(queue));
}