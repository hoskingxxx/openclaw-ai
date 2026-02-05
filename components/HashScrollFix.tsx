"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * HashScrollFix - Fixes anchor link scrolling on guide pages
 *
 * Uses Next.js navigation hooks to detect route changes and scroll to hash.
 * Runs on pathname/searchParams changes to handle client-side navigation.
 */
export function HashScrollFix() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ block: "start" });
  }, [pathname, searchParams]);

  return null;
}
