/**
 * Navbar Support Button - "Trust" monetization entry point
 * Minimalist outline button in header
 */

"use client";

import { useRef } from "react";
import { CoffeeIcon } from "@/components/icons";
import { getBMCLink } from "@/lib/bmc";
import { useRevenueOutbound, useCtaImpression } from "@/lib/use-tracking";

export function NavbarSupportButton() {
  const elementRef = useRef<HTMLAnchorElement>(null);

  // Track clicks
  const handleClick = useRevenueOutbound({
    dest: "bmac",
    offer: "coffee",
    placement: "navbar",
  });

  // Track impressions
  useCtaImpression(elementRef, {
    dest: "bmac",
    offer: "coffee",
    placement: "navbar",
  });

  return (
    <a
      ref={elementRef}
      href={getBMCLink("navbar")}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-lg transition-all duration-200"
      aria-label="Support on Buy Me a Coffee"
    >
      <CoffeeIcon className="w-4 h-4" />
      <span>Support</span>
    </a>
  );
}
