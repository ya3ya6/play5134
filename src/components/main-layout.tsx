"use client";

import { type ReactNode } from "react";

import { useAtom } from "jotai";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { sidebarLockedAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";

export const MainLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarLocked] = useAtom(sidebarLockedAtom);
  return (
    <div
      className={cn(
        "[--sidebar-width:29rem] lg:[--sidebar-width:15rem]",
        "[--sidebar-content-width:26rem] lg:[--sidebar-content-width:12rem]",
        "[--sidebar-panel-width:3rem]",
      )}
    >
      <Header />
      <Sidebar />
      <main
        className={cn(
          sidebarLocked
            ? "lg:ml-[var(--sidebar-width)]"
            : "lg:ml-[var(--sidebar-panel-width)]",
        )}
      >
        {children}
      </main>
    </div>
  );
};
