import { create } from 'zustand';
import { PreviewDevice } from '../types';

/** Breakpoint below which the app renders its mobile experience (Tailwind `lg`). */
const MOBILE_QUERY = '(max-width: 1023px)';

interface UIState {
  isRsvpModalOpen: boolean;
  isMobile: boolean;
  /** Active frame of the multi-device preview simulator. */
  previewDevice: PreviewDevice;
  setRsvpModalOpen: (open: boolean) => void;
  setPreviewDevice: (device: PreviewDevice) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isRsvpModalOpen: false,
  isMobile: window.matchMedia(MOBILE_QUERY).matches,
  previewDevice: 'phone',
  setRsvpModalOpen: (open) => set({ isRsvpModalOpen: open }),
  setPreviewDevice: (device) => set({ previewDevice: device })
}));

// Keep isMobile in sync for the app's lifetime (module-scoped singleton).
window
  .matchMedia(MOBILE_QUERY)
  .addEventListener('change', (e) => useUIStore.setState({ isMobile: e.matches }));
