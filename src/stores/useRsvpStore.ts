import { create } from 'zustand';
import { RSVPResponse, RsvpDraft } from '../types';
import { INITIAL_RSVP_DRAFT, INITIAL_RSVP_LIST } from '../data';
import { persistenceService } from '../services/persistence';
import { mediaService } from '../services/media';

interface RsvpState {
  rsvpList: RSVPResponse[];
  /** The RSVP form currently being composed by a guest. */
  draft: RsvpDraft;
  updateDraft: (patch: Partial<RsvpDraft>) => void;
  /** Upload a photo/video through the media boundary and attach its URL to the draft. */
  attachDraftMedia: (field: 'photoUrl' | 'videoUrl', file: File) => Promise<void>;
  /**
   * Validate and commit the draft as a new RSVP entry.
   * Returns the created entry, or null when the draft is invalid.
   */
  submitDraft: () => RSVPResponse | null;
  deleteRsvp: (id: string) => void;
  resetRsvps: () => void;
}

export const useRsvpStore = create<RsvpState>()((set, get) => ({
  rsvpList: INITIAL_RSVP_LIST,
  draft: INITIAL_RSVP_DRAFT,

  updateDraft: (patch) => set((state) => ({ draft: { ...state.draft, ...patch } })),

  attachDraftMedia: async (field, file) => {
    const url = await mediaService.upload(file);
    set((state) => ({ draft: { ...state.draft, [field]: url } }));
  },

  submitDraft: () => {
    const { draft } = get();
    if (!draft.guestName.trim()) return null;

    const entry: RSVPResponse = {
      id: `rsvp-${Date.now()}`,
      guestName: draft.guestName,
      guestCount: Number(draft.guestCount),
      menuPreference: draft.menuPreference,
      status: draft.status,
      message: draft.message,
      photoUrl: draft.photoUrl,
      videoUrl: draft.videoUrl,
      createdAt: new Date().toISOString()
    };

    set((state) => ({ rsvpList: [entry, ...state.rsvpList], draft: INITIAL_RSVP_DRAFT }));
    return entry;
  },

  deleteRsvp: (id) => set((state) => ({ rsvpList: state.rsvpList.filter((r) => r.id !== id) })),

  resetRsvps: () => set({ rsvpList: INITIAL_RSVP_LIST })
}));

// Hydrate once from the persistence boundary, then write back on every change.
void persistenceService.getRsvps().then((saved) => {
  if (saved) useRsvpStore.setState({ rsvpList: saved });
});

useRsvpStore.subscribe((state, prev) => {
  if (state.rsvpList !== prev.rsvpList) {
    void persistenceService.saveRsvps(state.rsvpList);
  }
});
