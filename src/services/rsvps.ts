import { api, unwrapEnvelope } from './api';
import { RSVPResponse, RsvpCreatePayload } from '../types';

function toRsvpArray(payload: unknown): RSVPResponse[] {
  const body = unwrapEnvelope(payload);
  if (Array.isArray(body)) return body as RSVPResponse[];
  throw new Error('Unexpected GET /rsvps response shape');
}

function toRsvp(payload: unknown): RSVPResponse {
  const body = unwrapEnvelope(payload);
  if (body && typeof body === 'object' && 'id' in body) return body as RSVPResponse;
  throw new Error('Unexpected POST /rsvps response shape');
}

/**
 * RSVP microservice client. Guests create entries one at a time from the
 * public invitation page; the owner lists and moderates them from the
 * dashboard — there is no bulk save.
 */
export const rsvpService = {
  /** All RSVP entries of the signed-in owner's invitation. */
  async list(): Promise<RSVPResponse[]> {
    const { data } = await api.get<unknown>('/rsvps');
    return toRsvpArray(data);
  },

  /** Submit one guest response; resolves with the server-issued record. */
  async create(payload: RsvpCreatePayload): Promise<RSVPResponse> {
    const { data } = await api.post<unknown>('/rsvps', payload);
    return toRsvp(data);
  },

  /** Remove a single entry (owner moderation). */
  async remove(id: string): Promise<void> {
    await api.delete(`/rsvps/${id}`);
  }
};
