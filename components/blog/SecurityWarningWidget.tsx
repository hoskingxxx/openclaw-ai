/**
 * Security Warning Widget - Blog Post Injection
 * ===============================================
 * Injected immediately after H1 title on ALL blog posts.
 * Yellow background (#FFF3CD), Dark text (#856404), Red border.
 * Focus: Switch to Cloud Sandbox (Vultr CTA).
 */

import Link from "next/link"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=blog_warning&utm_campaign=security_funnel"

interface SecurityWarningWidgetProps {
  postTitle?: string
}

export function SecurityWarningWidget({ postTitle }: SecurityWarningWidgetProps) {
  return (
    <div className="my-6 mx-4 max-w-4xl">
      {/* Main Warning Box */}
      <div
        className="border-2 border-red-600 bg-[#FFF3CD] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        {/* Clickable entire box -> Vultr */}
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
          className="block"
        >
          {/* Header with icon */}
          <div className="px-5 py-4 border-b border-red-600/50 flex items-start gap-3">
            <span className="text-2xl animate-pulse">🚨</span>
            <div className="flex-1">
              <p className="font-bold text-lg md:text-xl text-[#856404] mb-1">
                SECURITY WARNING
              </p>
              <p className="text-base md:text-lg text-[#856404]/90">
                This tutorial requires <strong className="text-[#856404]">Sudo/Root Privileges</strong>.
                Executing experimental agents on your main OS is dangerous.
              </p>
            </div>
          </div>

          {/* Main warning body */}
          <div className="px-5 py-4 space-y-3">
            <p className="text-base md:text-lg text-[#856404]">
              <strong className="font-bold">Recommended:</strong> Execute this in a{" "}
              <Link
                href={LINK_VULTR}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="underline decoration-red-600/50 underline-offset-2 hover:decoration-red-600 transition-all font-bold text-[#856404]"
              >
                Disposable Vultr Sandbox
              </Link>{" "}
              to protect your personal data.
            </p>

            <p className="text-sm md:text-base text-[#856404]/70 italic">
              Stop fixing OOM errors. Your real problem is Root Access Vulnerability.
            </p>

            <p className="text-sm md:text-base text-[#856404]/70">
              Switch to Cloud Sandbox immediately.
            </p>

            {/* CTA Arrow */}
            <div className="text-center mt-4">
              <span className="text-4xl md:text-5xl">↓</span>
              <p className="text-sm md:text-base text-[#856404] font-mono">
                Click anywhere to open Vultr
              </p>
            </div>
          </div>
        </Link>

        {/* Coffee Widget - Keep on blog posts */}
        <div className="px-5 py-3 bg-background rounded-lg border border-border">
          <div className="flex items-center gap-3">
            <span className="text-2xl">☕</span>
            <p className="text-sm text-text-secondary">
              Found this guide helpful?{" "}
              <a
                href="https://www.buymeacoffee.com/to/openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:text-brand-hover underline font-mono"
              >
                Buy Me A Coffee
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
