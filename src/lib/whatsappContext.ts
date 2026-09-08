import type { WhatsAppContextType } from "@/lib/whatsapp";

/**
 * Tiny external store the route-aware floating WhatsApp button reads from.
 *
 * The FAB lives once in the root layout, but the precise page title (tour /
 * destination / article) is only known inside the shared page components. Those
 * components register their context here on mount via <WhatsAppContextSetter>;
 * the FAB subscribes with useSyncExternalStore and re-renders. No per-page
 * wiring, no provider tree - future tours/posts inherit it automatically.
 */

export interface WhatsAppContextValue {
  type: WhatsAppContextType;
  /** Tour title / destination genitive / article title. */
  title?: string;
}

let current: WhatsAppContextValue | null = null;
const listeners = new Set<() => void>();

export function setWhatsAppContext(value: WhatsAppContextValue | null): void {
  current = value;
  for (const l of listeners) l();
}

export function subscribeWhatsAppContext(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getWhatsAppContext(): WhatsAppContextValue | null {
  return current;
}

/** Server snapshot: nothing is registered during prerender (effects are client-only). */
export function getServerWhatsAppContext(): WhatsAppContextValue | null {
  return null;
}
