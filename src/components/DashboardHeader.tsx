import React from "react";
import { Menu, ArrowLeft, User, Bell, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  pageTitle: string;
  onToggleSidebar: () => void;
  showBackButton?: boolean;
  helpTooltip?: string;
}

export function DashboardHeader({
  pageTitle,
  onToggleSidebar,
  showBackButton = true,
  helpTooltip
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
  
  // Use the fixed purple color regardless of theme
  const headerBgClass = "bg-[#4E4456] border-white/10";
  const textClass = "text-white";
  const buttonHoverClass = "hover:bg-white/10";
  const buttonTextClass = "text-white";
  
  return (
    <header className={cn(
      "sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6",
      "border-b backdrop-blur-sm transition-colors duration-300 shadow-sm",
      headerBgClass, textClass
    )}>
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Sidebar toggle button - visible on all screen sizes but styled differently */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(buttonTextClass, buttonHoverClass, "rounded-full")} 
          onClick={onToggleSidebar} 
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Back button - conditionally shown based on prop and screen size */}
        {showBackButton && !isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBackClick} 
            className={cn(buttonTextClass, buttonHoverClass, "rounded-full")} 
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        
        {/* Page title with optional help tooltip */}
        <div className="flex items-center">
          <h1 className={cn(
            "font-semibold tracking-tight", 
            isMobile ? "text-base max-w-[150px]" : "text-xl"
          )}>
            {pageTitle}
          </h1>
          
          {helpTooltip && (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 p-0 ml-1"
                    aria-label="Page information"
                  >
                    <Info className="h-4 w-4 text-white/70" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <p className="text-sm">{helpTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Notification button - hidden on mobile */}
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "rounded-full", 
              buttonTextClass, buttonHoverClass
            )} 
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
        )}
        
        {/* Theme toggle - consistent with design language */}
        <ThemeToggle 
          variant="ghost" 
          className={cn(
            "rounded-full", 
            buttonTextClass, buttonHoverClass
          )} 
        />
        
        {/* User profile button - more prominent styling */}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "rounded-full", 
            "bg-white/10 text-white hover:bg-white/20"
          )} 
          aria-label="User profile"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}