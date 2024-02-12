import { useRef, useState } from "react";

import { getHours, getMinutes, set } from "date-fns";
import { useAtom } from "jotai";

import { TimeInput } from "@/components/time-input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { startTimeAtom } from "@/lib/atoms";

export const StartTimeInput = () => {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [stopTime, setStopTime] = useAtom(startTimeAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverAnchor ref={inputRef} asChild>
            <TimeInput
              value={startTime}
              onChange={setStartTime}
              onFocus={() => setOpen(true)}
              dateIndicator="text"
              className="w-40"
            />
          </PopoverAnchor>
        </TooltipTrigger>
        <TooltipContent>Start time</TooltipContent>
      </Tooltip>
      <PopoverContent
        onOpenAutoFocus={(e) => {
          // Focus the time input on open and select its text.
          e.preventDefault();
          inputRef.current?.focus();
          inputRef.current?.select();
        }}
        onInteractOutside={(e) => {
          // Prevent dismissing when clicking the time input.
          if (inputRef.current === e.target) {
            e.preventDefault();
          }
        }}
      >
        <Calendar
          mode="single"
          selected={startTime}
          onSelect={(date) => {
            if (date) {
              setStartTime(
                set(date, {
                  hours: getHours(startTime),
                  minutes: getMinutes(startTime),
                  seconds: 0,
                  milliseconds: 0,
                }),
              );
              setStopTime(
                set(date, {
                  hours: getHours(stopTime),
                  minutes: getMinutes(stopTime),
                  seconds: 0,
                  milliseconds: 0,
                }),
              );
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
