import { create } from 'zustand';
import { Invitation, SubscriptionTier } from '../types';
import { paymentService } from '../services/payments';

/** Orders the tiers so "plan X covers requirement Y" is a simple comparison. */
export const TIER_RANK: Record<SubscriptionTier, number> = {
  standart: 0,
  gold: 1,
  elit: 2
};

/**
 * The minimum plan that unlocks every module enabled on the invitation.
 * Business rule (paywall): Gallery/Gift are Elit-only; Envelope/Timeline
 * need at least Gold; everything else fits Standart.
 */
export function getRequiredTier(invitation: Invitation): SubscriptionTier {
  if (invitation.showGallery || invitation.showGift) return 'elit';
  if (invitation.showEnvelope || invitation.showTimeline) return 'gold';
  return 'standart';
}

interface SubscriptionState {
  isPaywallOpen: boolean;
  /** Cheapest tier that covers the invitation being published (drives the "Tavsiye Edilen" highlight). */
  requiredTier: SubscriptionTier;
  selectedTier: SubscriptionTier;
  isProcessing: boolean;
  /**
   * Tier purchased in this session. Mock until the Payments service exists —
   * the backend will become the source of truth for owned plans/orders.
   */
  activeTier: SubscriptionTier | null;
  openPaywall: (required: SubscriptionTier) => void;
  closePaywall: () => void;
  selectTier: (tier: SubscriptionTier) => void;
  /** Run the (mock) checkout for the selected tier; resolves true on success. */
  purchase: () => Promise<boolean>;
}

export const useSubscriptionStore = create<SubscriptionState>()((set, get) => ({
  isPaywallOpen: false,
  requiredTier: 'standart',
  selectedTier: 'standart',
  isProcessing: false,
  activeTier: null,

  // The recommended tier starts pre-selected so a single click can purchase.
  openPaywall: (required) =>
    set({ isPaywallOpen: true, requiredTier: required, selectedTier: required }),

  closePaywall: () => {
    // Never close mid-payment; the spinner state must resolve first.
    if (!get().isProcessing) set({ isPaywallOpen: false });
  },

  selectTier: (tier) => {
    // Plans below the requirement can't host the invitation's modules.
    if (TIER_RANK[tier] >= TIER_RANK[get().requiredTier]) set({ selectedTier: tier });
  },

  purchase: async () => {
    const { selectedTier, isProcessing } = get();
    if (isProcessing) return false;
    set({ isProcessing: true });
    try {
      const result = await paymentService.checkout({ tier: selectedTier });
      set({ activeTier: result.tier, isProcessing: false, isPaywallOpen: false });
      return true;
    } catch {
      set({ isProcessing: false });
      return false;
    }
  }
}));
