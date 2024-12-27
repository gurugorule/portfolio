// "use client"

// import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"
// import { type ThemeProviderProps } from "next-themes"

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string; // e.g., "class" or "data-theme"
  defaultTheme?: string; // Default theme name
  enableSystem?: boolean; // Enable system preferences
  forcedTheme?: string; // Force a specific theme
  themes?: string[]; // List of available themes
  storageKey?: string; // Key for storing the theme
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
