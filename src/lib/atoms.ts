import { addDays, differenceInSeconds, format, isBefore } from "date-fns";
import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

import { getInitialDate } from "@/lib/utils";
import { type Project, type Tag, type TimeEntries } from "@/types";

export const sidebarOpenAtom = atom(false);
export const sidebarLockedAtom = atom(false);

export const timeModeAtom = atom<"timer" | "manual">("timer");
export const timerRunningAtom = atom(false);
export const descriptionAtom = atom("");
export const startTimeAtom = atom(getInitialDate());
export const stopTimeAtom = atom(getInitialDate());
export const durationAtom = atom((get) => {
  const start = get(startTimeAtom);
  const stop = get(stopTimeAtom);
  const totalSeconds = differenceInSeconds(stop, start);
  const hours = Math.trunc(totalSeconds / 3600);
  const minutes = Math.trunc((totalSeconds - hours * 3600) / 60);
  const seconds = Math.trunc(totalSeconds - (hours * 3600 + minutes * 60));
  return (
    hours +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
});
export const tagsAtom = atom<Tag[]>([]);
export const projectAtom = atom<Project | null | undefined>(undefined);

export const timeEntriesAtom = atomWithImmer<TimeEntries[]>([]);
export const addTimeEntryAtom = atom(null, (get, set) => {
  const description = get(descriptionAtom);
  const startTime = get(startTimeAtom);
  const stopTime = get(stopTimeAtom);
  const timeEntries = get(timeEntriesAtom);
  const date = format(startTime, "yyyy-MM-dd");

  const groupIdx = timeEntries.findIndex((t) => t.id === date);
  if (groupIdx !== -1) {
    set(timeEntriesAtom, (p) => {
      p[groupIdx].timeEntries.push({
        id: `${date}__${timeEntries[groupIdx].timeEntries.length}`,
        start: startTime,
        stop: isBefore(stopTime, startTime) ? addDays(stopTime, 1) : stopTime,
        description: description,
        project: get(projectAtom),
        tags: get(tagsAtom),
      });
    });
  } else {
    set(timeEntriesAtom, (t) => {
      t.push({
        id: date,
        date: startTime,
        timeEntries: [
          {
            id: `${date}__0`,
            start: startTime,
            stop: stopTime,
            description: description,
            project: get(projectAtom),
            tags: get(tagsAtom),
          },
        ],
      });
    });
  }

  set(descriptionAtom, "");
  const now = getInitialDate();
  set(startTimeAtom, now);
  set(stopTimeAtom, now);
  set(projectAtom, null);
  set(tagsAtom, []);
});
