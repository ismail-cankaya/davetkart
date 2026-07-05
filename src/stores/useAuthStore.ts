import { create } from 'zustand';
import { AuthUser, LoginCredentials, RegisterPayload } from '../types';
import { authService } from '../services/auth';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  /** Authenticate against the Auth service; resolves with the signed-in user. */
  login: (credentials: LoginCredentials) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (credentials) => {
    const session = await authService.login(credentials);
    authService.persistSession(session);
    set({ user: session.user, token: session.token, isAuthenticated: true });
    return session.user;
  },

  register: async (payload) => {
    const session = await authService.register(payload);
    authService.persistSession(session);
    set({ user: session.user, token: session.token, isAuthenticated: true });
    return session.user;
  },

  logout: () => {
    authService.clearSession();
    set({ user: null, token: null, isAuthenticated: false });
  }
}));

// Re-hydrate a cached session synchronously so protected routes and the
// header render the correct auth state on first paint.
const cached = authService.restoreSession();
if (cached) {
  useAuthStore.setState({ user: cached.user, token: cached.token, isAuthenticated: true });
}
