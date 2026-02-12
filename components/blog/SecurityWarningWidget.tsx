/**
 * Security Warning Widget - "The Interceptor"
 * ========================================
 * Injected at the top of every blog post.
 * Yellow background, dark text, red border - entire box clickable to Vultr.
 */

import Link from "next/link"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=blog_warning&utm_campaign=security_interceptor"

interface SecurityWarningWidgetProps {
  postTitle?: string
}

export function SecurityWarningWidget({ postTitle }: SecurityWarningWidgetProps) {
  return (
    <Link
      href={LINK_VULTR}
      target="_blank"
      rel="noopener noreferrer sponsored"
      data-umami-event="revenue_outbound"
      data-umami-partner="vultr"
      data-umami-placement="blog_warning"
      data-umami-offer="cloud_gpu"
      data-umami-intent="escape"
      data-umami-context="security"
      className="block mb-6 border-2 border-red-600 bg-[#fff3cd] hover:bg-[#ffeb3b] transition-colors rounded-lg shadow-md hover:shadow-lg cursor-pointer group"
    >
      {/* Header with icon */}
      <div className="px-5 py-3 border-b border-red-600/50 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">⚠️</span>
        <div className="flex-1">
          <span className="font-bold text-[#856404] text-sm md:text-base block mb-1">
            SECURITY WARNING
          </span>
          <p className="text-[#856404]/90 text-xs md:text-sm">
            This tutorial requires <strong className="text-[#856404]">Sudo/Root Privileges</strong>.
            Executing experimental agents on your main OS is dangerous.
          </p>
        </div>
      </div>

      {/* Main warning text */}
      <div className="px-5 py-3">
        <p className="text-[#856404] text-sm md:text-base mb-2">
          <strong className="font-bold">Recommended:</strong> Run this in a{" "}
          <span className="font-bold underline decoration-red-600/50 underline-offset-2">
            Disposable Vultr Sandbox
          </span>{" "}
          to protect your personal data.
        </p>
        <p className="text-[#856404]/80 text-xs md:text-sm italic">
          Click anywhere to launch secure cloud instance →
        </p>
      </div>

      {/* Visual cue - entire box is clickable */}
      <div className="px-5 py-2 bg-red-600/10 flex items-center justify-center">
        <span className="text-[#856404]/70 text-xs font-mono">
          [ Click to Launch Secure Cloud ($5/mo) ]
        </span>
      </div>
    </Link>
  )
}
