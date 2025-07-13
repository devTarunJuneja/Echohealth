import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
  if (error) console.error(error);
  else setUser(data.session?.user || null);
});

    
   const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
  setUser(session?.user || null);


    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return { user };
}
