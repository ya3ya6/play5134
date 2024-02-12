"use client";

import { useAtom } from "jotai";

import Logo from "@/assets/svgs/logo.svg";
import { Button } from "@/components/ui/button";
import { sidebarOpenAtom } from "@/lib/atoms";
import { ViewVerticalIcon } from "@radix-ui/react-icons";

export const Header = () => {
  const [open, setOpen] = useAtom(sidebarOpenAtom);

  return (
    <header className="flex h-20 w-full items-center gap-x-4 bg-header px-4 py-2.5 text-header-foreground lg:hidden">
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        className="h-8 w-8 rounded-full bg-header-muted p-0 text-header-muted-foreground hover:bg-header-muted hover:text-header-muted-foreground"
      >
        <ViewVerticalIcon />
      </Button>
      <Logo />
    </header>
  );
};
