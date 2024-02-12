"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  addDays,
  format,
  intervalToDuration,
  isBefore,
  isToday,
} from "date-fns";

import { ProjectInput } from "@/components/project-input";
import { TagInput } from "@/components/tag-input";
import { TimeInput } from "@/components/time-input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { parseDuration } from "@/lib/utils";
import type { TimeEntry } from "@/types";
import { DotsVerticalIcon, PlayIcon, RowsIcon } from "@radix-ui/react-icons";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<TimeEntry>();

export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  }),
  columnHelper.accessor((row) => row.description, {
    id: "description",
    cell: ({ getValue }) => {
      const initialValue = getValue();

      const [desc, setDesc] = useState(initialValue);

      useEffect(() => {
        setDesc(initialValue);
      }, [initialValue]);

      function handleSubmit() {
        // TODO: update timeEntry
      }

      return (
        <Input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          onBlur={handleSubmit}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="border-none px-0 shadow-none"
        />
      );
    },
    header: ({ table }) => (
      <div className="flex items-baseline gap-x-6">
        <span>
          {isToday(table.options.meta?.date as Date)
            ? "Today"
            : format(table.options.meta?.date as Date, "E, d LLL")}
        </span>
        {table.getColumn("select")?.getIsVisible() && (
          <div className="flex items-baseline gap-x-1">
            <span className="text-xs font-medium text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length}/100 selected
            </span>
            <Button
              onClick={() => {
                /* TODO: bulk edit selected timeEntries */
              }}
              disabled={table.getFilteredSelectedRowModel().rows.length === 0}
              variant="ghost"
              size="sm"
            >
              Bulk edit
            </Button>
            <Button
              onClick={() => {
                /* TODO: delete selected timeEntries */
              }}
              disabled={table.getFilteredSelectedRowModel().rows.length === 0}
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    ),
  }),
  columnHelper.display({
    id: "project",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-1 justify-end">
          <ProjectInput
            value={row.original.project}
            onChange={(newProject) => {
              /* TODO: update project */
            }}
            className="[@media(pointer:coarse)]:opacity-100 aria-expanded:opacity-100 opacity-0 group-hover:opacity-100"
          />
          <TagInput
            value={row.original.tags}
            onChange={(tags) => {
              /* TODO: update tags */
            }}
            showTags={true}
            className="[@media(pointer:coarse)]:opacity-100 opacity-0 group-hover:opacity-100 aria-expanded:opacity-100"
          />
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "startStop",
    cell: ({ row }) => {
      return (
        <span className="hidden text-right text-muted-foreground md:block">
          {format(row.original.start, "h:mm a")} -{" "}
          {format(row.original.stop, "h:mm a")}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "duration",
    cell: ({ row }) => {
      const startTime = row.original.start;
      const stopTime = row.original.stop;

      const duration = useMemo(() => {
        const interval = intervalToDuration({
          start: startTime,
          end: isBefore(stopTime, startTime) ? addDays(stopTime, 1) : stopTime,
        });
        const minutes = String(interval.minutes).padStart(2, "0");
        const seconds = String(interval.seconds).padStart(2, "0");
        return `${interval.hours}:${minutes}:${seconds}`;
      }, [startTime, stopTime]);

      const [open, setOpen] = useState(false);

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
        //TODO: update start time
        // const { hours, minutes, seconds } = parsed;
        // setStartTime(
        //   sub(stopTime, {
        //     hours,
        //     minutes,
        //     seconds,
        //   }),
        // );
      }

      function validateDateInput(date: Date | undefined) {
        if (!date) {
          return;
        }
        // TODO: update start and stop time
        // setStartTime(
        //   set(date, {
        //     hours: getHours(startTime),
        //     minutes: getMinutes(startTime),
        //     seconds: 0,
        //     milliseconds: 0,
        //   }),
        // );
        // setStopTime(
        //   set(date, {
        //     hours: getHours(stopTime),
        //     minutes: getMinutes(stopTime),
        //     seconds: 0,
        //     milliseconds: 0,
        //   }),
        // );
      }

      return (
        <Popover open={open} onOpenChange={setOpen}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverAnchor asChild>
                <div className="flex items-center justify-end">
                  <Input
                    ref={durationInputRef}
                    value={durationInput}
                    onChange={(e) => setDurationInput(e.target.value)}
                    onFocus={() => setOpen(true)}
                    onBlur={validateDurationInput}
                    className="w-[7ch] border-none p-0 text-muted-foreground text-right shadow-none focus:text-foreground focus-visible:ring-0"
                  />
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
                onChange={(value) => {
                  // TODO: update start time
                }}
                label="start"
                dateIndicator="text"
              />
              <TimeInput
                value={stopTime}
                onChange={(value) => {
                  // TODO: update stop time
                }}
                label="stop"
                spanOfDays={isBefore(stopTime, startTime) ? 1 : undefined}
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
    },
    header: ({ table }) => {
      let totalHours = 0;
      let totalMinutes = 0;
      let totalSeconds = 0;
      for (const timeEntry of table.options.data) {
        const { hours, minutes, seconds } = intervalToDuration({
          start: timeEntry.start,
          end: timeEntry.stop,
        });
        totalHours += hours || 0;
        totalMinutes += minutes || 0;
        totalSeconds += seconds || 0;
      }
      const minutes = String(totalMinutes).padStart(2, "0");
      const seconds = String(totalSeconds).padStart(2, "0");
      return (
        <span className=" flex items-baseline justify-end">
          {totalHours}:{minutes}:{seconds}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: () => (
      <div className="flex items-baseline justify-end gap-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="[@media(pointer:coarse)]:opacity-100 aria-expanded:opacity-100 opacity-0 group-hover:opacity-100"
        >
          <PlayIcon />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="[@media(pointer:coarse)]:opacity-100 aria-expanded:opacity-100 opacity-0 group-hover:opacity-100"
            >
              <DotsVerticalIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="flex w-40 flex-col gap-y-0.5 p-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start py-1"
            >
              Pin as favorite
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start py-1"
            >
              Copy start link
            </Button>
            <Button
              onClick={() => {
                /* TODO: delete timeEntry */
              }}
              variant="destructive"
              size="sm"
              className="w-full justify-start py-1"
            >
              Delete
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    ),
    header: ({ table }) => (
      <div className="flex items-baseline justify-end">
        <Toggle
          pressed={table.getColumn("select")?.getIsVisible()}
          onPressedChange={() => table.getColumn("select")?.toggleVisibility()}
        >
          <RowsIcon />
        </Toggle>
      </div>
    ),
  }),
];
