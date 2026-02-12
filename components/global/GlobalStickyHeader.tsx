/**
 * Global Sticky Header - "The Hijack"
 * ========================================
 * Fixed, dismissible notification bar at the very top of ALL pages.
 * Unified tracking + compliant copy.
 */

"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { trackVultrOutbound } from "@/lib/tracking"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=sticky_header&utm_campaign=security_funnel"

export function GlobalStickyHeader() {
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleVultrClick = () => {
    trackVultrOutbound({
      placement: "sticky_header",
      slug: "",
      path: "/",
      intent: "escape",
    })
  }

  // Don't render until mounted (prevent hydration shift)
  if (!mounted) return null

  // Hide if dismissed
  if (dismissed) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-[#DC3545] text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Warning Icon + Text */}
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <div className="flex-1">
              <p className="font-bold text-lg md:text-xl">
                SYSTEM ADVISORY: Cloud sandbox isolates experiments and reduces setup risk.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={LINK_VULTR}
              target="_blank"
              rel="noopener noreferrer sponsored"
              onClick={handleVultrClick}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors shadow-lg text-sm md:text-base"
            >
              Launch Vultr Sandbox
            </a>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setDismissed(true)
              }}
              className="flex-shrink-0 p-2 hover:bg-white/20 transition-colors"
              aria-label="Dismiss advisory"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
