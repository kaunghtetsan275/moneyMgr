"use client";
import { ThemeProvider } from "next-themes";

export default function NextThemeProvider({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem={true}
      enableColorScheme={false}
      disableTransitionOnChange={false}
      storageKey="money-mgr-theme"
    >
      {children}
    </ThemeProvider>
  );
}