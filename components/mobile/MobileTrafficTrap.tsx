/**
 * Mobile Traffic Logic - Mobile Detection + Simplified Hero + Sticky Bottom Bar
 * =================================================================
 * 1. Window width check: if (window.innerWidth < 768)
 * 2. Simplify Hero: Show simple message instead of complex text
 * 3. Sticky Bottom Bar: Add fixed bottom bar (z-index: 9999)
 * 4. Bottom Bar CTA: Green button to Vultr
 */

"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=mobile_bar&utm_campaign=traffic_trap"

export function MobileTrafficTrap() {
  const [isMobile, setIsMobile] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

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

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't show if not mobile or dismissed
  if (!isMobile || dismissed) return null

  return (
    <>
      {/* Mobile-only: Simplified Hero Message */}
      {isMobile && !dismissed && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/95 px-4">
          <div className="max-w-md mx-auto text-center">
            <p className="text-lg md:text-xl font-bold text-red-400 mb-2">
              Mobile Device Detected.
            </p>
            <p className="text-sm md:text-base text-text-secondary">
              OpenClaw requires desktop compute.
            </p>
            <p className="text-sm md:text-base text-yellow-400 font-mono">
              Deploy Cloud Instance to control remotely.
            </p>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar - Mobile Traffic Funnel */}
      {isMobile && !dismissed && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-red-600 text-white shadow-2xl"
          style={{ display: dismissed ? "none" : "block" }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm md:text-base font-semibold">
                  Mobile Device Detected. OpenClaw requires heavy compute.
                </p>
              </div>

              <a
                href={LINK_VULTR}
                target="_blank"
                rel="noopener noreferrer sponsored"
                data-umami-event="vultr_outbound"
                data-umami-partner="vultr"
                data-umami-placement="mobile_bar"
                data-umami-offer="cloud_gpu"
                data-umami-intent="escape"
                data-umami-context="mobile"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00FF00] hover:bg-[#00CC00] text-white font-bold rounded-lg transition-colors shadow-lg"
              >
                <span>Start Cloud Instance ($5)</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
