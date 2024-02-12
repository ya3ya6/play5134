"use client";

import { useEffect, useState } from "react";

import { format, sub } from "date-fns";
import { useAtom } from "jotai";
import { useQuery } from 'react-query';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  addTimeEntryAtom,
  descriptionAtom,
  durationAtom,
  projectAtom,
  startTimeAtom,
  stopTimeAtom,
  tagsAtom,
  timerRunningAtom,
} from "@/lib/atoms";
import { fetchTags, fetchProjects } from '../services/apiService';

import { parseDuration } from "@/lib/utils";
import { ArrowRightIcon, Pencil1Icon, SquareIcon } from "@radix-ui/react-icons";

import { ProjectInput } from "./project-input";
import { TagInput } from "./tag-input";
import { TimeInput } from "./time-input";

export const EditTimeEntryPopover = () => {
  const [timerRunning, setTimerRunning] = useAtom(timerRunningAtom);

  const [description, setDescription] = useAtom(descriptionAtom);
  const [startTime, setStartTime] = useAtom(startTimeAtom);
  const [stopTime] = useAtom(stopTimeAtom);
  const [duration] = useAtom(durationAtom);
  const [project, setProject] = useAtom(projectAtom);
  const [tags, setTags] = useAtom(tagsAtom);

  const [descriptionInput, setDescriptionInput] = useState(description);
  const [durationInput, setDurationInput] = useState(duration);
  const [durationInputFocued, setDurationInputFocued] = useState(false);

  const [, addTimeEntry] = useAtom(addTimeEntryAtom);

  const { data: apiTags, isLoading: tagsIsLoading, isError: tagsIsError, error: tagsError } = useQuery('tags', fetchTags);
  const { data: apiProjects, isLoading: projectsIsLoading, isError: projectsIsError, error: projectsError } = useQuery('projects', fetchProjects);

  useEffect(() => {
    if(apiTags){
      console.log(apiTags);
      setTags(apiTags);
    }
  }, [apiTags]);

  useEffect(() => {
    if(apiProjects){
      console.log(apiProjects);
    }
  }, [apiProjects]);

  useEffect(() => {
    setDescriptionInput(description);
  }, [description]);

  useEffect(() => {
    if (!durationInputFocued) {
      setDurationInput(duration);
    }
  }, [duration, durationInputFocued]);

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

  return (
    <Popover>
      <PopoverTrigger>
        <Button size="icon" className="shadow-none">
          <Pencil1Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-96">
        <div>
          <Button
            onClick={() => {
              if (timerRunning) {
                addTimeEntry();
              }
              setTimerRunning(!timerRunning);
            }}
            className="h-6 w-6 rounded-full p-0"
          >
            <SquareIcon className="h-3 w-3" />
          </Button>
        </div>
        <div className="mt-4">
          <Input
            value={descriptionInput}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="(no description)"
            className="text-lg"
          />
        </div>
        <div className="mt-4 flex items-center gap-x-1 w-full">
          <ProjectInput value={project} onChange={setProject} />
          <TagInput value={tags} onChange={setTags} showTags={true} />
        </div>
        <div className="flex items-center gap-x-1 mt-1">
          <TimeInput
            value={startTime}
            onChange={setStartTime}
            className="w-32"
            dateIndicator="datepicker"
          />
          <ArrowRightIcon />
          <span className="text-sm py-1 px-3 w-24 flex items-baseline">
            {format(stopTime, "hh:mm a")}
          </span>
          <Input
            value={durationInput}
            onChange={(e) => setDurationInput(e.target.value)}
            onFocus={() => setDurationInputFocued(true)}
            onBlur={() => {
              validateDurationInput();
              setDurationInputFocued(false);
            }}
            className="w-24 border-none shadow-none text-sm items-baseline text-muted-foreground focus:text-foreground"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
