import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { ArchiveIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

const colorMap: Record<
  string,
  { text: string; bg: string; bgMuted: string; bgText: string }
> = {
  green: {
    text: "text-green-600",
    bg: "bg-green-600",
    bgMuted: "bg-green-200 hover:bg-green-300",
    bgText: "text-green-900",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    bgMuted: "bg-blue-200 hover:bg-blue-300",
    bgText: "text-blue-900",
  },
};

export const ProjectInput = ({
  defaultValue,
  value,
  onChange,
  className,
}: {
  defaultValue?: Project | null;
  value?: Project | null;
  onChange?: (project: Project | null | undefined) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [project, setProject] = useControllableState({
    defaultProp: defaultValue,
    prop: value,
    onChange: onChange,
  });

  // TODO: get these from api (filtered)
  const projects: Project[] = [
    {
      id: 1,
      name: "project 1",
      color: "green",
      client: { id: 1, name: "client 1" },
    },
    { id: 2, name: "project 2", color: "blue" },
  ];

  const noClient = projects.filter((p) => !p.client);
  const projectPerClient: Record<string, Project[]> = {};

  for (const project of projects) {
    if (!project.client) {
      continue;
    }
    if (!projectPerClient[project.client.name]) {
      projectPerClient[project.client.name] = [];
    }
    projectPerClient[project.client.name].push(project);
  }

  function handleChange(newValue: Project | undefined) {
    setProject(newValue ? newValue : null);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {project ? (
          <Button
            size="sm"
            className={cn(
              "flex items-center gap-x-2 text-sm flex-shrink-0 justify-between",
              colorMap[project.color].bgMuted,
              colorMap[project.color].bgText,
              className,
            )}
          >
            <div className="flex items-center gap-x-2">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  colorMap[project.color].bg,
                )}
              />
              <span className="">{project.name}</span>
            </div>
            {project.client && (
              <>
                <span className="w-1 rounded-full h-1 bg-muted-foreground" />
                <span className="text-muted-foreground">
                  {project.client.name}
                </span>
              </>
            )}
          </Button>
        ) : (
          <Button size="icon" variant="ghost" className={className}>
            <ArchiveIcon />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent>
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          iconPosition="left"
          icon={<MagnifyingGlassIcon />}
          placeholder="Search by project, task or client"
        />
        <button
          onClick={() => handleChange(undefined)}
          className={cn(
            "mt-4 text-sm focus-visible:outline-none w-full text-muted-foreground flex items-center gap-x-2 hover:bg-muted px-2 py-1 rounded-lg",
            !project && "bg-muted",
          )}
        >
          <span className="bg-muted-foreground rounded-full w-2 h-2" />
          <span>No project</span>
        </button>
        {noClient && (
          <div className="mt-4">
            <div className="text-xs px-2 mb-1">NO CLIENT</div>
            <div className="flex flex-col gap-y-1">
              {noClient.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleChange(p)}
                  className={cn(
                    "text-sm text-muted-foreground flex items-center gap-x-2 hover:bg-muted px-2 py-1 rounded-lg",
                    project?.id === p.id && "bg-muted",
                  )}
                >
                  <span
                    className={cn("rounded-full w-2 h-2", colorMap[p.color].bg)}
                  />
                  <span className={cn(colorMap[p.color].text)}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {Object.entries(projectPerClient).map(([client, projects]) => (
          <div key={client} className="mt-4">
            <div className="text-xs px-2 mb-1 uppercase">{client}</div>
            <div className="flex flex-col gap-y-1">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleChange(p)}
                  className={cn(
                    "text-sm text-muted-foreground flex items-center gap-x-2 hover:bg-muted px-2 py-1 rounded-lg",
                    project?.id === p.id && "bg-muted",
                  )}
                >
                  <span
                    className={cn("rounded-full w-2 h-2", colorMap[p.color].bg)}
                  />
                  <span className={cn(colorMap[p.color].text)}>{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
