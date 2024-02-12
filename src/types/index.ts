export type Project = {
  id: number;
  name: string;
  color: string;
  client?: { id: number; name: string };
};

export type Tag = {
  id: number;
  name: string;
};

export type TimeEntry = {
  id: string;
  start: Date;
  stop: Date;
  description: string;
  project: Project | null | undefined;
  tags: Tag[];
};

export type TimeEntries = {
  id: string;
  date: Date;
  timeEntries: TimeEntry[];
};
