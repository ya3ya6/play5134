"use client";

import { ComponentPropsWithRef, forwardRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type SidebarPanelItemProps = ComponentPropsWithRef<"button"> & {
  children: ReactNode;
  tooltip?: string;
  className?: string;
};
export const SidebarPanelItem = forwardRef<
  HTMLButtonElement,
  SidebarPanelItemProps
>((props, ref) => {
  const { children, tooltip, className, ...rest } = props;
  return (
    <Tooltip>
      <div className="py-2.5">
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            size="icon"
            className={cn(
              "bg-header p-0 text-header-foreground hover:bg-header hover:text-header-foreground",
              className,
            )}
            {...rest}
          >
            {children}
          </Button>
        </TooltipTrigger>
      </div>
      <TooltipContent side="right">
        {tooltip}
        <TooltipArrow />
      </TooltipContent>
    </Tooltip>
  );
});
SidebarPanelItem.displayName = "SidebarPanelItem";
