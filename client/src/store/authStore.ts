// authStore.ts
import create from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  user: string | null;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (username, password) => {
    // Simulating a login request (replace with actual authentication logic)
    if (username === 'demo' && password === 'password') {
      set({ isAuthenticated: true, user: username });
    } else {
      set({ isAuthenticated: false, user: null });
    }
  },
  logout: () => {
    // Simulating a logout action
    set({ isAuthenticated: false, user: null });
  },
}));
