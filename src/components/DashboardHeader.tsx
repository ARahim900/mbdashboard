
import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  pageTitle: string;
  onToggleSidebar: () => void;
}

export function DashboardHeader({
  pageTitle,
  onToggleSidebar
}: DashboardHeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPath = location.pathname === "/";

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
        duration: 2000
      });
    } else {
      document.documentElement.classList.remove("dark");
      toast({
        title: "Light mode enabled",
        description: "Your preference has been saved.",
        duration: 2000
      });
    }
  };
  
  const handleBackClick = () => {
    navigate('/');
    toast({
      title: "Returning to dashboard",
      description: "Navigating back to the main dashboard",
      duration: 2000
    });
  };
  
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-[#4E4456] text-white backdrop-blur-sm border-b">
      <div className="flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-white hover:bg-white/10" 
          onClick={onToggleSidebar} 
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {!isRootPath && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBackClick} 
            className="text-white hover:bg-white/10" 
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        <div className="flex items-center">
          {isRootPath && (
            <span className={cn("mr-2 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10")}>
              <Home className="h-5 w-5" />
            </span>
          )}
          <h1 className="text-xl font-semibold">{pageTitle}</h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode} 
          className="rounded-full text-white hover:bg-white/10" 
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}