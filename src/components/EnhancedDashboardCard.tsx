import React from "react";
import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/colors";
import { useMediaQuery } from "@/hooks/use-media-query";

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

  return (
    <div 
      className={cn(
        "bg-white dark:bg-[#1F2937] rounded-xl shadow-md dark:shadow-lg",
        "border border-[#E5E7EB] dark:border-[#4B5563] flex flex-col",
        "mobile-card", // CSS class from index.css
        "transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl hover:-translate-y-1",
        isMobile ? "p-4" : isTablet ? "p-4" : "p-5",
        isMobile ? "min-h-[150px]" : isTablet ? "min-h-[180px]" : "aspect-square", // Responsive height handling
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `View ${title} details` : undefined}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div className="pr-2">
          <p className={cn(
            "font-medium text-[#6B7280] dark:text-gray-400",
            isMobile ? "text-xs" : "text-sm"
          )}>
            {title}
          </p>
          {subtitle && (
            <p className={cn(
              "text-[#4E4456] dark:text-gray-300 font-semibold mt-0.5 md:mt-1", 
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
            { className: isMobile ? "h-4 w-4" : "h-6 w-6", "aria-hidden": "true" }
          )}
        </div>
      </div>
      
      {/* Card Value */}
      <h3 className={cn(
        "font-bold text-[#374151] dark:text-[#E5E7EB] mt-1 md:mt-2",
        isMobile ? "text-xl sm:text-2xl" : "text-3xl",
        "mobile-card-value" // CSS class from index.css
      )}>
        {value}
      </h3>
      
      {/* Card Footer */}
      <div className={cn(
        "mt-auto pt-3 md:pt-4 border-t border-[#E5E7EB] dark:border-[#4B5563]",
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
            "text-[#6B7280] dark:text-gray-400 ml-2",
            isMobile ? "text-[10px]" : "text-xs"
          )}>
            {trendLabel}
          </span>
        </div>
      </div>
    </div>
  );
}