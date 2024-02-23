// authStore.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthStore {
  isAuthenticated: boolean;
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => {
        // Simulating a login request (replace with actual authentication logic)
        set({ isAuthenticated: true, user });
      },
      logout: () => {
        // Simulating a logout action
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => {
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          return localStorage;
        } catch (error) {
          return sessionStorage;
        }
      }),
    }
  )
);
