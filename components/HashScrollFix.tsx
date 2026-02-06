"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const HEADER_OFFSET = 80;

/**
 * HashScrollFix - Handles anchor scroll on page load / route change
 *
 * Only runs on pathname change with delay to avoid race with browser default jump.
 * Uses window.scrollTo with fixed 80px offset.
 * Does not interfere with TOC click behavior.
 */
export function HashScrollFix() {
  const pathname = usePathname();
  const hasScrolledRef = useRef(false);

  useEffect(() => {
    // Reset flag on pathname change
    hasScrolledRef.current = false;

    const hash = window.location.hash?.slice(1);
    if (!hash) return;

    // Wait for browser default jump + layout to settle
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (hasScrolledRef.current) return;
        hasScrolledRef.current = true;

        const el = document.getElementById(hash);
        if (!el) return;

        const top = window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET;
        window.scrollTo({ top });
      });
    });
  }, [pathname]);

  return null;
}
