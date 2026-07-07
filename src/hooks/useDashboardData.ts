import { useCallback, useEffect, useState } from 'react';
import { invitationService } from '../services/invitations';
import { persistenceService } from '../services/persistence';
import { Invitation, InvitationRecord } from '../types';

export interface DashboardData {
  /** Remote records with status 'published' — live at /invite/:id. */
  published: InvitationRecord[];
  /** Remote records saved to the account but not yet published. */
  saved: InvitationRecord[];
  /** The in-browser draft (persistence boundary) not yet on the backend. */
  localDraft: Invitation | null;
  isLoading: boolean;
  /** Backend unreachable — remote lists are empty but local drafts still render. */
  remoteError: boolean;
  refresh: () => void;
}

/**
 * Aggregates the member dashboard's three sources: published and saved
 * invitations from the Invitation service (GET /api/invitations) plus the
 * local draft the persistence boundary keeps in the browser. The two reads
 * run in parallel and fail independently, so a backend outage only degrades
 * the remote lists — the local draft always renders.
 */
export function useDashboardData(): DashboardData {
  const [records, setRecords] = useState<InvitationRecord[]>([]);
  const [localDraft, setLocalDraft] = useState<Invitation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [remoteError, setRemoteError] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    const [remote, draft] = await Promise.allSettled([
      invitationService.list(),
      persistenceService.getInvitation()
    ]);
    // Belt and braces: the service normalizes the payload, but state must
    // never hold a non-array — .filter below would crash the whole page.
    const remoteOk = remote.status === 'fulfilled' && Array.isArray(remote.value);
    setRecords(remoteOk ? remote.value : []);
    setRemoteError(!remoteOk);
    setLocalDraft(draft.status === 'fulfilled' ? draft.value : null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    published: records.filter((r) => r.status === 'published'),
    saved: records.filter((r) => r.status === 'saved'),
    localDraft,
    isLoading,
    remoteError,
    refresh: () => void load()
  };
}
