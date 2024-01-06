"use client";
import React from "react";
import { MantineProvider } from "@mantine/core";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>
  );
};
