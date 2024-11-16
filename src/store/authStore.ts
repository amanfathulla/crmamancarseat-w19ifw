import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../services/supabase';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  session: any | null;
  login: (username: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  setSession: (session: any) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      session: null,
      login: async (username: string, password: string) => {
        // Check for specific admin credentials
        if (username === 'amanmuhsin' && password === 'Acslegacy@92') {
          set({
            isAuthenticated: true,
            user: username,
            session: { user: username, role: 'admin' }
          });
          return { error: null };
        }

        return { error: { message: 'Invalid credentials' } };
      },
      logout: async () => {
        set({ isAuthenticated: false, user: null, session: null });
      },
      setSession: (session) => {
        set({
          isAuthenticated: !!session,
          user: session?.user || null,
          session,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);