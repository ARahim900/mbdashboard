
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  // Get sidebar collapsed state from localStorage or default to false
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved ? JSON.parse(saved) : false;
  });
  
  const location = useLocation();
  
  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);
  
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

  // Toggle sidebar visibility
  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <DashboardSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={handleToggleSidebar} 
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader 
          pageTitle={getPageTitle()} 
          onToggleSidebar={handleToggleSidebar} 
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