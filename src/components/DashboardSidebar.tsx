import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Droplet, Zap, Factory, Briefcase, LayoutDashboard, ChevronRight, ChevronLeft, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
  end?: boolean;
}

const NavItem = ({
  to,
  icon,
  label,
  collapsed,
  onClick,
  end = false
}: NavItemProps) => {
  return <NavLink 
    to={to} 
    end={end} 
    onClick={onClick}
    className={({
      isActive
    }) => cn("flex items-center py-2 px-4 rounded-lg transition-all", 
      isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground", 
      collapsed && "justify-center px-3")}>
      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10">
        {icon}
      </span>
      {!collapsed && <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
          {label}
        </span>}
    </NavLink>;
};

export function DashboardSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileToggle
}: DashboardSidebarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  
  // Auto-collapse sidebar on mobile screens
  useEffect(() => {
    if (!isDesktop && !collapsed) {
      onToggle();
    }
  }, [isDesktop, collapsed, onToggle]);

  // Desktop sidebar
  const DesktopSidebar = (
    <aside className={cn(
      "fixed top-0 left-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all z-40 border-r border-sidebar-border lg:block", 
      collapsed ? "w-16" : "w-64",
      !isDesktop && !mobileOpen && "hidden"
    )}>
      <div className={cn("flex items-center h-20 px-4", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && <div>
            <h1 className="text-lg font-bold tracking-tight">
                Muscat Bay
            </h1>
            <p className="text-xs text-sidebar-foreground/70">
                Assets & Operation
            </p>
        </div>}
        
        <Button variant="ghost" className={cn("p-1", collapsed ? "w-10 h-10" : "h-8 w-8")} onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <nav className="flex-1 py-4 flex flex-col space-y-4 px-3">
        <NavItem to="/" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" collapsed={collapsed} end onClick={!isDesktop ? onMobileToggle : undefined} />
        
        <NavItem to="/water" icon={<Droplet className="w-5 h-5" />} label="Water System" collapsed={collapsed} onClick={!isDesktop ? onMobileToggle : undefined} />
        
        <NavItem to="/electricity" icon={<Zap className="w-5 h-5" />} label="Electricity System" collapsed={collapsed} onClick={!isDesktop ? onMobileToggle : undefined} />
        
        <NavItem to="/stp" icon={<Factory className="w-5 h-5" />} label="STP Plant" collapsed={collapsed} onClick={!isDesktop ? onMobileToggle : undefined} />
        
        <NavItem to="/contractor" icon={<Briefcase className="w-5 h-5" />} label="Contractor Tracker" collapsed={collapsed} onClick={!isDesktop ? onMobileToggle : undefined} />
      </nav>
      
      <div className="p-3">
        <div className={cn("rounded-lg py-2 px-4 bg-sidebar-accent/50 text-xs text-sidebar-foreground/80 flex items-center", collapsed ? "justify-center px-3" : "")}>
          {collapsed ? <span className="text-xs">v1.0</span> : <span>Muscat Bay v1.0</span>}
        </div>
      </div>
    </aside>
  );

  // Mobile overlay - shown when menu is opened on small screens
  const MobileOverlay = mobileOpen && !isDesktop ? (
    <div 
      className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity" 
      onClick={onMobileToggle}
      aria-hidden="true"
    />
  ) : null;

  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-sidebar text-sidebar-foreground lg:hidden"
        onClick={onMobileToggle}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      {MobileOverlay}
      {DesktopSidebar}
    </>
  );
}