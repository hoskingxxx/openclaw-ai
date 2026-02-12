/**
 * Impossible Wall Widget - Blog Injection
 * =====================================
 * Terminal-style diagnostic widget for blog posts.
 * Positions Cloud as the ONLY viable fix for hardware limits.
 */

"use client"

import { useState } from "react"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=impossible_wall&utm_campaign=conversion_funnel"

export function ImpossibleWallWidget() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="my-8 mx-4 max-w-4xl">
      <div className="bg-gray-950 border border-green-500/50 rounded-lg overflow-hidden shadow-xl">
        {/* Terminal Header */}
        <div className="bg-gray-900 px-4 py-2 border-b border-green-500/30 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-green-400 font-mono text-sm flex-1">
            diagnostic_report.sh
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-5 font-mono text-sm space-y-4">
          {/* Diagnosis Line */}
          <div className="flex items-start gap-2">
            <span className="text-green-400">$</span>
            <span className="text-gray-400">./detect-hardware-limit.sh</span>
          </div>

          {/* DIAGNOSTIC OUTPUT */}
          <div className="bg-black/50 rounded p-4 space-y-2 border border-red-500/30">
            <p className="text-red-400 font-bold">
              DIAGNOSTIC: DETECTED
            </p>
            <p className="text-yellow-400">
              Status: Insufficient Local Resources / Environment Conflict
            </p>
            <div className="h-px bg-red-500/30 my-2"></div>
            <p className="text-gray-300">
              Root Cause Analysis:
            </p>
            <div className="ml-4 space-y-1 text-gray-400 text-xs">
              <p>• VRAM Available: <span className="text-red-400">Insufficient</span></p>
              <p>• Required for OpenClaw: <span className="text-yellow-400">24GB+</span></p>
              <p>• Root Access Required: <span className="text-red-400">YES (Risk Factor: HIGH)</span></p>
            </div>
          </div>

          {/* REALITY CHECK */}
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-4">
            <p className="text-yellow-400 font-bold mb-2">
              REALITY CHECK:
            </p>
            <p className="text-gray-300 text-sm">
              Fixing this locally requires <span className="text-red-400 font-bold">24GB+ VRAM</span> and <span className="text-red-400 font-bold">Root Access</span>.
            </p>
            <p className="text-gray-300 text-sm mt-1">
              Success rate: <span className="text-red-400 font-bold">&lt;10%</span>
            </p>
          </div>

          {/* CTA Button */}
          <a
            href={LINK_VULTR}
            target="_blank"
            rel="noopener noreferrer sponsored"
            data-umami-event="vultr_outbound"
            data-umami-partner="vultr"
            data-umami-placement="impossible_wall"
            data-umami-offer="cloud_gpu"
            data-umami-intent="escape"
            data-umami-context="diagnostic"
            className="block w-full py-4 px-6 bg-green-600 hover:bg-green-500 text-white font-bold text-center rounded-lg transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <span>🚀 SKIP DEBUGGING & LAUNCH CLOUD ($5)</span>
          </a>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="text-xs text-gray-500 hover:text-gray-400 underline mx-auto block"
          >
            I understand the risk. Continue reading
          </button>
        </div>
      </div>
    </div>
  )
}
