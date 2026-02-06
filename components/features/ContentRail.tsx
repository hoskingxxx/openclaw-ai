/**
 * ContentRail - Single source of truth for content width across the site
 *
 * HARD RULE: This is the ONLY place that defines content max-width.
 * All page content must flow through this component.
 *
 * Rail specification:
 * - Desktop: 960px max-width (single visual rail)
 * - Mobile: full-width with standard padding
 * - No nested max-w-* containers inside content
 *
 * Usage:
 *   <ContentRail>
 *     <YourContent />
 *   </ContentRail>
 */

import { ReactNode } from "react";

interface ContentRailProps {
  children: ReactNode;
  className?: string;
}

export function ContentRail({ children, className = "" }: ContentRailProps) {
  return (
    <div className={`mx-auto w-full max-w-[960px] px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
