/**
 * AnswerCapsule - AEO (Answer Engine Optimization) Component
 *
 * Purpose: Provide immediate, scannable answers for Answer Engines
 * (Google SGE, Perplexity, ChatGPT) and users who want quick solutions.
 *
 * Usage: Wrap the core solution/fix in guides for "position zero" optimization.
 *
 * @example
 * <AnswerCapsule>
 *   **The Fix:** Run `npm install` and restart the server.
 *   This error occurs when Node modules are missing after installation.
 * </AnswerCapsule>
 */

import { ReactNode } from "react";
import { CheckIcon } from "./icons";

interface AnswerCapsuleProps {
  /**
   * Optional custom title (defaults to "Fast Fix (TL;DR)")
   */
  title?: string;

  /**
   * The answer content - supports markdown when used with MDX
   */
  children: ReactNode;

  /**
   * Optional severity level for visual hierarchy
   * @default "info"
   */
  variant?: "critical" | "warning" | "success" | "info";
}

const variantStyles = {
  critical: {
    border: "border-l-red-500",
    bg: "bg-red-500/10",
    icon: "text-red-400",
    iconBg: "bg-red-500/20",
  },
  warning: {
    border: "border-l-amber-500",
    bg: "bg-amber-500/10",
    icon: "text-amber-400",
    iconBg: "bg-amber-500/20",
  },
  success: {
    border: "border-l-green-500",
    bg: "bg-green-500/10",
    icon: "text-green-400",
    iconBg: "bg-green-500/20",
  },
  info: {
    border: "border-l-brand-primary",
    bg: "bg-brand-primary/10",
    icon: "text-brand-primary",
    iconBg: "bg-brand-primary/20",
  },
};

export function AnswerCapsule({
  title = "Fast Fix (TL;DR)",
  children,
  variant = "info",
}: AnswerCapsuleProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={`
        my-6 p-5 rounded-r-lg border-l-4 ${styles.border} ${styles.bg}
        glass-card
        answer-capsule
      `}
      data-answer-capsule="true"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${styles.iconBg} flex items-center justify-center`}>
          <CheckIcon className={`w-4 h-4 ${styles.icon}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm font-semibold ${styles.icon} mb-2 flex items-center gap-2`}>
            <span>⚡</span>
            <span>{title}</span>
          </h3>
          <div className="text-sm text-text-secondary leading-relaxed prose prose-invert prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Shortcut for critical fixes (red/urgent)
 */
export function CriticalFix({ children }: { children: ReactNode }) {
  return (
    <AnswerCapsule variant="critical" title="Critical Fix">
      {children}
    </AnswerCapsule>
  );
}

/**
 * Shortcut for quick wins (green/success)
 */
export function QuickFix({ children }: { children: ReactNode }) {
  return (
    <AnswerCapsule variant="success" title="Quick Fix">
      {children}
    </AnswerCapsule>
  );
}
