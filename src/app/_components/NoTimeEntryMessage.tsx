"use client";

import { useAtom } from "jotai";
import Div100vh from "react-div-100vh";

import TypeImage from "@/assets/svgs/type.svg";
import { Button } from "@/components/ui/button";
import { timerRunningAtom } from "@/lib/atoms";

export const NoTimeEntryMessage = () => {
  const [timerRunning, setTimerRunning] = useAtom(timerRunningAtom);

  function handleStart() {
    setTimerRunning(true);
  }

  return (
    <Div100vh className="flex items-center justify-center">
      <div className="mx-8 flex min-h-[30rem] w-full max-w-xl flex-col items-center justify-center rounded-3xl bg-white p-8 text-center shadow-2xl">
        <TypeImage />
        <h2 className="mt-4 text-2xl font-bold">Your day, tracked!</h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Welcome to Our Time Tracking System!
        </p>
        <Button onClick={handleStart} disabled={timerRunning} className="mt-4">
          Start tracking!
        </Button>
      </div>
    </Div100vh>
  );
};
