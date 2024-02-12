"use client";

import { useAtom } from "jotai";

import { TimeForm } from "@/components/time-form";
import { timeEntriesAtom } from "@/lib/atoms";

import { NoTimeEntryMessage } from "./_components/NoTimeEntryMessage";
import { Summary } from "./_components/Summary";
import { TimeEntriesTable } from "./_components/TimeEntriesTable";

const Home = () => {
  const [timeEntries] = useAtom(timeEntriesAtom);

  return (
    <main>
      <TimeForm />
      {timeEntries.length === 0 ? (
        <NoTimeEntryMessage />
      ) : (
        <div>
          <Summary />
          <div className="mt-8 flex flex-col gap-y-8">
            {timeEntries.map((group) => (
              <TimeEntriesTable key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
