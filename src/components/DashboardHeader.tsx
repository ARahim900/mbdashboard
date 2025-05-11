
import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  pageTitle: string;
  onToggleSidebar: () => void;
}

export function DashboardHeader({ pageTitle, onToggleSidebar }: DashboardHeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();
  
  // Check system preference for dark mode
  useEffect(() => {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      toast({
        title: "Dark mode enabled",
        description: "Your preference has been saved.",
        duration: 2000,
      });
    } else {
      document.documentElement.classList.remove("dark");
      toast({
        title: "Light mode enabled",
        description: "Your preference has been saved.",
        duration: 2000,
      });
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-background/80 backdrop-blur-sm border-b">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode} 
          className="rounded-full"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
