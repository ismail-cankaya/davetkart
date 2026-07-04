import { Invitation, RSVPResponse } from '../types';

/**
 * Data-access boundary for core application data (Invitation, RSVPs).
 *
 * Stores talk only to this interface, never to a storage mechanism directly.
 * Production wires an HTTP adapter here (REST/GraphQL client); the shipped
 * default is a localStorage adapter that acts as the offline/dev backend and
 * doubles as an offline cache once a real API exists.
 */
export interface PersistenceService {
  getInvitation(): Promise<Invitation | null>;
  saveInvitation(invitation: Invitation): Promise<void>;
  getRsvps(): Promise<RSVPResponse[] | null>;
  saveRsvps(rsvps: RSVPResponse[]): Promise<void>;
}

const INVITATION_KEY = 'e_davetiye_invitation';
const RSVP_KEY = 'e_davetiye_rsvps';

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    // Corrupt or inaccessible storage must never break the app — fall back to defaults.
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Quota/privacy-mode failures are non-fatal; data simply won't survive a reload.
  }
}

const localStorageAdapter: PersistenceService = {
  getInvitation: () => Promise.resolve(readJson<Invitation>(INVITATION_KEY)),
  saveInvitation: (invitation) => {
    writeJson(INVITATION_KEY, invitation);
    return Promise.resolve();
  },
  getRsvps: () => Promise.resolve(readJson<RSVPResponse[]>(RSVP_KEY)),
  saveRsvps: (rsvps) => {
    writeJson(RSVP_KEY, rsvps);
    return Promise.resolve();
  }
};

export const persistenceService: PersistenceService = localStorageAdapter;
