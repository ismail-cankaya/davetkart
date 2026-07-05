import { create } from 'zustand';
import { Invitation, PaletteId, TemplatePreset } from '../types';
import { INITIAL_INVITATION, TEMPLATE_PRESETS } from '../data';
import { persistenceService } from '../services/persistence';

/** Palette carried by each modular preset; legacy presets keep the current palette. */
const PRESET_PALETTES: Record<string, PaletteId> = {
  'moda-gece': 'midnight',
  'moda-tas': 'stone',
  'dugun-sade': 'stone'
};

interface InvitationState {
  invitation: Invitation;
  activePresetId: string;
  /** Update a single invitation field (form inputs). */
  updateField: <K extends keyof Invitation>(name: K, value: Invitation[K]) => void;
  /** Switch the visual template; keeps the invitation's theme fields in sync. */
  selectTemplate: (presetId: string) => void;
  /** Restore the invitation and template to their factory defaults. */
  resetInvitation: () => void;
}

export const useInvitationStore = create<InvitationState>()((set) => ({
  invitation: INITIAL_INVITATION,
  activePresetId: INITIAL_INVITATION.imageTheme,

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

  resetInvitation: () =>
    set({ invitation: INITIAL_INVITATION, activePresetId: INITIAL_INVITATION.imageTheme })
}));

/** The full preset object for the currently selected template. */
export function useActivePreset(): TemplatePreset {
  return useInvitationStore(
    (state) => TEMPLATE_PRESETS.find((p) => p.id === state.activePresetId) ?? TEMPLATE_PRESETS[0]
  );
}

// Hydrate once from the persistence boundary, then write back on every change.
void persistenceService.getInvitation().then((saved) => {
  if (saved) {
    // Merge over the factory defaults so records persisted before the modular
    // fields existed (showGift, timelineEvents…) hydrate with sane values.
    useInvitationStore.setState({
      invitation: { ...INITIAL_INVITATION, ...saved },
      activePresetId: saved.imageTheme || INITIAL_INVITATION.imageTheme
    });
  }
});

useInvitationStore.subscribe((state, prev) => {
  if (state.invitation !== prev.invitation) {
    void persistenceService.saveInvitation(state.invitation);
  }
});
