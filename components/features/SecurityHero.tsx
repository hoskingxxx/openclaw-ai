/**
 * Security Hero - "The Gate"
 * ========================
 * High-contrast security advisory that replaces the original Hero.
 * Dark mode, yellow/red warning accents, monospace font for "System" feel.
 */

import Link from "next/link"
import { Button } from "@/components/ui/Button"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=hero&utm_campaign=security_gate"

export function SecurityHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 bg-background">
      {/* Dark gradient overlay for "System Warning" feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* UI Construction: Rail + Edge pattern */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* System Advisory Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center px-6 py-2 rounded-full bg-yellow-500/10 border-2 border-yellow-500/50 text-sm font-mono text-yellow-400 break-words">
              <span className="mr-2 text-base">⚠️</span>
              <span className="font-bold">SYSTEM ADVISORY</span>
            </span>
          </div>

          {/* Main Warning Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-mono text-red-400 font-bold mb-8 text-center leading-tight tracking-tight">
            Local OpenClaw Deployment Risks
          </h1>

          {/* Risk Details - Monospace System Feel */}
          <div className="max-w-3xl mx-auto mb-10 space-y-4">
            <div className="bg-black/50 border border-red-500/30 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-lg md:text-xl font-mono text-yellow-200 mb-4 leading-relaxed">
                Running autonomous agents locally grants <span className="text-red-400 font-bold">Root-Level Access</span> to your host machine.
              </p>

              <div className="space-y-3 text-base md:text-lg font-mono text-gray-300">
                <p className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span><strong className="text-white">File System:</strong> Full Read/Write access</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span><strong className="text-white">Credentials:</strong> SSH Keys & API Tokens</span>
                </p>
                <p className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span><strong className="text-white">Browser:</strong> Active Session Cookies</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-red-500/30">
                <p className="text-xl md:text-2xl font-mono text-red-400 font-bold">
                  ISOLATE THE BLAST RADIUS.
                </p>
              </div>
            </div>

            {/* Primary CTA: Launch Secure Cloud */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href={LINK_VULTR}
                target="_blank"
                rel="noopener noreferrer sponsored"
                data-umami-event="revenue_outbound"
                data-umami-partner="vultr"
                data-umami-placement="security_gate"
                data-umami-offer="cloud_gpu"
                data-umami-intent="escape"
                data-umami-context="security"
                className="w-full sm:w-auto px-10 py-5 text-xl font-mono font-bold text-white bg-green-600 hover:bg-green-500 rounded-lg border-2 border-green-400 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-900/20 hover:shadow-green-900/40"
              >
                <span>[ LAUNCH SECURE CLOUD INSTANCE ($5/mo) ]</span>
              </a>
            </div>

            {/* Secondary Link: Accept Risk */}
            <div className="text-center">
              <Link
                href="#guides"
                className="text-sm font-mono text-gray-400 hover:text-gray-300 underline transition-colors"
              >
                I accept the risk. Continue to local guides ↓
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
