"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/content/mkcalling/nav";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, opts?: { startsWith?: boolean }) => {
    if (!pathname) return false;
    if (opts?.startsWith) return pathname === href || pathname.startsWith(href + "/");
    return pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/mKCalling_Logo.png" 
                alt="mKcalling logo" 
                width={120} 
                height={40} 
                priority 
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-border/50 hover:bg-card transition-colors"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.filter(item => !item.cta).map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                aria-current={isActive(item.href, { startsWith: item.href !== '/' }) ? 'page' : undefined}
                className={`text-sm hover:text-foreground transition-colors relative ${isActive(item.href, { startsWith: item.href !== '/' }) ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                {item.label}
                {isActive(item.href, { startsWith: item.href !== '/' }) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded" />
                )}
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/schedule-demo">
              <Button size="sm" className="bg-primary text-primary-foreground hover:shadow-glow-primary transition-all border border-primary/50">
                Schedule a Demo
              </Button>
            </Link>
          </nav>
        </div>
        {/* Mobile nav panel */}
        {open && (
          <div className="md:hidden mt-3 border border-border/50 rounded-xl bg-card/60 backdrop-blur-sm p-4 space-y-3">
            {navItems.filter(item => !item.cta).map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={() => setOpen(false)} 
                className="block text-sm text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Link href="/schedule-demo" onClick={() => setOpen(false)} className="flex-1">
                <Button size="sm" className="w-full bg-primary text-primary-foreground border border-primary/50">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
