"use client";
import React from "react";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
    </QueryClientProvider>
  );
};
