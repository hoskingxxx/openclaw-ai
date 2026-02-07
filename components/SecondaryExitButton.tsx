/**
 * SecondaryExitButton - "Deploy on Vultr" CTA for decision gate exit pages
 *
 * Used in MDX content to render styled links with Umami tracking.
 * This component handles the Vultr affiliate link with all necessary tracking.
 */

import { Button } from "@/components/ui/Button";

interface SecondaryExitButtonProps {
  href: string;
  umamiEventPlacement?: string;
  umamiEventContent?: string;
  umamiEventPost?: string;
  umamiEventRef?: string;
  children: React.ReactNode;
}

export function SecondaryExitButton({
  href,
  umamiEventPlacement = "article_link",
  umamiEventContent = "article_link",
  umamiEventPost = "",
  umamiEventRef = "9864821-9J",
  children,
}: SecondaryExitButtonProps) {
  return (
    <Button
      variant="info"
      size="sm"
      href={href}
      external
      data-cta="true"
      data-umami-event="secondary_exit_click"
      data-umami-event-post={umamiEventPost}
      data-umami-event-placement={umamiEventPlacement}
      data-umami-event-content={umamiEventContent}
      data-umami-event-ref={umamiEventRef}
    >
      {children}
    </Button>
  );
}
