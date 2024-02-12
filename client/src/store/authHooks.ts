import { useAuthStore } from './authStore';

export function useCurrentUser() {
  const { isAuthenticated, user } = useAuthStore();

  return { isAuthenticated, user };
}
