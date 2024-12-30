"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps as NextThemesProviderProps } from "next-themes";

interface ThemeProviderProps
  extends Omit<NextThemesProviderProps, "attribute"> {
  children: React.ReactNode;
  attribute?: NextThemesProviderProps["attribute"];
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
