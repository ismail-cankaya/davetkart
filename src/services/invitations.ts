import { api } from './api';
import { InvitationRecord } from '../types';

/**
 * The Laravel backend wraps collections in an envelope ({ data: [...] });
 * a misrouted request can even yield HTML from the SPA fallback. Normalize
 * everything to a plain array and treat any other shape as a failed request
 * so the dashboard shows its "backend unreachable" state instead of crashing.
 */
function toRecordArray(payload: unknown): InvitationRecord[] {
  if (Array.isArray(payload)) return payload as InvitationRecord[];
  if (payload && typeof payload === 'object') {
    const inner = (payload as { data?: unknown }).data;
    if (Array.isArray(inner)) return inner as InvitationRecord[];
  }
  throw new Error('Unexpected GET /invitations response shape');
}

/**
 * Invitation microservice client. The dashboard aggregates these remote
 * records (published + saved) with the in-browser draft kept by the
 * persistence boundary; see hooks/useDashboardData.
 */
export const invitationService = {
  /** All invitations owned by the signed-in user. */
  async list(): Promise<InvitationRecord[]> {
    const { data } = await api.get<unknown>('/invitations');
    return toRecordArray(data);
  }
};
