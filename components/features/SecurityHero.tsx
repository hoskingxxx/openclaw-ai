/**
 * Security Hero - "The Gate" (High-Security Funnel)
 * =====================================================
 * High-contrast security advisory that replaces the original Hero.
 * Dark background, Monospace font, Red/Yellow/Green colors.
 */

import Link from "next/link"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=hero&utm_campaign=security_gate"

export function SecurityHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 bg-black">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="mb-10 inline-flex items-center px-6 py-2 rounded-full border-2 border-yellow-500 bg-yellow-500/20 font-bold text-yellow-400 font-mono">
          <span className="text-2xl">⚠️</span>
          <span>HARDWARE LIMIT DETECTED</span>
        </div>

        <h1 className="text-6xl font-bold mb-8 text-center text-red-400 font-mono leading-tight">
          Stop Fighting Your Hardware. Run OpenClaw Safely.
        </h1>

        <h2 className="text-2xl font-bold mb-6 text-center text-red-400 font-mono">
          Local deployment = <span className="text-yellow-400">OOM Errors</span> + <span className="text-yellow-400">Root Risks</span>. Cloud Sandbox = Instant Success.
        </h2>

        <div className="mb-10 max-w-3xl mx-auto space-y-4">
          <div className="bg-gray-900/80 border border-red-500/30 rounded-lg p-6">
            <div className="space-y-3 text-base md:text-lg text-gray-300 font-mono">
              <p className="flex items-start">
                <span className="text-red-400 mr-3">►</span>
                <span className="text-white">Local debugging fails because:</span>
              </p>

              <div className="ml-6 space-y-2">
                <p className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-white">VRAM Limit:</span> <span className="text-green-400">Consumer cards {'<'}24GB cannot run R1</span>
                </p>

                <p className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-white">OOM Errors:</span> <span className="text-green-400">CUDA out of memory is unfixable locally</span>
                </p>

                <p className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-white">Root Risk:</span> <span className="text-green-400">Agents need full system access</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-red-500/30">
                <p className="text-xl font-bold text-red-400">
                  STOP FIGHTING YOUR HARDWARE.
                </p>
              </div>
            </div>
          </div>
        </div>

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
            className="w-full sm:w-auto px-12 py-6 text-xl font-bold text-white rounded-lg border-2 border-green-400 bg-green-600 hover:bg-green-500 shadow-2xl flex items-center justify-center gap-3"
          >
            <span className="font-mono">
              [ LAUNCH CLOUD SANDBOX ($5/mo) {'>>'} ]
            </span>
          </a>
        </div>

        <div className="text-center">
          <Link
            href="#guides"
            className="text-sm font-mono text-gray-400 hover:text-gray-300 underline"
          >
            I accept the risk. Continue to local guides &darr;
          </Link>
        </div>
      </div>
    </section>
  )
}
