import React from "react";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ThemeToggle({ 
  variant = "outline", 
  size = "icon",
  className = ""
}: ThemeToggleProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleDarkMode}
      className={className}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Light mode" : "Dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-400" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" aria-hidden="true" />
      )}
      <span className="sr-only">{isDarkMode ? "Light mode" : "Dark mode"}</span>
    </Button>
  );
}