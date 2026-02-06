"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackVultrClick } from "@/lib/tracking"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Don't show on Error Index (it's a tool) or Hardware Page (it's already a sales page)
  const isExcludedPage = pathname?.includes('openclaw-error-index') || pathname?.includes('hardware-requirements')

  useEffect(() => {
    if (isExcludedPage) return

    const handleScroll = () => {
      if (window.scrollY > 400) setIsVisible(true)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isExcludedPage])

  if (!isVisible || isExcludedPage) return null

  // Get post slug for UTM
  const postSlug = pathname?.split("/").filter(Boolean).pop() || "";
  const utmContent = "sticky_banner";
  const affLink = `https://www.vultr.com/?ref=9863490&utm_source=openclaw&utm_medium=content&utm_campaign=${postSlug}&utm_content=${utmContent}`;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[400px] z-50 animate-in slide-in-from-bottom-5">
      <div className="relative bg-slate-900 border border-orange-500/30 shadow-2xl rounded-lg p-4 flex items-center gap-4">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-slate-800 rounded-full w-6 h-6 flex items-center justify-center text-xs text-slate-400 border border-slate-700 hover:bg-slate-700"
        >
          ✕
        </button>

        <div className="flex-1">
          <p className="text-sm font-semibold text-white">
            🧠 Local environment fighting back?
          </p>
          <p className="text-xs text-slate-400">
            Switch to a clean Cloud GPU and start shipping.
          </p>
        </div>

        <a
          href={affLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackVultrClick({ placement: "sticky_banner", ctaId: "sticky_deploy_button", postSlug, utmContent })}
          data-cta="true"
          data-umami-event="vultr_click"
          data-umami-event-post={postSlug}
          data-umami-event-placement="sticky_banner"
          data-umami-event-cta-id="sticky_deploy_button"
          data-umami-event-ref="9863490"
          data-umami-event-utm_content={utmContent}
          className="px-4 py-2 bg-[#FF4500] hover:bg-[#FF4500]/90 text-white text-sm font-bold rounded shadow-lg transition-transform hover:scale-105"
        >
          Deploy Now →
        </a>
      </div>
    </div>
  )
}
