import axios from 'axios';
import { api, unwrapEnvelope } from './api';
import { Invitation, InvitationRecord } from '../types';

/**
 * The backend keeps exactly one invitation per account, so `GET /invitations`
 * returns a single InvitationResource (or null before the first save) — never
 * an array. A misrouted request can even yield HTML from the SPA fallback;
 * anything that isn't a record or empty is treated as a failed request so
 * callers show their "backend unreachable" state instead of crashing.
 */
function toRecordOrNull(payload: unknown): InvitationRecord | null {
  const body = unwrapEnvelope(payload);
  if (body == null || body === '') return null;
  if (typeof body === 'object' && 'id' in body) return body as InvitationRecord;
  throw new Error('Unexpected /invitations response shape');
}

/** Invitation microservice client — the account's single invitation record. */
export const invitationService = {
  /** The signed-in user's invitation, or null when none has been saved yet. */
  async get(): Promise<InvitationRecord | null> {
    try {
      const { data } = await api.get<unknown>('/invitations');
      return toRecordOrNull(data);
    } catch (error) {
      // Some controllers signal "no invitation yet" as 404 — that's an empty
      // account, not an outage.
      if (axios.isAxiosError(error) && error.response?.status === 404) return null;
      throw error;
    }
  },

  /** Create-or-update (upsert) the account's invitation design. */
  async save(invitation: Invitation): Promise<InvitationRecord | null> {
    const { data } = await api.post<unknown>('/invitations', { invitation });
    return toRecordOrNull(data);
  }
};
