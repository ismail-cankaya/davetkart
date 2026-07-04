import { create } from 'zustand';

/** Breakpoint below which the app renders its mobile experience (Tailwind `lg`). */
const MOBILE_QUERY = '(max-width: 1023px)';

interface UIState {
  isRsvpModalOpen: boolean;
  isMobile: boolean;
  setRsvpModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  isRsvpModalOpen: false,
  isMobile: window.matchMedia(MOBILE_QUERY).matches,
  setRsvpModalOpen: (open) => set({ isRsvpModalOpen: open })
}));

// Keep isMobile in sync for the app's lifetime (module-scoped singleton).
window
  .matchMedia(MOBILE_QUERY)
  .addEventListener('change', (e) => useUIStore.setState({ isMobile: e.matches }));
