import { useRef } from "react";

import { addSeconds } from "date-fns";
import { useAtom } from "jotai";
import { useInterval } from "react-use";

import { ProjectInput } from "@/components/project-input";
import { TagInput } from "@/components/tag-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  addTimeEntryAtom,
  descriptionAtom,
  projectAtom,
  startTimeAtom,
  stopTimeAtom,
  tagsAtom,
  timeModeAtom,
  timerRunningAtom,
} from "@/lib/atoms";
import { getInitialDate } from "@/lib/utils";
import {
  ArrowRightIcon,
  PlayIcon,
  PlusIcon,
  SquareIcon,
} from "@radix-ui/react-icons";

import { DurationInput } from "./duration-input";
import { StartTimeInput } from "./start-time-input";
import { StopTimeInput } from "./stop-time-input";

export const TimeForm = () => {
  const [timeMode, setTimeMode] = useAtom(timeModeAtom);
  const [timerRunning, setTimerRunning] = useAtom(timerRunningAtom);
  const [_startTime, setStartTime] = useAtom(startTimeAtom);
  const [stopTime, setStopTime] = useAtom(stopTimeAtom);
  const [description, setDescription] = useAtom(descriptionAtom);
  const [project, setProject] = useAtom(projectAtom);
  const [tags, setTags] = useAtom(tagsAtom);
  const [, addTimeEntry] = useAtom(addTimeEntryAtom);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  useInterval(
    () => setStopTime(addSeconds(stopTime, 1)),
    timerRunning ? 1000 : null,
  );

  function toggleTimeMode() {
    setTimeMode(timeMode === "timer" ? "manual" : "timer");
    setTimerRunning(false);
    const now = getInitialDate();
    setStartTime(now);
    setStopTime(now);
  }

  return (
    <div className="flex h-20 items-center bg-white shadow-md">
      <Input
        ref={descriptionInputRef}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={
          timerRunning
            ? "(no description)"
            : timeMode === "manual"
            ? "What have you done?"
            : "What are you working on?"
        }
        className="h-full border-none py-0 pl-5 text-lg shadow-none focus-visible:ring-0"
      />
      <div className="flex flex-shrink-0 items-center gap-x-4 p-4">
        <div className="flex gap-x-1">
          <ProjectInput value={project} onChange={setProject} />
          <TagInput value={tags} onChange={setTags} />
        </div>
        {timeMode === "manual" ? (
          <>
            <StartTimeInput />
            <ArrowRightIcon />
            <StopTimeInput />
          </>
        ) : (
          <DurationInput />
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            {timeMode === "manual" ? (
              <Button
                onClick={() => {
                  addTimeEntry();
                }}
                className="h-9 w-9 rounded-full p-0 text-white ring-4 ring-accent/50"
              >
                <PlusIcon className="h-6 w-6" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (timerRunning) {
                    addTimeEntry();
                  } else {
                    descriptionInputRef.current?.focus();
                  }
                  setTimerRunning(!timerRunning);
                }}
                className="h-9 w-9 rounded-full p-0 text-white ring-4 ring-accent/50"
              >
                {timerRunning ? (
                  <SquareIcon className="h-4 w-4" />
                ) : (
                  <PlayIcon className="h-6 w-6" />
                )}
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {timeMode === "manual" ? "Add" : "Start "} time entry
          </TooltipContent>
        </Tooltip>
        <div className="flex flex-col items-center gap-y-2 rounded-full bg-muted p-0.5">
          <Tooltip open={timeMode === "timer" ? false : undefined}>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleTimeMode}
                variant={timeMode === "timer" ? "default" : "ghost"}
                className="h-4 w-4 rounded-full p-0.5"
              >
                <PlayIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Timer mode</TooltipContent>
          </Tooltip>
          <Tooltip open={timeMode === "manual" ? false : undefined}>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleTimeMode}
                variant={timeMode === "manual" ? "default" : "ghost"}
                className="h-4 w-4 rounded-full p-0.5"
              >
                <PlusIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Manual mode</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
