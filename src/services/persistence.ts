import { Invitation, RSVPResponse, RsvpCreatePayload } from '../types';
import { invitationService } from './invitations';
import { rsvpService } from './rsvps';

/**
 * Data-access boundary for core application data (Invitation, RSVPs).
 *
 * Stores talk only to this interface, never to a transport directly. The
 * shipped adapter forwards to the Laravel backend through the shared `api`
 * client (via the invitation/RSVP feature services), so swapping in a
 * caching or offline adapter later only touches this file.
 */
export interface PersistenceService {
  getInvitation(): Promise<Invitation | null>;
  saveInvitation(invitation: Invitation): Promise<void>;
  listRsvps(): Promise<RSVPResponse[]>;
  createRsvp(payload: RsvpCreatePayload): Promise<RSVPResponse>;
  deleteRsvp(id: string): Promise<void>;
}

const httpAdapter: PersistenceService = {
  // The editor only cares about the design payload; record metadata
  // (id/status/updatedAt) stays a dashboard concern (see useDashboardData).
  getInvitation: async () => (await invitationService.get())?.invitation ?? null,

  saveInvitation: async (invitation) => {
    await invitationService.save(invitation);
  },

  listRsvps: () => rsvpService.list(),
  createRsvp: (payload) => rsvpService.create(payload),
  deleteRsvp: (id) => rsvpService.remove(id)
};

export const persistenceService: PersistenceService = httpAdapter;
