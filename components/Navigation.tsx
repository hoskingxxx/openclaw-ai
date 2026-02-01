"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/lib/content";
import { MenuIcon, XIcon } from "./icons";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 移动端遮罩 */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-background-primary/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background-primary/60">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-hover flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <span className="text-white font-bold text-lg">🦞</span>
              </div>
              <span className="text-lg font-semibold text-text-primary hidden sm:block">OpenClaw</span>
            </Link>

            {/* 桌面导航 */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* 移动端菜单按钮 */}
            <button
              className="lg:hidden p-3 text-text-primary hover:bg-white/5 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "关闭菜单" : "打开菜单"}
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

          {/* 移动端导航菜单 */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
