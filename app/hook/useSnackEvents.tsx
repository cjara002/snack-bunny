// hooks/useSnackEvents.ts
import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { FEATURES } from '@/lib/features';

export function useSnackEvents() {
  const [events, setEvents] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // On mount: detect auth state and load events
  useEffect(() => {
    async function load() {
      if (!FEATURES.AUTH_ENABLED) {
        // localStorage only
        const raw = localStorage.getItem('snackEvents') || '[]';
        setEvents(JSON.parse(raw));
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

      if (user) {
        // Signed in: cloud is truth
        const { data } = await supabase
          .from('snack_events')
          .select('created_at')
          .order('created_at', { ascending: false });
        const timestamps = (data ?? []).map(d => new Date(d.created_at).getTime());
        setEvents(timestamps);
        // Sync local cache
        localStorage.setItem('snackEvents', JSON.stringify(timestamps));
      } else {
        // Anonymous: localStorage only
        const raw = localStorage.getItem('snackEvents') || '[]';
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
      // Save to cloud
      const supabase = createClient();
      const { error } = await supabase
        .from('snack_events')
        .insert({ user_id: userId });
      if (error) {
        // Queue for retry, keep in localStorage
        queueOfflineEvent(now);
      }
    }
    // Always update localStorage (cache for offline + anonymous)
    const updated = [now, ...events];
    localStorage.setItem('snackEvents', JSON.stringify(updated));
  }, [userId, events]);

  const removeLastEvent = useCallback(async () => {
    if (events.length === 0) return;
    const mostRecent = events[0];
    setEvents(prev => prev.slice(1));

    if (FEATURES.AUTH_ENABLED && userId) {
      const supabase = createClient();
      await supabase
        .from('snack_events')
        .delete()
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);
    }
    const updated = events.slice(1);
    localStorage.setItem('snackEvents', JSON.stringify(updated));
  }, [userId, events]);

  return { events, loading, userId, addEvent, removeLastEvent };
}

function queueOfflineEvent(timestamp: number) {
  const queue = JSON.parse(localStorage.getItem('offlineQueue') || '[]');
  queue.push(timestamp);
  localStorage.setItem('offlineQueue', JSON.stringify(queue));
}