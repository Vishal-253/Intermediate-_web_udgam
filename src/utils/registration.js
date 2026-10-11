/**
 * Event registration — integration point.
 *
 * Everything on the Events page that registers a user funnels through
 * `submitRegistration`, so wiring up the real flow (form, payment, backend)
 * only needs changes here and in the tray's response handling.
 */

/**
 * @param {Array<{id: string, name: string, fee: number}>} items events in the user's pass
 * @returns {Promise<{ ok: boolean, status: 'not-open' | 'submitted' | 'error', message: string }>}
 */
export async function submitRegistration(items) {
  // TODO: replace with the real registration request once the backend is ready.
  void items;
  return {
    ok: false,
    status: 'not-open',
    message: 'Registrations open soon. Your picks are saved on this device.',
  };
}

export const formatFee = (amount) => `₹${amount.toLocaleString('en-IN')}`;
