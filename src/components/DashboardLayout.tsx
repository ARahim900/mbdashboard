
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
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

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader 
          pageTitle={getPageTitle()} 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main 
          className={cn(
            "flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300", 
            sidebarCollapsed ? "md:ml-16" : "md:ml-64"
          )}
        >
          <div className="container mx-auto max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
