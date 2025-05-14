import React from "react";
import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/colors";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/lib/theme-context";
import { ArrowRight } from "lucide-react";

interface EnhancedDashboardCardProps {
  title: string;
  subtitle?: string;
  value: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconTextColor: string;
  trend: number;
  trendLabel: string;
  onClick?: () => void;
  className?: string;
}

export function EnhancedDashboardCard({
  title,
  subtitle,
  value,
  icon,
  iconBgColor,
  iconTextColor,
  trend,
  trendLabel,
  onClick,
  className
}: EnhancedDashboardCardProps) {
  const isPositive = trend > 0;
  const trendColorClass = isPositive ? 'text-[#10B981]' : 'text-[#F87171]';
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const { isDarkMode } = useTheme();
  
  // More consistent height management
  const cardHeight = isMobile ? "min-h-[150px]" : isTablet ? "min-h-[180px]" : "min-h-[220px]";

  return (
    <div 
      className={cn(
        "rounded-lg transition-all duration-300",
        "flex flex-col border",
        "hover:shadow-lg hover:-translate-y-1 group",
        isDarkMode 
          ? "bg-[#1F2937] border-[#4B5563]/30 shadow-md shadow-black/10" 
          : "bg-white border-[#E5E7EB] shadow-lg shadow-gray-100/80",
        isMobile ? "p-4" : isTablet ? "p-5" : "p-6",
        cardHeight, // Responsive height handling
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View ${title} details` : undefined}
      onKeyDown={(e) => {
        // Accessibility: Handle keyboard activation
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="pr-2">
          <h3 className={cn(
            "font-bold",
            isDarkMode ? "text-white" : "text-[#4E4456]",
            isMobile ? "text-base" : "text-lg"
          )}>
            {title}
          </h3>
          {subtitle && (
            <p className={cn(
              "font-medium mt-1", 
              isDarkMode ? "text-gray-300" : "text-[#6B7280]",
              isMobile ? "text-xs" : "text-sm"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn(
          `rounded-full ${iconBgColor} ${iconTextColor}`,
          isMobile ? "p-2.5" : "p-3"
        )}>
          {React.cloneElement(
            icon as React.ReactElement, 
            { 
              className: isMobile ? "h-4 w-4" : "h-5 w-5", 
              "aria-hidden": "true" 
            }
          )}
        </div>
      </div>
      
      {/* Card Value */}
      <h2 className={cn(
        "font-bold mt-1 tracking-tight",
        isDarkMode ? "text-[#E5E7EB]" : "text-[#374151]",
        isMobile ? "text-2xl" : "text-3xl"
      )}>
        {value}
      </h2>
      
      {/* Card Footer */}
      <div className={cn(
        "mt-auto pt-4 flex items-center justify-between",
        isMobile ? "mt-3" : "mt-auto"
      )}>
        <div className="flex items-center">
          <span className={cn(
            `font-medium flex items-center gap-1 ${trendColorClass}`,
            isMobile ? "text-xs" : "text-sm"
          )}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className={cn(
            "ml-2",
            isDarkMode ? "text-gray-400" : "text-[#6B7280]",
            isMobile ? "text-xs" : "text-sm"
          )}>
            {trendLabel}
          </span>
        </div>
        
        {onClick && (
          <div className={cn(
            "transition-all duration-300 opacity-0 group-hover:opacity-100",
            isDarkMode ? "text-white" : "text-[#4E4456]"
          )}>
            <ArrowRight className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}