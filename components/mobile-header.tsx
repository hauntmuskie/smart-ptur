"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileHeader() {
  const { toggleSidebar, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-border/40 border-b bg-background/80 px-4 backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
          <span className="font-bold text-sm">S</span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm leading-tight">SPK SMART</span>
          <span className="text-muted-foreground text-xs leading-tight">
            Penerbit Erlangga
          </span>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-10 shrink-0 rounded-xl transition-all hover:bg-accent/80 active:scale-95"
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
      >
        <Menu className="size-5" />
      </Button>
    </header>
  );
}
