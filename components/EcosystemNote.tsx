/**
 * EcosystemNote - Standard blockquote for OpenClaw ecosystem context
 *
 * Used across all troubleshooting/guide articles to provide rebranding context
 * and link to FAQ for more information.
 */

export function EcosystemNote() {
  return (
    <blockquote className="my-6 border-l-4 border-orange-500/50 bg-orange-500/5 pl-4 italic text-text-secondary">
      Still confused by the instability? It&apos;s not just you. Some of it comes from rapid rebranding and ecosystem churn. See the <a href="/faq" className="text-orange-400 hover:text-orange-300 underline underline-offset-4">FAQ</a> for context.
    </blockquote>
  );
}
