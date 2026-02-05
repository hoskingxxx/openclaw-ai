"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function StopDebuggingCTA() {
  const pathname = usePathname();
  return (
    <div className="my-12 p-6 border-l-4 border-[#FF4500] bg-slate-50 dark:bg-slate-900/50 rounded-r-lg shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            🛑 Still Stuck? Stop Debugging.
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            If you've spent more than 30 minutes on this error, it's likely your local environment battling the model requirements.
            <br />
            <span className="font-mono text-xs opacity-80 block mt-1">
              Reality: Debugging costs hours. Cloud GPUs cost minutes.
            </span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <a
            href="https://www.vultr.com/?ref=9863490"
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="vultr_click"
            data-umami-event-post={pathname?.split("/").filter(Boolean).pop() || ""}
            data-umami-event-source="stop_debugging_box"
            data-umami-event-intent="time_wasted"
            className="inline-flex items-center px-6 py-3 text-sm font-bold text-white transition-all bg-[#FF4500] rounded hover:bg-[#FF4500]/90 hover:scale-105 shadow-md"
          >
            Deploy on Vultr (Cloud GPU) →
          </a>
          <span className="text-[10px] text-slate-400">
            Disclosure: Affiliate link. No extra cost to you.
          </span>
        </div>
      </div>
    </div>
  );
}
