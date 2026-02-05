"use client";

/**
 * UmamiAnalytics - Analytics wrapper with internal traffic filtering
 *
 * FILTERING LAYERS (in order):
 * 1. Environment: Only loads in production (NODE_ENV === "production")
 * 2. Browser Opt-out: Respects localStorage.umami_ignore = "1"
 *
 * MAINTAINER OPT-OUT:
 * Run in browser console to exclude your own traffic:
 *   localStorage.setItem('umami_ignore', '1')
 *
 * To re-enable:
 *   localStorage.removeItem('umami_ignore')
 */

import { useEffect } from "react";

const UMAMI_WEBSITE_ID = "5db90e55-9103-490f-8df0-9636a84942c8";
const UMAMI_SCRIPT_URL = "https://analytics.umami.is/script.js";

export function UmamiAnalytics() {
  useEffect(() => {
    // LAYER 1: Environment check - only load in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // LAYER 2: Browser opt-out check
    // Maintainers can set localStorage.umami_ignore = "1" to exclude themselves
    if (typeof window !== "undefined" && localStorage.getItem("umami_ignore") === "1") {
      console.log("[Umami] Analytics disabled by user opt-out (localStorage.umami_ignore)");
      return;
    }

    // Load Umami script only if both checks pass
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = UMAMI_SCRIPT_URL;
    script.setAttribute("data-website-id", UMAMI_WEBSITE_ID);

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
