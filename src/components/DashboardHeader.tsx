import React, { useEffect, useState } from "react";
import { Moon, Sun, Menu, ArrowLeft, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 640px)");

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
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* On small screens, sidebar toggle is handled by mobile menu button in DashboardSidebar */}
        {isDesktop && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10 hidden md:flex" 
            onClick={onToggleSidebar} 
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        
        {!isMobile && (
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
        
        <h1 className={cn(
          "font-semibold truncate", 
          isMobile ? "text-sm max-w-[150px]" : "text-xl"
        )}>
          {pageTitle}
        </h1>
      </div>

      <div className="flex items-center space-x-1 md:space-x-4">
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full text-white hover:bg-white/10" 
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleDarkMode} 
          className="rounded-full text-white hover:bg-white/10" 
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-white/10 text-white hover:bg-white/20" 
          aria-label="User profile"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}