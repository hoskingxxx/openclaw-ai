/**
 * CodeBlockWithCTA - Code block with BMC button after successful fix
 *
 * Captures gratitude at the moment of success (when code works)
 */

import { CodeBlock } from "@/components/ui/CodeBlock";
import { ConversionButton } from "@/components/monetization/ConversionButton";

interface CodeBlockWithCTAProps {
  title?: string;
  code: string;
  language?: string;
  onCopy?: () => void;
  showCTA?: boolean;
}

export function CodeBlockWithCTA({
  title,
  code,
  language = "bash",
  onCopy,
  showCTA = true
}: CodeBlockWithCTAProps) {
  return (
    <>
      <CodeBlock title={title} code={code} language={language} onCopy={onCopy} />

      {showCTA && (
        <ConversionButton
          location="article_code"
          copy="Code works? Great. Debugging at 2 a.m. is brutal. 😅 If this fix saved your night, you can support the server."
          variant="compact"
        />
      )}
    </>
  );
}
