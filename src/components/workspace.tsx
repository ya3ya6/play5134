"use client";

import Link from "next/link";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  CaretRightIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

export const Workspace = () => {
  // TODO: get these values from api
  const workspace = "myworkspace";
  const organization = "myorganization";
  const organizations = [{ name: "My organization", link: "#" }];
  const workspaces = [{ name: "My workspace", link: "#", isDefault: true }];

  return (
    <Popover>
      <PopoverTrigger className="relative w-full p-3 text-left focus:outline-none">
        <div className="flex items-center justify-between">
          <h4 className="truncate font-semibold lg:w-[calc(var(--sidebar-content-width)-44px)]">
            {workspace}&apos;s workspace
          </h4>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
        <div className="mt-1 truncate text-xs font-semibold uppercase text-sidebar-foreground/50 lg:w-[calc(var(--sidebar-content-width)-24px)]">
          {organization} organization
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Input icon={<MagnifyingGlassIcon />} placeholder="Find workspaces" />
        <div className="flex w-full items-center justify-between">
          <span className="py-4 text-xs uppercase">organization</span>
          <HoverCard>
            <HoverCardTrigger className="flex items-center gap-x-1 py-4 text-sm">
              <span>{organization}</span>
              <CaretRightIcon />
            </HoverCardTrigger>
            <HoverCardContent side="right">
              {organizations.map((org) => (
                <Link
                  key={org.name}
                  href={org.link}
                  className="block w-full text-sm hover:text-muted-foreground"
                >
                  {org.name}
                </Link>
              ))}
              <Separator className="my-2" />
              <Link
                href="#"
                className="block w-full text-sm hover:text-muted-foreground"
              >
                Manage Workspaces
              </Link>
            </HoverCardContent>
          </HoverCard>
        </div>
        <Separator className="my-1" />
        <div className="pb-3 pt-4 text-xs uppercase">workspaces</div>
        <ul className="">
          {workspaces.map((workspace) => (
            <li
              key={workspace.name}
              className="flex w-full items-center justify-between text-sm hover:text-muted-foreground"
            >
              <Link href={workspace.link}>{workspace.name}</Link>
              {workspace.isDefault && (
                <span className="text-xs text-fuchsia-500">Default</span>
              )}
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <Link
          href="#"
          className="flex w-full items-center text-sm hover:text-muted-foreground"
        >
          Manage Workspaces
        </Link>
      </PopoverContent>
    </Popover>
  );
};
