"use client";

import { ComponentPropsWithRef } from "react";

import { useAtom } from "jotai";

import { Separator } from "@/components/ui/separator";
import { durationAtom, timerRunningAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { ClockIcon } from "@radix-ui/react-icons";

import { EditTimeEntryPopover } from "./edit-time-entry-popover";
import { Workspace } from "./workspace";

type SidebarContentProps = ComponentPropsWithRef<"div">;
export const SidebarContent = ({
  className,
  ...props
}: SidebarContentProps) => {
  const [timerRunning] = useAtom(timerRunningAtom);
  const [duration] = useAtom(durationAtom);

  return (
    <div
      className={cn(
        "w-[var(--sidebar-content-width)] bg-sidebar text-sidebar-foreground lg:w-48",
        className,
      )}
      {...props}
    >
      <Workspace />
      <Separator className="bg-header" />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-y-6 py-6">
          <div>
            <h6 className="mb-2 pl-4 text-xs uppercase text-sidebar-foreground/50">
              track
            </h6>
            <div
              className={cn(
                "w-full cursor-pointer h-8 justify-between rounded-none bg-primary flex items-center px-4 text-primary-foreground",
                className,
              )}
            >
              <div className="flex items-center gap-x-3">
                <ClockIcon />
                <span>{timerRunning ? duration : "Timer"}</span>
              </div>
              {timerRunning && <EditTimeEntryPopover />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
