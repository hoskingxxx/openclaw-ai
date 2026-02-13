/**
 * PrimaryCTA - 统一的主 CTA 组件（Survival Kit）
 * 替代 SurvivalKitPromo - 全站主要收入路径的唯一入口
 *
 * Variants:
 * - "full": 完整卡片（文章底部）
 * - "compact": 通知栏（文章顶部）
 * - "inline": 行内文本链接（最小化）
 *
 * Tracking: Uses trackRevenueOutbound with canonical P1 properties
 */

"use client"

import { useRef } from "react"
import { Package, Zap, ExternalLink } from "lucide-react"
import { useRevenueOutbound, useCtaImpression } from "@/lib/use-tracking"
import { PRIMARY_OFFER, generateCtaId, type CtaPlacement } from "@/lib/offers"

// Internal placement for inline variant (not a tracking Placement)
const INLINE_PLACEMENT = "bottom" as CtaPlacement

type PrimaryVariant = "full" | "compact" | "inline"

interface PrimaryCTAProps {
  variant?: PrimaryVariant
  placement?: CtaPlacement
  verdict?: "red" | "yellow" | "green"
  className?: string
}

export function PrimaryCTA({
  variant = "full",
  placement = "bottom",
  verdict,
  className = "",
}: PrimaryCTAProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  // Generate canonical CTA ID
  const ctaId = generateCtaId({
    offer: "kit",
    placement,
    verdict,
  })

  // Track clicks
  const handleClick = useRevenueOutbound({
    dest: "gumroad",
    offer: "survival_kit",
    placement,
    verdict,
  })

  // Track impressions
  useCtaImpression(elementRef, {
    dest: "gumroad",
    offer: "survival_kit",
    placement,
    verdict,
  })

  // Inline variant: Minimal text link
  if (variant === "inline") {
    // Don't use ref/impression tracking for inline to avoid type issues
    return (
      <a
        href={PRIMARY_OFFER.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleClick}
        className={`text-xs text-text-tertiary hover:text-text-secondary transition-colors underline underline-offset-4 ${className}`}
        data-cta={ctaId}
      >
        Need stop rules + red lines? Get the Survival Kit ({PRIMARY_OFFER.price}).
      </a>
    )
  }

  // Compact variant: Notice bar style (article top)
  if (variant === "compact") {
    return (
      <div ref={elementRef} className={`my-4 border border-border rounded-lg bg-card h-[60px] sm:h-[70px] flex items-center justify-between px-4 gap-3 ${className}`}>
        <h4 className="text-sm sm:text-base font-bold text-text-primary font-mono flex-1">
          Stop guessing. See the red lines.
        </h4>
        <a
          href={PRIMARY_OFFER.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded transition-colors text-xs sm:text-sm flex-shrink-0"
          data-cta={ctaId}
        >
          Buy Clarity — {PRIMARY_OFFER.price}
        </a>
      </div>
    )
  }

  // Full variant: Complete promo (article bottom)
  return (
    <div ref={elementRef} className={`my-8 border border-amber-500/50 rounded-xl bg-gradient-to-br from-amber-50/10 to-orange-50/5 dark:from-amber-950/30 dark:to-orange-950/20 relative overflow-hidden ${className}`}>
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-500"></div>

      <div className="p-6">
        {/* Header badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 dark:bg-amber-500/10 rounded-full border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
              Official Recommendation
            </span>
          </div>
        </div>

        {/* Main title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Stop Guessing. Know When to Stop.
        </h3>

        {/* Subtitle */}
        <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
          This kit contains decision boundaries, not tutorials. Stop rules, red lines, and exit points for DeepSeek R1.
        </p>

        {/* CTA Button */}
        <a
          href={PRIMARY_OFFER.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
          data-cta={ctaId}
        >
          <span>Buy Clarity — {PRIMARY_OFFER.price}</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Trust badges */}
        <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <span>✓</span> Stop Rules
          </span>
          <span className="flex items-center gap-1">
            <span>✓</span> Red Lines
          </span>
          <span className="flex items-center gap-1">
            <span>✓</span> Exit Points
          </span>
        </div>
      </div>
    </div>
  )
}
