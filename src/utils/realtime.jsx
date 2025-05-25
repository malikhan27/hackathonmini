import { useEffect } from 'react'
import { supabase } from './config';

export default function useLoanRequestSubscription(SetuserData) {
  useEffect(() => {
    const channel = supabase
      .channel('loan-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'EVENTS',
        },
        (payload) => {
          SetuserData((prev) => {
            if (payload.eventType === "INSERT") {
              return [...prev, payload.new];
            } else if (payload.eventType === "UPDATE") {
              return prev.map((user) =>
                user.id === payload.new.id ? payload.new : user
              );
            } else if (payload.eventType === "DELETE") {
              return prev.filter((user) => user.id !== payload.old.id);
            }
            return prev;
          });
        }
      )
      .subscribe();

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [SetuserData]);
}
