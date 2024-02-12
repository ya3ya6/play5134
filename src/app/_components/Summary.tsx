"use client";

import { useMemo } from "react";

import { intervalToDuration } from "date-fns";
import { useAtom } from "jotai";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { timeEntriesAtom } from "@/lib/atoms";

export const Summary = () => {
  const [timeEntries] = useAtom(timeEntriesAtom);

  const summary = useMemo(() => {
    let totalHours = 0;
    let totalMinutes = 0;
    let totalSeconds = 0;
    for (const group of timeEntries) {
      for (const timeEntry of group.timeEntries) {
        const { hours, minutes, seconds } = intervalToDuration({
          start: timeEntry.start,
          end: timeEntry.stop,
        });
        totalHours += hours || 0;
        totalMinutes += minutes || 0;
        totalSeconds += seconds || 0;
      }
    }
    const minutes = String(totalMinutes).padStart(2, "0");
    const seconds = String(totalSeconds).padStart(2, "0");
    return `${totalHours}:${minutes}:${seconds}`;
  }, [timeEntries]);

  return (
    <div className="px-5 py-3 flex font-semibold items-center justify-between">
      <span className="text-xs">THIS WEEK</span>
      <div className="flex items-center gap-x-8 h-9">
        <Separator orientation="vertical" />
        <div className="flex items-center gap-x-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex items-baseline gap-x-2 p-2 rounded-lg hover:bg-muted"
              >
                <span className="text-xs text-muted-foreground">
                  TODAY TOTAL
                </span>
                <span className="text-sm">{summary}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={2}>
              View today&apos;s summary report
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex items-baseline gap-x-2 p-2 rounded-lg hover:bg-muted"
              >
                <span className="text-xs text-muted-foreground">
                  WEEK TOTAL
                </span>
                <span className="text-sm">{summary}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={2}>
              View week&apos;s summary report
              <TooltipArrow />
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
