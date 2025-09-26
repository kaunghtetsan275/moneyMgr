"use client";
import { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: { duration: 3000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#ffffff",
            color: "#333333",
          },
        }}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: { duration: 3000 },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
          color: isDark ? "#f5f6fa" : "#333333",
          border: isDark ? "1px solid #23272f" : "1px solid #e0e0e0",
        },
      }}
    />
  );
}