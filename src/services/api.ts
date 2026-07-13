import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

/**
 * Shared HTTP client for the DavetKart microservices gateway.
 *
 * Every feature service (invitations, RSVPs, AI generation proxy…) must go
 * through this instance so JWT injection and session handling stay in one
 * place. AI prompts are also sent through here — the backend proxies Google
 * GenAI; secret keys never live in the frontend.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' }
});

// Attach the JWT of the active session to every outgoing request.
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Laravel API Resources wrap payloads in a `{ data: ... }` envelope; plain
 * controller responses don't. Feature services normalize through this helper
 * so both shapes are accepted.
 */
export function unwrapEnvelope(payload: unknown): unknown {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: unknown }).data;
  }
  return payload;
}

// A 401 means the token was rejected/expired: drop the local session so the
// UI falls back to the anonymous experience instead of looping on failures.
api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);
