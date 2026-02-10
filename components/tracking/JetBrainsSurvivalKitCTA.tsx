"use client"

import { useRef } from "react"
import { usePathname } from "next/navigation"
import { trackRevenueOutbound, trackCtaImpression, trackCtaClick, getPageType } from "@/lib/tracking"

const GUMROAD_LINK = "https://hilda666888.gumroad.com/l/ymwwgm?utm_source=openclaw&utm_medium=jetbrains_error&utm_campaign=fix_continue_plugin"

// P1 tracking constants
const CTA_ID = "kit_jetbrains_fix"
const CTX: "ide" = "ide"
const INTENT: "stuck" = "stuck"
const DEST_TYPE: "gumroad" = "gumroad"
const DEST_ID = "gumroad_fix_pack"
const OFFER_REVENUE: "fix_now" = "fix_now"

export function JetBrainsSurvivalKitCTA() {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()

  // Track impressions
  const trackImpression = () => {
    if (typeof window === "undefined") return

    trackCtaImpression({
      placement: "mid",
      pageType: getPageType(pathname),
      slug: pathname.split("/").pop(),
      verdict: "red",
      path: pathname,
      // P1 properties
      cta_id: CTA_ID,
      cta_position: "mid",
      intent: INTENT,
      context: CTX,
    })
  }

  // Track clicks
  const handleClick = () => {
    const pageType = getPageType(pathname)
    const slug = pathname.split("/").pop()

    // revenue_outbound with P1 properties
    trackRevenueOutbound({
      dest: "gumroad",
      offer: "survival_kit",
      placement: "mid",
      pageType,
      slug,
      verdict: "red",
      path: pathname,
      // P1 properties
      dest_type: DEST_TYPE,
      dest_id: DEST_ID,
      offer_revenue: OFFER_REVENUE,
      cta_id: CTA_ID,
      cta_position: "mid",
      intent: INTENT,
      context: CTX,
    })

    // cta_click with P1 properties
    trackCtaClick({
      path: pathname,
      cta_id: CTA_ID,
      cta_position: "mid",
      intent: INTENT,
      context: CTX,
      verdict: "red",
      pageType: pageType,
      slug,
      dest_type: DEST_TYPE,
      dest_id: DEST_ID,
      offer: OFFER_REVENUE,
    })
  }

  // Track impression on mount
  if (typeof window !== "undefined") {
    // Simple one-time impression tracking
    const impressionKey = `cta_impression_${CTA_ID}_mid`
    if (sessionStorage.getItem(impressionKey) !== "1") {
      setTimeout(() => trackImpression(), 1000)
      sessionStorage.setItem(impressionKey, "1")
    }
  }

  return (
    <div className="text-center my-12">
      <a
        ref={anchorRef}
        href={GUMROAD_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] text-lg"
      >
        <span>Buy Clarity — $9.90</span>
      </a>
      <p className="text-sm text-text-secondary mt-4">
        Includes JetBrains/Cursor red-line rules and stop conditions. Not a fix.
      </p>
    </div>
  )
}
