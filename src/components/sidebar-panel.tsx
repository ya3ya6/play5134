"use client";

import { ComponentPropsWithoutRef } from "react";

import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import Div100vh from "react-div-100vh";

import Power from "@/assets/svgs/power.svg";
import SidebarClose from "@/assets/svgs/sidebar-close.svg";
import SidebarOpen from "@/assets/svgs/sidebar-open.svg";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { sidebarLockedAtom, sidebarOpenAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  Cross2Icon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";

import { SidebarPanelItem } from "./sidebar-panel-item";

type SidebarPanelProps = ComponentPropsWithoutRef<"div"> & {
  className?: string;
};
export const SidebarPanel = ({ className, ...rest }: SidebarPanelProps) => {
  const [_, setOpen] = useAtom(sidebarOpenAtom);
  const [locked, setLocked] = useAtom(sidebarLockedAtom);

  // TODO: get profile from api
  const profile = {
    name: "Name",
    email: "fake@gmail.com",
    image: "https://picsum.photos/200",
  };

  return (
    <Div100vh
      className={cn(
        "z-50 flex min-w-[var(--sidebar-panel-width)] flex-col items-center justify-between bg-header pb-1 pt-2 text-header-foreground",
        className,
      )}
      {...rest}
    >
      <div>
        <div className="flex items-center justify-center py-2.5 lg:hidden">
          <Button
            onClick={() => setOpen(false)}
            variant="ghost"
            size="icon"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-header-muted p-0 text-header-muted-foreground hover:bg-header-muted hover:text-header-muted-foreground"
          >
            <Cross2Icon />
          </Button>
        </div>
        <div className="flex items-center justify-center py-2">
          <button>
            <Power />
          </button>
        </div>
      </div>

      <div className="hidden items-center lg:flex">
        <button onClick={() => setLocked(!locked)}>
          {locked ? <SidebarClose /> : <SidebarOpen />}
        </button>
      </div>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <SidebarPanelItem
              tooltip="My profile"
              className="flex flex-col items-center gap-y-2"
            >
              <Image
                alt="Profile image"
                src={profile.image}
                width={24}
                height={24}
                className="rounded-full border border-header-muted"
              />
              <span className="text-[0.5rem] font-medium leading-[8px]">
                PROFILE
              </span>
            </SidebarPanelItem>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            sideOffset={8}
            className="rounded-lg bg-white text-foreground shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>
              <Image
                alt="Profile image"
                src={profile.image}
                width={40}
                height={40}
                className="rounded-full border border-header-muted"
              />
            </div>
            <Separator className="my-2.5" />
            <Link
              href="#"
              className="flex h-7 items-center text-sm hover:text-muted-foreground"
            >
              Profile settings
            </Link>
            <button className="flex h-7 w-full items-center text-start text-sm hover:text-muted-foreground">
              Keyboard shortcuts
            </button>
            <Separator className="my-2.5" />
            <button className="flex h-7 w-full items-center text-start text-sm hover:text-muted-foreground">
              Log out
            </button>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <SidebarPanelItem tooltip="Notifications" className="h-8 w-8">
              <BellIcon className="" />
            </SidebarPanelItem>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            sideOffset={8}
            className="rounded-lg bg-white text-foreground shadow-md"
          >
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="uppercase">notifications</span>
              <Button variant="default" size="sm" className="uppercase">
                mark all as read
              </Button>
            </div>
            <div className="mt-4 flex flex-col">
              <p className="mb-1 text-sm font-medium">
                Dark theme available ✨
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                You can view Toggl Track in dark, light theme or make it follow
                system setting.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 self-end uppercase"
              >
                Switch to Dark Theme
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <SidebarPanelItem tooltip="Advice and answers" className="h-8 w-8">
          <QuestionMarkCircledIcon />
        </SidebarPanelItem>
      </div>
    </Div100vh>
  );
};
