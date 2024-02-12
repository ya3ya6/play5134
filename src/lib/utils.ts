import { type ClassValue, clsx } from "clsx";
import { set } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitialDate() {
  return set(new Date(), { seconds: 0, milliseconds: 0 });
}

export function parseDuration(duration: string) {
  const parts = duration.split(":");
  const hours = Number(parts[0]);
  const minutes = Number(parts[1]);
  const seconds = Number(parts[2]);

  if (
    !isNaN(hours) &&
    hours >= 0 &&
    hours <= 23 &&
    !isNaN(minutes) &&
    minutes >= 0 &&
    minutes <= 59 &&
    !isNaN(seconds) &&
    seconds >= 0 &&
    seconds <= 59
  ) {
    return { hours, minutes, seconds };
  }

  return null;
}
