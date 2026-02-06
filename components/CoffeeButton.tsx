/**
 * CoffeeButton - "Buy me a coffee" CTA button
 *
 * Used in MDX content for author support links.
 */

import { Button } from "@/components/ui/Button";

interface CoffeeButtonProps {
  href: string;
  children: React.ReactNode;
}

export function CoffeeButton({ href, children }: CoffeeButtonProps) {
  return (
    <Button
      variant="brand"
      size="sm"
      href={href}
      external
      data-cta="true"
    >
      {children}
    </Button>
  );
}
