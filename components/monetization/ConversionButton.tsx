/**
 * ConversionButton - Buy Me a Coffee with lean analytics
 *
 * Tracks user gratitude at the exact moment of success
 */

"use client";

import { usePathname } from "next/navigation";
import { CoffeeIcon } from "@/components/icons";

interface ConversionButtonProps {
  location: "article_code" | "tool_green";
  copy: string;
  variant?: "compact" | "full";
}

export function ConversionButton({ location, copy, variant = "full" }: ConversionButtonProps) {
  const pathname = usePathname();

  const handleClick = () => {
    // Track with Umami
    if (typeof window !== "undefined" && (window as any).umami) {
      (window as any).umami("bmc_click", {
        page_slug: pathname,
        location: location,
      });
    }
  };

  const bmcUrl = `https://buymeacoffee.com/openclaw?ref=${location}`;

  if (variant === "compact") {
    return (
      <a
        href={bmcUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-brand-primary transition-colors mt-4"
        data-umami-event="bmc_click"
        data-umami-page={pathname}
        data-umami-location={location}
      >
        <CoffeeIcon className="w-4 h-4" />
        <span>Support</span>
      </a>
    );
  }

  return (
    <div className="my-6 p-4 rounded-xl border border-brand-primary/20 bg-brand-primary/5">
      <p className="text-sm text-text-secondary mb-3 leading-relaxed">
        {copy}
      </p>
      <a
        href={bmcUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 hover:scale-105"
        data-umami-event="bmc_click"
        data-umami-page={pathname}
        data-umami-location={location}
      >
        <CoffeeIcon className="w-4 h-4" />
        Buy me a coffee
      </a>
    </div>
  );
}
