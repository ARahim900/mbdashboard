import React from "react";
import { Menu, ArrowLeft, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme-context";

interface DashboardHeaderProps {
  pageTitle: string;
  onToggleSidebar: () => void;
}

export function DashboardHeader({
  pageTitle,
  onToggleSidebar
}: DashboardHeaderProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  const handleBackClick = () => {
    navigate('/');
    toast({
      title: "Returning to dashboard",
      description: "Navigating back to the main dashboard",
      variant: "default",
      duration: 2000
    });
  };
  
  return (
    <header className={cn(
      "sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6",
      "border-b backdrop-blur-sm transition-colors duration-300",
      isDarkMode 
        ? "bg-[#4E4456] text-white border-gray-700" 
        : "bg-[#F4F2F5] text-[#374151] border-gray-200"
    )}>
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* On small screens, sidebar toggle is handled by mobile menu button in DashboardSidebar */}
        {isDesktop && (
          <Button 
            variant="ghost" 
            size="icon" 
            className={isDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-black/5"} 
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
            className={isDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-black/5"} 
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
            className={cn(
              "rounded-full", 
              isDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-black/5"
            )} 
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
        )}
        
        <ThemeToggle 
          variant="ghost" 
          className={cn(
            "rounded-full", 
            isDarkMode ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-black/5"
          )} 
        />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full", 
            isDarkMode 
              ? "bg-white/10 text-white hover:bg-white/20" 
              : "bg-black/5 text-gray-700 hover:bg-black/10"
          )} 
          aria-label="User profile"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}