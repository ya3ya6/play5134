"use client";

import { useState } from "react";

import { useAtom } from "jotai";
import { useDebounce, useMedia } from "react-use";

import { SidebarPanel } from "@/components/sidebar-panel";
import { sidebarLockedAtom, sidebarOpenAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";

import { SidebarContent } from "./sidebar-content";

export const Sidebar = () => {
  const [open, setOpen] = useAtom(sidebarOpenAtom);
  const [locked] = useAtom(sidebarLockedAtom);
  const [mouseInside, setMouseInside] = useState(false);
  const desktop = useMedia("(min-width: 1024px)");

  function handleMouseEnter() {
    if (!locked && !open) {
      setMouseInside(true);
    }
  }

  function handleMouseLeave() {
    if (desktop && !locked && open) {
      setMouseInside(false);
    }
  }

  useDebounce(() => setOpen(mouseInside), 100, [mouseInside]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={!desktop}>
      <Dialog.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        )}
      />
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Dialog.Content
          onInteractOutside={(e) => desktop && e.preventDefault()}
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex h-full border-r shadow-lg transition",
            "ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
          )}
        >
          <SidebarPanel />
          <SidebarContent />
        </Dialog.Content>
        <SidebarPanel className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex" />
      </div>
    </Dialog.Root>
  );
};
