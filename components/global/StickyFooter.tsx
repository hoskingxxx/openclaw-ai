/**
 * Sticky Footer - "The Bottom Bar" Conversion
 * ==========================================
 * Fixed bottom bar for ALL pages (mobile + desktop).
 * High-visibility CTA for frustrated readers.
 */

"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=sticky_footer&utm_campaign=conversion_funnel"

export function StickyFooter() {
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-gray-900 border-t border-red-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Warning Message */}
          <div className="flex-1 flex items-center gap-3">
            <span className="text-2xl animate-pulse hidden sm:block">⚠️</span>
            <div>
              <p className="text-sm md:text-base font-semibold text-white">
                Still fighting OOM errors? It's a hardware limit, not a software bug.
              </p>
              <p className="text-xs md:text-sm text-gray-400 hidden sm:block">
                Switch to cloud sandbox. 5-minute setup.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={LINK_VULTR}
              target="_blank"
              rel="noopener noreferrer sponsored"
              data-umami-event="revenue_outbound"
              data-umami-partner="vultr"
              data-umami-placement="sticky_footer"
              data-umami-offer="cloud_gpu"
              data-umami-intent="escape"
              data-umami-context="frustration"
              className="px-4 py-2 md:px-6 md:py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors shadow-lg text-sm md:text-base whitespace-nowrap"
            >
              Deploy on Vultr ($5)
            </a>

            <button
              onClick={() => setDismissed(true)}
              className="p-2 hover:bg-white/10 transition-colors rounded"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
