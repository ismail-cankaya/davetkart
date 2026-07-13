import { create } from 'zustand';
import { Invitation, InvitationSaveState, PaletteId, TemplatePreset } from '../types';
import { INITIAL_INVITATION, TEMPLATE_PRESETS } from '../data';
import { persistenceService } from '../services/persistence';
import { useAuthStore } from './useAuthStore';

/** Palette carried by each modular preset; legacy presets keep the current palette. */
const PRESET_PALETTES: Record<string, PaletteId> = {
  'moda-gece': 'midnight',
  'moda-tas': 'stone',
  'dugun-sade': 'stone',
  // Katmanlı düğün şablon ailesi — hepsi açık zeminli temalar
  'dugun-1': 'stone',
  'dugun-2': 'stone',
  'dugun-3': 'stone',
  'dugun-4': 'stone',
  'dugun-5': 'stone',
  // Kategoriye özel yeni tema koleksiyonu
  'sunnet-klasik': 'midnight',
  'sunnet-modern': 'stone',
  'dogum-gunu-neseli': 'stone',
  'dogum-gunu-sik': 'midnight',
  'mezuniyet-akademik': 'midnight',
  'mezuniyet-dinamik': 'midnight',
  'baby-shower-pastel': 'stone',
  'baby-shower-boho': 'stone',
  'parti-neon': 'midnight',
  'parti-gala': 'midnight'
};

interface InvitationState {
  invitation: Invitation;
  activePresetId: string;
  /** Outcome of the most recent backend save (drives the editor's status hint). */
  saveState: InvitationSaveState;
  /** Update a single invitation field (form inputs). */
  updateField: <K extends keyof Invitation>(name: K, value: Invitation[K]) => void;
  /** Switch the visual template; keeps the invitation's theme fields in sync. */
  selectTemplate: (presetId: string) => void;
  /** Load an existing record (dashboard "continue editing") into the editor. */
  loadInvitation: (invitation: Invitation) => void;
  /** Restore the invitation and template to their factory defaults. */
  resetInvitation: () => void;
  /** Persist the current design to the backend (called by the debounced auto-save). */
  saveInvitation: () => Promise<void>;
}

export const useInvitationStore = create<InvitationState>()((set, get) => ({
  invitation: INITIAL_INVITATION,
  activePresetId: INITIAL_INVITATION.imageTheme,
  saveState: 'idle',

  updateField: (name, value) =>
    set((state) => ({ invitation: { ...state.invitation, [name]: value } })),

  selectTemplate: (presetId) =>
    set((state) => ({
      activePresetId: presetId,
      invitation: {
        ...state.invitation,
        imageTheme: presetId,
        phoneBackground: presetId,
        palette: PRESET_PALETTES[presetId] ?? state.invitation.palette
      }
    })),

  // Merge over the factory defaults so records created before newer modular
  // fields existed (showGift, timelineEvents…) load with sane values.
  loadInvitation: (invitation) =>
    set({
      invitation: { ...INITIAL_INVITATION, ...invitation },
      activePresetId: invitation.imageTheme || INITIAL_INVITATION.imageTheme
    }),

  resetInvitation: () =>
    set({ invitation: INITIAL_INVITATION, activePresetId: INITIAL_INVITATION.imageTheme }),

  saveInvitation: async () => {
    set({ saveState: 'saving' });
    try {
      await persistenceService.saveInvitation(get().invitation);
      set({ saveState: 'saved' });
    } catch {
      // A failed save must never crash the editor; the status hint surfaces
      // it and the next edit re-triggers the debounced save.
      set({ saveState: 'error' });
    }
  }
}));

/** The full preset object for the currently selected template. */
export function useActivePreset(): TemplatePreset {
  return useInvitationStore(
    (state) => TEMPLATE_PRESETS.find((p) => p.id === state.activePresetId) ?? TEMPLATE_PRESETS[0]
  );
}

// Hydrate once from the backend for signed-in users (the auth store restores
// its cached session synchronously, so the check is safe at module load).
// Anonymous visitors design in memory; saving starts once they authenticate.
// Writes are NOT mirrored here on every change — the editor persists through
// the debounced auto-save hook (hooks/useInvitationAutoSave).
if (useAuthStore.getState().isAuthenticated) {
  persistenceService
    .getInvitation()
    .then((saved) => {
      if (saved) {
        // Merge over the factory defaults so records persisted before the modular
        // fields existed (showGift, timelineEvents…) hydrate with sane values.
        useInvitationStore.setState({
          invitation: { ...INITIAL_INVITATION, ...saved },
          activePresetId: saved.imageTheme || INITIAL_INVITATION.imageTheme
        });
      }
    })
    .catch(() => {
      // Backend unreachable — the editor starts from factory defaults.
    });
}
