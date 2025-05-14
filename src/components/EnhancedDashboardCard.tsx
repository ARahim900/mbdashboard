import React from "react";
import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/colors";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/lib/theme-context";

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
  const cardHeight = isMobile ? "min-h-[150px]" : isTablet ? "min-h-[180px]" : "aspect-square";

  return (
    <div 
      className={cn(
        "rounded-xl transition-all duration-300",
        "flex flex-col border",
        "hover:shadow-lg hover:-translate-y-1",
        isDarkMode 
          ? "bg-[#1F2937] border-[#4B5563] dark:shadow-lg dark:hover:shadow-xl" 
          : "bg-white border-[#E5E7EB] shadow-md",
        isMobile ? "p-4" : isTablet ? "p-4" : "p-5",
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
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div className="pr-2">
          <p className={cn(
            "font-medium",
            isDarkMode ? "text-gray-400" : "text-[#6B7280]",
            isMobile ? "text-xs" : "text-sm"
          )}>
            {title}
          </p>
          {subtitle && (
            <p className={cn(
              "font-semibold mt-0.5 md:mt-1", 
              isDarkMode ? "text-gray-300" : "text-[#4E4456]",
              isMobile ? "text-[10px]" : "text-xs"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={cn(
          `rounded-xl ${iconBgColor} ${iconTextColor}`,
          isMobile ? "p-2" : "p-3"
        )}>
          {React.cloneElement(
            icon as React.ReactElement, 
            { 
              className: isMobile ? "h-4 w-4" : "h-6 w-6", 
              "aria-hidden": "true" 
            }
          )}
        </div>
      </div>
      
      {/* Card Value */}
      <h3 className={cn(
        "font-bold mt-1 md:mt-2 tracking-tight",
        isDarkMode ? "text-[#E5E7EB]" : "text-[#374151]",
        isMobile ? "text-xl sm:text-2xl" : "text-3xl"
      )}>
        {value}
      </h3>
      
      {/* Card Footer */}
      <div className={cn(
        "mt-auto pt-3 md:pt-4 border-t",
        isDarkMode ? "border-[#4B5563]" : "border-[#E5E7EB]",
        isMobile ? "mt-2" : "mt-auto"
      )}>
        <div className="flex items-center">
          <span className={cn(
            `font-semibold ${trendColorClass}`,
            isMobile ? "text-[10px]" : "text-xs"
          )}>
            {isPositive ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
          <span className={cn(
            "ml-2",
            isDarkMode ? "text-gray-400" : "text-[#6B7280]",
            isMobile ? "text-[10px]" : "text-xs"
          )}>
            {trendLabel}
          </span>
        </div>
      </div>
    </div>
  );
}