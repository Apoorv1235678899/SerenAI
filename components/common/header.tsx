"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle, AudioWaveform, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignInButton } from "@/components/auth/sign-in-button";
import { useSession } from "@/lib/contexts/session-context";

export function Header() {
  const { isAuthenticated, logout } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="fixed top-0 z-50 w-full border-b border-border bg-background/95 shadow-sm backdrop-blur-xl">
      <header className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <AudioWaveform className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-semibold tracking-tight text-foreground">
              SerenAI
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Button asChild className="hidden gap-2 sm:flex">
                  <Link href="/dashboard">
                    <MessageCircle aria-hidden="true" />
                    Open dashboard
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="hidden text-muted-foreground hover:text-foreground sm:inline-flex"
                >
                  <LogOut aria-hidden="true" />
                  Sign out
                </Button>
              </>
            ) : (
              <SignInButton className="hidden sm:inline-flex" />
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="border-t border-border py-3 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Button asChild className="mt-2 w-full">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <MessageCircle aria-hidden="true" />
                  Open dashboard
                </Link>
              </Button>
            ) : (
              <Button asChild className="mt-2 w-full">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Sign in
                </Link>
              </Button>
            )}
          </nav>
        )}
      </header>
    </div>
  );
}