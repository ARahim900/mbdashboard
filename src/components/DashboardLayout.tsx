import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  // Close mobile sidebar when route changes
  useEffect(() => {
    if (!isDesktop) {
      setMobileSidebarOpen(false);
    }
  }, [location.pathname, isDesktop]);

  // Extract current page title from location
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path.includes("water")) return "Water System";
    if (path.includes("electricity")) return "Electricity System";
    if (path.includes("stp")) return "STP Plant";
    if (path.includes("contractor")) return "Contractor Tracker";
    return "Dashboard";
  };

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Toggle mobile sidebar open/closed
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        mobileOpen={mobileSidebarOpen}
        onMobileToggle={toggleMobileSidebar}
      />
      
      <div className={cn(
        "flex flex-col flex-1 overflow-hidden transition-all duration-300",
        isDesktop && !sidebarCollapsed ? "lg:ml-64" : isDesktop ? "lg:ml-16" : "ml-0"
      )}>
        <DashboardHeader 
          pageTitle={getPageTitle()} 
          onToggleSidebar={isDesktop ? toggleSidebar : toggleMobileSidebar} 
        />
        
        <main 
          className="flex-1 overflow-y-auto p-4 md:p-6"
        >
          <div className="container mx-auto max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}