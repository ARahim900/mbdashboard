import React from "react";
import { NavLink } from "react-router-dom";
import { Droplet, Zap, Factory, Briefcase, LayoutDashboard, ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}
interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  end?: boolean;
}
const NavItem = ({
  to,
  icon,
  label,
  collapsed,
  end = false
}: NavItemProps) => {
  return <NavLink to={to} end={end} className={({
    isActive
  }) => cn("flex items-center py-2 px-4 rounded-lg transition-all", isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground", collapsed && "justify-center px-3")}>
      <span className="w-5 h-5">{icon}</span>
      {!collapsed && <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis">
          {label}
        </span>}
    </NavLink>;
};
export function DashboardSidebar({
  collapsed,
  onToggle
}: DashboardSidebarProps) {
  return <aside className={cn("fixed top-0 left-0 h-screen bg-sidebar text-sidebar-foreground flex flex-col transition-all z-40 border-r border-sidebar-border", collapsed ? "w-16" : "w-64")}>
      <div className={cn("flex items-center h-16 px-4", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && <h1 className="text-lg font-bold tracking-tight">
      </h1>}
        
        <Button variant="ghost" className={cn("p-1", collapsed ? "w-10 h-10" : "h-8 w-8")} onClick={onToggle} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      
      <nav className="flex-1 py-6 flex flex-col space-y-2 px-3">
        <NavItem to="/" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" collapsed={collapsed} end />
        
        <NavItem to="/water" icon={<Droplet className="w-5 h-5" />} label="Water System" collapsed={collapsed} />
        
        <NavItem to="/electricity" icon={<Zap className="w-5 h-5" />} label="Electricity System" collapsed={collapsed} />
        
        <NavItem to="/stp" icon={<Factory className="w-5 h-5" />} label="STP Plant" collapsed={collapsed} />
        
        <NavItem to="/contractor" icon={<Briefcase className="w-5 h-5" />} label="Contractor Tracker" collapsed={collapsed} />
      </nav>
      
      <div className="p-3">
        <div className={cn("rounded-lg py-2 px-4 bg-sidebar-accent/50 text-xs text-sidebar-foreground/80 flex items-center", collapsed ? "justify-center px-3" : "")}>
          {collapsed ? <span className="text-xs">v1.0</span> : <span>UtilityPro v1.0</span>}
        </div>
      </div>
    </aside>;
}