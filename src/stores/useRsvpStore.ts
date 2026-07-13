import { create } from 'zustand';
import { RSVPResponse, RsvpCreatePayload, RsvpDraft } from '../types';
import { INITIAL_RSVP_DRAFT } from '../data';
import { persistenceService } from '../services/persistence';
import { mediaService } from '../services/media';

interface RsvpState {
  rsvpList: RSVPResponse[];
  /** True while GET /rsvps is in flight. */
  isLoading: boolean;
  /** The last fetch failed — the panel offers a retry. */
  remoteError: boolean;
  /** The RSVP form currently being composed by a guest. */
  draft: RsvpDraft;
  /** Load the owner's RSVP list from the backend. */
  fetchRsvps: () => Promise<void>;
  updateDraft: (patch: Partial<RsvpDraft>) => void;
  /** Upload a photo/video through the media boundary and attach its URL to the draft. */
  attachDraftMedia: (field: 'photoUrl' | 'videoUrl', file: File) => Promise<void>;
  /**
   * Validate and submit the draft to the backend as a new RSVP entry.
   * Resolves with the server-issued entry, or null when the draft is invalid.
   * Network/API failures reject — the calling form surfaces them.
   */
  submitDraft: () => Promise<RSVPResponse | null>;
  /**
   * Optimistically remove an entry, then confirm with the backend; the entry
   * is restored (and the error re-thrown) if the delete is rejected.
   */
  deleteRsvp: (id: string) => Promise<void>;
}

export const useRsvpStore = create<RsvpState>()((set, get) => ({
  rsvpList: [],
  isLoading: false,
  remoteError: false,
  draft: INITIAL_RSVP_DRAFT,

  fetchRsvps: async () => {
    set({ isLoading: true });
    try {
      const rsvps = await persistenceService.listRsvps();
      set({ rsvpList: rsvps, remoteError: false, isLoading: false });
    } catch {
      set({ remoteError: true, isLoading: false });
    }
  },

  updateDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),

  attachDraftMedia: async (field, file) => {
    const url = await mediaService.upload(file);
    set((state) => ({ draft: { ...state.draft, [field]: url } }));
  },

  submitDraft: async () => {
    const { draft } = get();
    if (!draft.guestName.trim()) return null;

    const payload: RsvpCreatePayload = {
      guestName: draft.guestName.trim(),
      guestCount: Number(draft.guestCount),
      menuPreference: draft.menuPreference,
      status: draft.status,
      message: draft.message || undefined,
      photoUrl: draft.photoUrl || undefined,
      videoUrl: draft.videoUrl || undefined
    };

    const entry = await persistenceService.createRsvp(payload);
    set((state) => ({ rsvpList: [entry, ...state.rsvpList], draft: INITIAL_RSVP_DRAFT }));
    return entry;
  },

  deleteRsvp: async (id) => {
    const previous = get().rsvpList;
    set({ rsvpList: previous.filter((r) => r.id !== id) });
    try {
      await persistenceService.deleteRsvp(id);
    } catch (error) {
      set({ rsvpList: previous });
      throw error;
    }
  }
}));
