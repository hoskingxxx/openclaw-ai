/**
 * Global Sticky Header - "The Hijack"
 * ========================================
 * Fixed, dismissible notification bar at the very top of ALL pages.
 * Bright Red Background (#DC3545), White Bold Text.
 * Entire bar clickable -> redirects to Vultr.
 */

"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=sticky_header&utm_campaign=security_funnel"

export function GlobalStickyHeader() {
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted (prevent hydration shift)
  if (!mounted) return null

  // Hide if dismissed
  if (dismissed) return null

  return (
    <div
      onClick={() => setDismissed(true)}
      className="fixed top-0 left-0 right-0 z-[9999] bg-[#DC3545] text-white cursor-pointer shadow-xl transition-transform hover:shadow-2xl"
      style={{ display: dismissed ? "none" : "block" }}
    >
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Warning Icon + Text */}
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <div className="flex-1">
              <p className="font-bold text-lg md:text-xl">
                CRITICAL ADVISORY: Stop fixing OOM errors. Your real problem is Root Access Vulnerability.
              </p>
              <p className="text-sm md:text-base opacity-90">
                Switch to Vultr Cloud Sandbox immediately.
              </p>
            </div>
          </div>

          {/* Dismiss Button */}
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

        {/* Clickable entire area */}
        <a
          href={LINK_VULTR}
          target="_blank"
          rel="noopener noreferrer sponsored"
          data-umami-event="revenue_outbound"
          data-umami-partner="vultr"
          data-umami-placement="sticky_header"
          data-umami-offer="cloud_gpu"
          data-umami-intent="escape"
          data-umami-context="security"
          className="absolute inset-0"
          aria-label="Open Vultr Cloud Sandbox"
        />
      </div>
    </div>
  )
}
