
import React from "react";
import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/colors";

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
  onClick
}: EnhancedDashboardCardProps) {
  const isPositive = trend > 0;
  const trendColorClass = isPositive ? 'text-[#10B981]' : 'text-[#F87171]';

  return (
    <div 
      className={cn(
        "bg-white dark:bg-[#1F2937] p-5 rounded-xl shadow-md dark:shadow-lg ",
        "border border-[#E5E7EB] dark:border-[#4B5563] flex flex-col",
        "aspect-square", // Make it square
        "transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl hover:-translate-y-1",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-[#6B7280] dark:text-gray-400">{title}</p>
          {subtitle && <p className="text-xs text-[#4E4456] font-semibold mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${iconBgColor} ${iconTextColor}`}>
          {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6" })}
        </div>
      </div>
      
      {/* Card Value */}
      <h3 className="text-3xl font-bold text-[#374151] dark:text-[#E5E7EB] mt-2">{value}</h3>
      
      {/* Card Footer */}
      <div className="mt-auto pt-4 border-t border-[#E5E7EB] dark:border-[#4B5563]">
        <div className="flex items-center">
          <span className={`text-xs font-semibold ${trendColorClass}`}>
            {isPositive ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
          <span className="text-xs text-[#6B7280] dark:text-gray-400 ml-2">{trendLabel}</span>
        </div>
      </div>
    </div>
  );
}
