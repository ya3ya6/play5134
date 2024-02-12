import { useRef } from "react";

import { isBefore } from "date-fns";
import { useAtom } from "jotai";

import { TimeInput } from "@/components/time-input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { startTimeAtom, stopTimeAtom } from "@/lib/atoms";

export const StopTimeInput = () => {
  const [startTime] = useAtom(startTimeAtom);
  const [stopTime, setStopTime] = useAtom(stopTimeAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <TimeInput
          value={stopTime}
          onChange={setStopTime}
          onFocus={() => inputRef.current?.select()}
          spanOfDays={isBefore(stopTime, startTime) ? 1 : undefined}
          className="w-28"
        />
      </TooltipTrigger>
      <TooltipContent>Stop time</TooltipContent>
    </Tooltip>
  );
};
