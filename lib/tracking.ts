/**
 * Umami → Vultr attribution tracking helper
 * Standardizes tracking across all Vultr outbound links
 */

export interface VultrClickEvent extends Record<string, unknown> {
  page_path: string;
  post_slug?: string;
  placement: string;
  cta_id: string;
  verdict?: "green" | "yellow" | "red" | "unsafe";
  ref: string;
  utm_content: string;
}

/**
 * Track Vultr affiliate click with standardized Umami event
 * Call this when user clicks any Vultr affiliate link
 */
export function trackVultrClick(params: {
  placement: string;
  ctaId: string;
  verdict?: "green" | "yellow" | "red" | "unsafe";
  postSlug?: string;
  utmContent?: string;
}): void {
  if (typeof window === "undefined") return;

  const { placement, ctaId, verdict, postSlug, utmContent } = params;

  // Get current page path
  const page_path = window.location.pathname;

  // Build event data
  const eventData: VultrClickEvent = {
    page_path,
    post_slug: postSlug,
    placement,
    cta_id: ctaId,
    ...(verdict && { verdict }),
    ref: "9863490",
    utm_content: utmContent || `${placement}${verdict ? `_${verdict}` : ""}`,
  };

  // Track via Umami
  const umami = window.umami;
  if (umami) {
    try {
      if (typeof umami === "function") {
        umami("vultr_click", eventData);
      } else if (typeof umami === "object" && typeof umami.track === "function") {
        umami.track("vultr_click", eventData);
      }
    } catch (e) {
      // Silent fail - tracking shouldn't break user experience
      if (process.env.NODE_ENV === "development") {
        console.error("[Umami tracking failed]", e);
      }
    }
  }
}
