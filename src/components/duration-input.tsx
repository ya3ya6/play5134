import { useEffect, useRef, useState } from "react";

import { getHours, getMinutes, isBefore, set, sub } from "date-fns";
import { useAtom } from "jotai";

import { TimeInput } from "@/components/time-input";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  durationAtom,
  startTimeAtom,
  stopTimeAtom,
  timerRunningAtom,
} from "@/lib/atoms";
import { parseDuration } from "@/lib/utils";

export const DurationInput = () => {
  const [open, setOpen] = useState(false);
  const [timerRunning] = useAtom(timerRunningAtom);
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [stopTime, setStopTime] = useAtom(stopTimeAtom);
  const [duration] = useAtom(durationAtom);
  const [durationInput, setDurationInput] = useState(duration);
  const durationInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDurationInput(duration);
  }, [duration]);

  function validateDurationInput() {
    const parsed = parseDuration(durationInput);
    if (parsed === null) {
      setDurationInput(duration);
      return;
    }
    const { hours, minutes, seconds } = parsed;
    setStartTime(
      sub(stopTime, {
        hours,
        minutes,
        seconds,
      }),
    );
  }

  function validateDateInput(date: Date | undefined) {
    if (!date) {
      return;
    }
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverAnchor asChild>
            <div className="relative">
              <Input
                ref={durationInputRef}
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
                onFocus={() => setOpen(true)}
                onBlur={validateDurationInput}
                className="w-[7ch] border-none p-0 text-lg text-muted-foreground shadow-none focus:text-foreground focus-visible:ring-0"
              />
              {isBefore(stopTime, startTime) && (
                <span className="bg-black w-4 h-4 flex items-center justify-center text-white text-xs rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  1
                </span>
              )}
            </div>
          </PopoverAnchor>
        </TooltipTrigger>
        <TooltipContent side="bottom">Adjust duration</TooltipContent>
      </Tooltip>
      <PopoverContent
        onOpenAutoFocus={(e) => {
          // Focus the duration input on open and select its text.
          e.preventDefault();
          durationInputRef.current?.focus();
          durationInputRef.current?.select();
        }}
        onInteractOutside={(e) => {
          // Prevent dismissing when clicking the duration input.
          if (durationInputRef.current === e.target) {
            e.preventDefault();
          }
        }}
        className="flex w-96 flex-col items-center"
      >
        <div className="flex items-center justify-between gap-x-2">
          <TimeInput
            value={startTime}
            onChange={setStartTime}
            label="start"
            dateIndicator="text"
          />
          <TimeInput
            value={stopTime}
            onChange={setStopTime}
            label="stop"
            spanOfDays={isBefore(stopTime, startTime) ? 1 : undefined}
            disabled={timerRunning}
          />
        </div>
        <Separator className="mb-2 mt-6" />
        <Calendar
          mode="single"
          selected={startTime}
          onSelect={validateDateInput}
        />
      </PopoverContent>
    </Popover>
  );
};
