/**
 * Security Warning Widget - Blog Post Injection
 * ===============================================
 * Simplified warning for blog posts.
 */

import Link from "next/link"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=blog_warning&utm_campaign=security_funnel"

interface SecurityWarningWidgetProps {
  postSlug?: string
}

export function SecurityWarningWidget({ postSlug }: SecurityWarningWidgetProps) {
  return (
    <div className="my-6 mx-4 max-w-4xl">
      <Link
        href={LINK_VULTR}
        target="_blank"
        rel="noopener noreferrer sponsored"
        data-umami-event="vultr_outbound"
        data-umami-placement="blog_warning"
        data-umami-post={postSlug}
        className="block border-2 border-red-600 bg-[#FFF3CD] rounded-lg p-5 hover:shadow-lg transition-all cursor-pointer"
      >
        <p className="font-bold text-lg md:text-xl text-[#856404] mb-2">
          SECURITY WARNING
        </p>
        <p className="text-base md:text-lg text-[#856404]">
          This tutorial requires <strong>Sudo/Root Privileges</strong>.
          Recommended: Execute in a cloud sandbox to protect your personal data.
        </p>
      </Link>
    </div>
  )
}
