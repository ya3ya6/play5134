"use client";

import { type ReactNode } from "react";

import { Provider as JotaiProvider } from "jotai";

import { QueryClientProvider, QueryClient } from 'react-query';

import { TooltipProvider } from "@/components/ui/tooltip";

type ProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();
export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
};
