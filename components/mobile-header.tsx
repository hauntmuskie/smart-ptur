"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileHeader() {
  const { toggleSidebar, isMobile } = useSidebar();

  if (!isMobile) return null;

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden">
      <div className="flex flex-col">
        <span className="font-bold text-sm">SPK SMART</span>
        <span className="text-muted-foreground text-xs">Penerbit Erlangga</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="size-9 shrink-0"
        onClick={toggleSidebar}
        aria-label="Toggle navigation menu"
      >
        <Menu className="size-5" />
      </Button>
    </header>
  );
}
