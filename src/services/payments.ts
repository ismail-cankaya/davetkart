import { CheckoutPayload, CheckoutResult } from '../types';

/**
 * Payments service client — currently a mock, shaped 1:1 like the future
 * backend contract so swapping the implementation is a one-line change.
 *
 * TODO(backend): replace the body with
 *   const { data } = await api.post<CheckoutResult>('/payments/checkout', payload);
 *   return data;
 * using the shared `api` client (services/api.ts) so the JWT interceptor and
 * 401 handling apply. The real endpoint will also verify server-side that the
 * chosen tier actually covers the invitation's enabled modules.
 */
export const paymentService = {
  async checkout(payload: CheckoutPayload): Promise<CheckoutResult> {
    // Simulated gateway latency so the purchase spinner is visible.
    await new Promise((resolve) => setTimeout(resolve, 1800));
    return {
      orderId: `mock-order-${Date.now()}`,
      tier: payload.tier,
      status: 'paid'
    };
  }
};
