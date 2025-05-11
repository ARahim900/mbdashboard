
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value?: string | number;
  icon?: ReactNode;
  iconColor?: string;
  trend?: number;
  trendLabel?: string;
  chart?: ReactNode;
  className?: string;
  footer?: ReactNode;
  isLoading?: boolean;
  size?: "small" | "medium" | "large";
}

export function DashboardCard({
  title,
  value,
  icon,
  iconColor,
  trend,
  trendLabel,
  chart,
  className,
  footer,
  isLoading = false,
  size = "medium",
}: DashboardCardProps) {
  // Determine the trend color
  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground";
    return trend > 0 ? "text-success" : "text-danger";
  };

  // Determine the trend icon
  const getTrendIcon = () => {
    if (!trend) return null;
    return trend > 0 ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M1.22 5.222a.75.75 0 011.06 0L7 9.942l3.768-3.769a.75.75 0 011.113.058 20.908 20.908 0 013.813 7.254l1.574-2.727a.75.75 0 011.3.75l-2.475 4.286a.75.75 0 01-1.025.275l-4.286-2.475a.75.75 0 01.75-1.3l2.71 1.565a19.422 19.422 0 00-3.013-6.024L7.53 11.533a.75.75 0 01-1.06 0l-5.25-5.25a.75.75 0 010-1.06z" clipRule="evenodd" />
      </svg>
    );
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover-scale", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div 
            className={cn(
              "rounded-full p-2", 
              iconColor ? iconColor : "bg-muted text-foreground"
            )}
          >
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-8 w-28 bg-muted animate-pulse rounded" />
            {trend && <div className="h-4 w-20 bg-muted animate-pulse rounded" />}
          </div>
        ) : (
          <>
            {value && (
              <div className="text-2xl font-bold">
                {value}
              </div>
            )}
            {(trend || trendLabel) && (
              <div className="flex items-center mt-1 space-x-1">
                {trend && (
                  <span className={cn("flex items-center text-sm", getTrendColor())}>
                    <span className="mr-1">{getTrendIcon()}</span>
                    {trend > 0 ? `+${trend}%` : `${trend}%`}
                  </span>
                )}
                {trendLabel && (
                  <span className="text-sm text-muted-foreground">{trendLabel}</span>
                )}
              </div>
            )}
            {chart && (
              <div className={cn(
                "mt-3", 
                size === "large" ? "h-80" : size === "medium" ? "h-40" : "h-24"
              )}>
                {chart}
              </div>
            )}
          </>
        )}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
