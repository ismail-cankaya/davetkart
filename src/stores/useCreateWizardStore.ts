import { create } from 'zustand';
import { EVENT_CATEGORIES } from '../data';
import { EventCategory } from '../types';

/**
 * Stages of the /create wizard:
 *  - build:      category → theme → details form (single scrollable flow)
 *  - generating: fake AI-personalization loading screen
 *  - editor:     final workspace (designer panel + phone preview + publish bar)
 */
export type WizardStage = 'build' | 'generating' | 'editor';

interface CreateWizardState {
  stage: WizardStage;
  categoryId: string | null;
  /** The theme step reveals the details form only after an explicit pick. */
  themeChosen: boolean;
  selectCategory: (id: string) => void;
  markThemeChosen: () => void;
  startGeneration: () => void;
  completeGeneration: () => void;
  /** "Tasarımını Düzenle" — back to the build flow, selections intact. */
  backToBuild: () => void;
  /** Dashboard "Düzenlemeye Devam Et" — jump straight into the editor workspace. */
  resumeEditor: (categoryId: string) => void;
  /** Dashboard "Yeni Davetiye Oluştur" — reset the wizard to a blank first step. */
  startNew: () => void;
}

export const useCreateWizardStore = create<CreateWizardState>()((set) => ({
  stage: 'build',
  categoryId: null,
  themeChosen: false,

  // Switching to a different category invalidates the previous theme pick —
  // its templates may not exist in the new category's collection.
  selectCategory: (id) =>
    set((state) => ({
      categoryId: id,
      themeChosen: state.categoryId === id ? state.themeChosen : false
    })),
  markThemeChosen: () => set({ themeChosen: true }),
  startGeneration: () => set({ stage: 'generating' }),
  completeGeneration: () => set({ stage: 'editor' }),
  backToBuild: () => set({ stage: 'build' }),
  resumeEditor: (categoryId) => set({ stage: 'editor', categoryId, themeChosen: true }),
  startNew: () => set({ stage: 'build', categoryId: null, themeChosen: false })
}));

/** Resolved category object for the current selection (null before step 1). */
export function useActiveCategory(): EventCategory | null {
  return useCreateWizardStore(
    (state) => EVENT_CATEGORIES.find((c) => c.id === state.categoryId) ?? null
  );
}
