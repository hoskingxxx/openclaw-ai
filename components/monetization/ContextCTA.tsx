/**
 * ContextCTA - 条件渲染的 Cloud CTA 组件
 * 替代 ContinueSafely 中的 Cloud 部分
 *
 * 规则：
 * - verdict="red": 显示 Cloud Sandbox（突出，因为硬件不足）
 * - verdict="yellow": 不显示 Cloud（YELLOW 应该推 Survival Kit）
 * - verdict="green": 不显示 Cloud（GREEN 不需要推荐云服务）
 *
 * Tracking: Uses trackRevenueOutbound with canonical P1 properties
 */

"use client"

import { useRef } from "react"
import { Cloud, ExternalLink } from "lucide-react"
import { useRevenueOutbound, useCtaImpression } from "@/lib/use-tracking"
import { CLOUD_OFFER, generateCtaId, type CtaPlacement } from "@/lib/offers"

type Verdict = "red" | "yellow" | "green"

interface ContextCTAProps {
  verdict: Verdict
  placement?: Placement
  className?: string
}

// Use Placement type from tracking.ts (no "inline" needed for ContextCTA)
type Placement = "bottom" | "red_card" | "yellow_card" | "green_card" | "top"

export function ContextCTA({
  verdict,
  placement = "bottom",
  className = "",
}: ContextCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 只有 RED verdict 才显示 Cloud CTA
  if (verdict !== "red") {
    return null
  }

  // Generate canonical CTA ID
  const ctaId = generateCtaId({
    offer: "cloud",
    placement,
    verdict: "red",
  })

  // Track clicks
  const handleClick = useRevenueOutbound({
    dest: "vultr",
    offer: "cloud_gpu",
    placement,
    verdict: "red",
  })

  // Track impressions
  useCtaImpression(containerRef, {
    dest: "vultr",
    offer: "cloud_gpu",
    placement,
    verdict: "red",
  })

  return (
    <div ref={containerRef} className={`my-12 pt-8 border-t border-white/10 ${className}`}>
      <h2 className="text-2xl font-mono text-text-primary mb-4 text-center">
        Hardware Not Enough? Escape to Cloud.
      </h2>

      <div className="flex flex-col items-center gap-6">
        {/* Primary CTA: Cloud Sandbox */}
        <a
          href={CLOUD_OFFER.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="w-full sm:w-auto px-10 py-5 text-xl font-bold text-white rounded-lg border-2 border-purple-500 bg-purple-600 hover:bg-purple-500 font-mono text-center"
          data-cta={ctaId}
        >
          Launch Cloud Sandbox ({CLOUD_OFFER.price}) →
        </a>

        {/* Context note */}
        <p className="text-xs text-text-tertiary text-center max-w-md">
          Hourly billing. No hardware ceiling. Ready in ~60 seconds.
        </p>
      </div>
    </div>
  )
}
