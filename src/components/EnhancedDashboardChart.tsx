import React, { useState, useEffect } from "react";
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  Line, 
  Bar, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { COLORS } from "@/lib/colors";
import { useMediaQuery } from "@/hooks/use-media-query";

interface EnhancedDashboardChartProps {
  type: "line" | "bar" | "pie";
  data: any[];
  dataKeys: string[];
  colors: string[];
  height?: number;
  isDarkMode?: boolean;
  className?: string;
}

export function EnhancedDashboardChart({
  type,
  data,
  dataKeys,
  colors,
  height = 250,
  isDarkMode = false,
  className
}: EnhancedDashboardChartProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  
  // Helper functions for chart styling based on dark mode
  const getChartStrokeColor = () => isDarkMode ? COLORS.borderDark : COLORS.borderLight;
  const getChartTextColor = () => isDarkMode ? COLORS.textLight : COLORS.textMuted;
  
  // Tooltip styles
  const tooltipStyle = {
    backgroundColor: isDarkMode ? 'rgba(31,41,55,0.95)' : 'rgba(255,255,255,0.95)',
    border: isDarkMode ? `1px solid ${COLORS.borderDark}` : `1px solid ${COLORS.borderLight}`,
    borderRadius: '0.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    color: isDarkMode ? COLORS.textLight : COLORS.textDark,
    fontSize: isMobile ? '12px' : '14px',
    padding: isMobile ? '8px' : '10px'
  };

  // Mobile optimizations
  const getMargin = () => {
    if (isMobile) {
      return { top: 5, right: 5, left: -25, bottom: 5 };
    } else if (isTablet) {
      return { top: 5, right: 10, left: -20, bottom: 5 };
    } else {
      return { top: 5, right: 20, left: -15, bottom: 5 };
    }
  };

  const getFontSize = () => isMobile ? 10 : 12;
  const getBarSize = () => isMobile ? 25 : isTablet ? 30 : 35;
  const getPieOuterRadius = () => isMobile ? 70 : 90;
  const getPieInnerRadius = () => isMobile ? 40 : 55;
  const getDotRadius = () => isMobile ? 3 : 4;
  const getActiveDotRadius = () => isMobile ? 5 : 7;
  const getStrokeWidth = () => isMobile ? 2 : 2.5;

  // Custom formatter for mobile legend - truncate long text
  const legendFormatter = (value: string) => {
    if (isMobile && value.length > 10) {
      return `${value.substring(0, 8)}...`;
    }
    return value;
  };

  // Render different chart types
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data} margin={getMargin()}>
            <CartesianGrid strokeDasharray="3 3" stroke={getChartStrokeColor()} />
            <XAxis 
              dataKey="name" 
              stroke={getChartTextColor()} 
              fontSize={getFontSize()} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: getFontSize() }}
              tickMargin={5}
              // Mobile-friendly - limit ticks on smaller screens
              tickFormatter={value => isMobile && value.length > 5 ? value.substring(0, 5) + "..." : value}
            />
            <YAxis 
              stroke={getChartTextColor()} 
              fontSize={getFontSize()} 
              tickLine={false} 
              axisLine={false}
              // Mobile-friendly - reduce number of ticks on smaller screens
              tick={{ fontSize: getFontSize() }}
              tickCount={isMobile ? 4 : 5}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              cursor={{ stroke: colors[0], strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            {/* Only show legend on non-mobile screens */}
            {!isMobile && (
              <Legend 
                formatter={legendFormatter}
                iconSize={isMobile ? 8 : 10} 
                wrapperStyle={{ fontSize: getFontSize() }}
              />
            )}
            {dataKeys.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[index % colors.length]} 
                strokeWidth={getStrokeWidth()} 
                dot={{ r: getDotRadius(), fill: colors[index % colors.length] }} 
                activeDot={{ 
                  r: getActiveDotRadius(), 
                  stroke: isDarkMode ? COLORS.bgDarkElevated : 'white', 
                  strokeWidth: 2, 
                  fill: colors[index % colors.length] 
                }}
              />
            ))}
          </LineChart>
        );
      
      case "bar":
        return (
          <BarChart data={data} margin={getMargin()}>
            <CartesianGrid strokeDasharray="3 3" stroke={getChartStrokeColor()} />
            <XAxis 
              dataKey="name" 
              stroke={getChartTextColor()} 
              fontSize={getFontSize()} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: getFontSize() }}
              tickMargin={5}
              // Mobile-friendly - limit ticks on smaller screens
              tickFormatter={value => isMobile && value.length > 5 ? value.substring(0, 5) + "..." : value}
            />
            <YAxis 
              stroke={getChartTextColor()} 
              fontSize={getFontSize()} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: getFontSize() }}
              tickCount={isMobile ? 4 : 5}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            />
            {!isMobile && (
              <Legend 
                formatter={legendFormatter}
                iconSize={isMobile ? 8 : 10} 
                wrapperStyle={{ fontSize: getFontSize() }}
              />
            )}
            {dataKeys.map((key, index) => (
              <Bar 
                key={key}
                dataKey={key} 
                fill={colors[index % colors.length]} 
                radius={[6, 6, 0, 0]} 
                barSize={getBarSize()}
              />
            ))}
          </BarChart>
        );
      
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={getPieOuterRadius()}
              innerRadius={getPieInnerRadius()}
              dataKey={dataKeys[0]}
              labelLine={!isMobile}
              // Mobile-friendly label
              label={isMobile ? false : ({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                  stroke={isDarkMode ? COLORS.bgDarkElevated : 'white'} 
                  strokeWidth={isMobile ? 2 : 3} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={tooltipStyle}
            />
            <Legend 
              formatter={(value, entry) => (
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-text-muted'} ml-1.5 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                  {legendFormatter(value)} {!isMobile && `(${entry.payload[dataKeys[0]]})`}
                </span>
              )} 
              iconSize={isMobile ? 8 : 10} 
              wrapperStyle={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
              layout={isMobile ? "horizontal" : "vertical"}
              verticalAlign={isMobile ? "bottom" : "middle"}
              align={isMobile ? "center" : "right"}
            />
          </PieChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`chart-container ${className || ''}`}>
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}