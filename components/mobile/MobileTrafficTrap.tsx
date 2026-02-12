/**
 * Mobile Traffic Trap - "The Sticky Bar"
 * ========================================
 * Shows fixed bottom bar on mobile (< 768px) to capture traffic.
 * Does NOT hide original content (SEO requirement).
 */

"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=mobile_bar&utm_campaign=traffic_trap"

export function MobileTrafficTrap() {
  const [isMobile, setIsMobile] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check if mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Listen for resize
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Don't show if dismissed
  if (!isMobile || dismissed) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-red-600 text-white shadow-lg"
      style={{ display: dismissed ? "none" : "block" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Warning Text */}
          <div className="flex-1">
            <p className="text-sm sm:text-base font-semibold">
              Mobile Detected. OpenClaw requires heavy compute.
            </p>
            <p className="text-xs sm:text-sm opacity-90">
              Local R1 crashes on mobile hardware.
            </p>
          </div>

          {/* CTA Button */}
          <a
            href={LINK_VULTR}
            target="_blank"
            rel="noopener noreferrer sponsored"
            data-umami-event="revenue_outbound"
            data-umami-partner="vultr"
            data-umami-placement="mobile_bar"
            data-umami-offer="cloud_gpu"
            data-umami-intent="escape"
            data-umami-context="mobile"
            className="inline-flex items-center gap-2 px-4 py-3 bg-white text-red-600 font-bold text-sm sm:text-base rounded-lg hover:bg-gray-100 transition-colors shadow-md"
          >
            <span>Start Cloud Instance ($5)</span>
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
          </a>

          {/* Dismiss button */}
          <button
            onClick={() => setDismissed(true)}
            className="text-white/70 hover:text-white transition-colors p-2"
            aria-label="Dismiss warning"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
