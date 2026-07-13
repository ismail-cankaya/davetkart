import { useCallback, useEffect, useState } from 'react';
import { invitationService } from '../services/invitations';
import { InvitationRecord } from '../types';

export interface DashboardData {
  /** Remote records with status 'published' — live at /invite/:id. */
  published: InvitationRecord[];
  /** Remote records saved to the account but not yet published. */
  saved: InvitationRecord[];
  isLoading: boolean;
  /** Backend unreachable — the library can't be listed right now. */
  remoteError: boolean;
  refresh: () => void;
}

/**
 * Loads the member dashboard's invitation library from the Invitation
 * service. The backend keeps one invitation per account (GET /api/invitations
 * returns a single record or null), so at most one of the two lists holds a
 * record — the array shape keeps the card grid's rendering contract stable
 * and leaves room for a multi-invitation plan later.
 */
export function useDashboardData(): DashboardData {
  const [record, setRecord] = useState<InvitationRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [remoteError, setRemoteError] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      setRecord(await invitationService.get());
      setRemoteError(false);
    } catch {
      setRecord(null);
      setRemoteError(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    published: record?.status === 'published' ? [record] : [],
    saved: record?.status === 'saved' ? [record] : [],
    isLoading,
    remoteError,
    refresh: () => void load()
  };
}
