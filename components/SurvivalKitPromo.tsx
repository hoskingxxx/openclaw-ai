"use client"

import { Terminal } from "lucide-react"

// Feature Flag（工程保险丝）
const ENABLE_SURVIVAL_KIT_PROMO = true;

// Gumroad 产品链接
const GUMROAD_LINK = "https://hilda666888.gumroad.com/l/ymwwgm"

interface SurvivalKitPromoProps {
  context?: "guide" | "reality_check"
  status?: "green" | "yellow" | "red"
}

export function SurvivalKitPromo({ context = "guide", status }: SurvivalKitPromoProps) {
  // Feature Flag 检查
  if (!ENABLE_SURVIVAL_KIT_PROMO) {
    return null;
  }

  // Reality Check 场景的补充文案
  const realityCheckContext = context === "reality_check" && (status === "green" || status === "yellow");

  return (
    <div className="my-6 border border-amber-500/60 rounded-lg bg-slate-900 dark:bg-slate-950 shadow-lg">
      {/* Terminal Header 风格 */}
      <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border-b border-amber-500/30">
        <Terminal className="w-4 h-4 text-amber-500" />
        <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
          System Prescription
        </span>
      </div>

      <div className="p-5">
        {/* Headline */}
        <h4 className="text-lg font-bold text-white mb-3 font-mono">
          🛑 Stop Debugging. Start Shipping.
        </h4>

        {/* Body */}
        <p className="text-gray-300 mb-4 leading-relaxed text-sm">
          This is a <span className="text-amber-400 font-semibold">pre-made decision</span> for running DeepSeek R1 locally.
          Includes stabilized Modelfiles (8B / 32B),
          VRAM decision matrix, and emergency playbooks
          for when local setup is not worth it.
        </p>

        {/* Reality Check 补充文案 */}
        {realityCheckContext && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded text-sm">
            <p className="text-green-400 font-mono">
              ✓ Your hardware can run this.<br/>
              ✓ Skip tuning. Use stable configs.
            </p>
          </div>
        )}

        {/* CTA Button */}
        <a
          href={GUMROAD_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="marketing_affiliate_click"
          data-umami-partner="gumroad"
          data-umami-placement={context === "reality_check" ? `reality_check_${status}` : `guide_${context}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded transition-colors text-sm"
        >
          Download Survival Kit ($9.90)
        </a>

        {/* Footer */}
        <p className="mt-4 text-xs text-gray-500 font-mono">
          Includes API escape hatch when hardware is insufficient.
        </p>
      </div>
    </div>
  );
}
