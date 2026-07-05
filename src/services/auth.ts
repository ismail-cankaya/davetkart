import { AuthSession, LoginCredentials, RegisterPayload } from '../types';

/**
 * Frontend boundary of the dedicated Auth microservice.
 *
 * The store talks only to this interface. The production adapter will call
 * the Auth service through the shared `api` client (POST /auth/login,
 * POST /auth/register); swapping it in requires no changes outside this file.
 * The shipped adapter is an offline mock so the UX flow works end-to-end
 * before the backend exists.
 */
export interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  register(payload: RegisterPayload): Promise<AuthSession>;
  /** Re-hydrate a cached session (offline support only — JWTs stay server-issued). */
  restoreSession(): AuthSession | null;
  persistSession(session: AuthSession): void;
  clearSession(): void;
}

const SESSION_KEY = 'davetkart_auth_session';

/** Fabricates an *unsigned* placeholder token. The real JWT comes from the Auth service. */
function createMockToken(email: string): string {
  const payload = { sub: email, iss: 'davetkart-mock', iat: Date.now() };
  return `mock.${btoa(JSON.stringify(payload))}`;
}

function createMockSession(fullName: string, email: string): AuthSession {
  return {
    user: { id: `usr-${Date.now()}`, fullName, email },
    token: createMockToken(email)
  };
}

/** Simulated network latency so loading states behave like production. */
const simulateLatency = () => new Promise<void>(resolve => setTimeout(resolve, 700));

const mockAuthAdapter: AuthService = {
  async login({ email }) {
    await simulateLatency();
    // The mock derives a display name from the e-mail; the real service
    // returns the stored profile.
    const fullName = email
      .split('@')[0]
      .split(/[._-]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
    return createMockSession(fullName || 'Davetkart Üyesi', email);
  },

  async register({ fullName, email }) {
    await simulateLatency();
    return createMockSession(fullName, email);
  },

  restoreSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? (JSON.parse(raw) as AuthSession) : null;
    } catch {
      return null;
    }
  },

  persistSession(session) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // Private-mode/quota failures only cost session survival across reloads.
    }
  },

  clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // Nothing actionable.
    }
  }
};

export const authService: AuthService = mockAuthAdapter;
