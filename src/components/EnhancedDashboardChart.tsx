import React from "react";
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
  Cell,
  TooltipProps,
  Area,
  AreaChart
} from "recharts";
import { COLORS } from "@/lib/colors";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/lib/theme-context";

interface EnhancedDashboardChartProps {
  type: "line" | "bar" | "pie" | "area";
  data: any[];
  dataKeys: string[];
  colors: string[];
  height?: number;
  className?: string;
  units?: Record<string, string>;  // Optional units for each dataKey
  title?: string;  // Optional chart title
  hideLegend?: boolean;  // Option to hide legend on any screen size
}

// Enhanced tooltip component with better presentation and unit support
const CustomTooltip = ({ 
  active, 
  payload, 
  label, 
  units 
}: TooltipProps<any, any> & { units?: Record<string, string> }) => {
  const { isDarkMode } = useTheme();
  
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div 
      className={`custom-tooltip p-3 rounded-lg shadow-lg border ${ 
        isDarkMode 
          ? 'bg-[#1F2937] border-[#4B5563] text-[#E5E7EB]' 
          : 'bg-white border-[#E5E7EB] text-[#374151]'
      }`}
    >
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry, index) => {
          const dataKey = entry.dataKey || entry.name;
          const unit = units && units[dataKey] ? units[dataKey] : '';
          
          return (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: entry.color }}
                  aria-hidden="true"
                />
                <span className="mr-2">{entry.name || entry.dataKey}:</span>
              </div>
              <span className="font-semibold">
                {typeof entry.value === 'number' 
                  ? Number(entry.value).toLocaleString() 
                  : entry.value}
                {unit && ` ${unit}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Chart utilities for consistent styling and responsive behavior
const chartUtils = {
  getFormattersBySize: (isMobile: boolean, isTablet: boolean) => {
    return {
      legendFormatter: (value: string) => {
        if (isMobile && value.length > 10) {
          return `${value.substring(0, 8)}...`;
        } else if (isTablet && value.length > 15) {
          return `${value.substring(0, 12)}...`;
        }
        return value;
      },
      
      tickFormatter: (value: string) => {
        if (isMobile && value.length > 5) {
          return value.substring(0, 5) + "...";
        } else if (isTablet && value.length > 8) {
          return value.substring(0, 8) + "...";
        }
        return value;
      },
      
      numberFormatter: (value: number) => {
        if (isMobile) {
          // Simplified for mobile
          if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
          if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
          return value.toString();
        }
        return value.toLocaleString();
      }
    };
  },
  
  // Responsive sizing based on device
  getSizing: (isMobile: boolean, isTablet: boolean) => {
    return {
      fontSize: isMobile ? 10 : 12,
      dotRadius: isMobile ? 3 : 4,
      activeDotRadius: isMobile ? 5 : 7,
      strokeWidth: isMobile ? 2 : 2.5,
      barSize: isMobile ? 25 : isTablet ? 30 : 35,
      pieOuterRadius: isMobile ? 70 : 90,
      pieInnerRadius: isMobile ? 40 : 55
    };
  },
  
  // Responsive margin based on device
  getMargin: (isMobile: boolean, isTablet: boolean) => {
    if (isMobile) {
      return { top: 10, right: 10, left: -15, bottom: 15 };
    } else if (isTablet) {
      return { top: 10, right: 15, left: -10, bottom: 20 };
    } else {
      return { top: 15, right: 20, left: -5, bottom: 20 };
    }
  }
};

export function EnhancedDashboardChart({
  type,
  data,
  dataKeys,
  colors,
  height = 250,
  className,
  units,
  title,
  hideLegend = false
}: EnhancedDashboardChartProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const { isDarkMode } = useTheme();
  
  // Handle empty or invalid data
  if (!data || data.length === 0) {
    return (
      <div className={`chart-container flex items-center justify-center h-[${height}px] ${className || ''}`}>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No data available
        </p>
      </div>
    );
  }
  
  // Get styling utilities based on current screen size
  const { legendFormatter, tickFormatter } = chartUtils.getFormattersBySize(isMobile, isTablet);
  const { fontSize, dotRadius, activeDotRadius, strokeWidth, barSize, pieOuterRadius, pieInnerRadius } = 
    chartUtils.getSizing(isMobile, isTablet);
  const margin = chartUtils.getMargin(isMobile, isTablet);
  
  // Helper functions for chart styling based on dark mode
  const getChartStrokeColor = () => isDarkMode ? '#374151' : '#E5E7EB';
  const getChartTextColor = () => isDarkMode ? '#E5E7EB' : '#6B7280';
    
  // Limit number of data points on small screens
  const limitDataForMobile = (originalData: any[]) => {
    if (!isMobile || originalData.length <= 5) return originalData;
    
    // For mobile, only show a subset of data points to avoid crowding
    const step = Math.ceil(originalData.length / 5);
    return originalData.filter((_, i) => i % step === 0 || i === originalData.length - 1);
  };

  // Displayed data with mobile optimization
  const displayData = isMobile && (type === 'line' || type === 'bar' || type === 'area') 
    ? limitDataForMobile(data) 
    : data;

  // Render different chart types
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={displayData} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" stroke={getChartStrokeColor()} opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke={getChartTextColor()} 
              fontSize={fontSize} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize }}
              tickMargin={5}
              tickFormatter={tickFormatter}
            />
            <YAxis 
              stroke={getChartTextColor()} 
              fontSize={fontSize} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize }}
              tickCount={isMobile ? 4 : 5}
            />
            <Tooltip content={<CustomTooltip units={units} />} />
            {!hideLegend && (!isMobile || !isTablet) && (
              <Legend 
                formatter={legendFormatter}
                iconSize={isMobile ? 8 : 10} 
                wrapperStyle={{ fontSize }}
                verticalAlign={isMobile ? "bottom" : "top"}
                align="center"
              />
            )}
            {dataKeys.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                name={key}
                stroke={colors[index % colors.length]} 
                strokeWidth={strokeWidth} 
                dot={{ r: dotRadius, fill: colors[index % colors.length], strokeWidth: 1, stroke: 'white' }} 
                activeDot={{ 
                  r: activeDotRadius, 
                  stroke: isDarkMode ? '#1F2937' : 'white', 
                  strokeWidth: 2, 
                  fill: colors[index % colors.length] 
                }}
                connectNulls={true} // Connect over missing data points
                animationDuration={1500}
              />
            ))}
          </LineChart>
        );
      
      case "area":
        return (
          <AreaChart data={displayData} margin={margin}>
            <defs>
              {dataKeys.map((key, index) => (
                <linearGradient key={key} id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={getChartStrokeColor()} opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke={getChartTextColor()} 
              fontSize={fontSize} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize }}
              tickMargin={5}
              tickFormatter={tickFormatter}
            />
            <YAxis 
              stroke={getChartTextColor()} 
              fontSize={fontSize} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize }}
              tickCount={isMobile ? 4 : 5}
            />
            <Tooltip content={<CustomTooltip units={units} />} />
            {!hideLegend && (!isMobile || !isTablet) && (
              <Legend 
                formatter={legendFormatter}
                iconSize={isMobile ? 8 : 10} 
                wrapperStyle={{ fontSize }}
                verticalAlign={isMobile ? "bottom" : "top"}
                align="center"
              />
            )}
            {dataKeys.map((key, index) => (
              <Area 
                key={key}
                type="monotone" 
                dataKey={key} 
                name={key}
                stroke={colors[index % colors.length]} 
                strokeWidth={2}
                fill={`url(#color-${key})`}
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
            ))}
          </AreaChart>
        );

      case "bar":
        return (
          <BarChart data={displayData} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" stroke={getChartStrokeColor()} opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke={getChartTextColor()} 
              fontSize={fontSize} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize }}
              tickMargin={5}
              tickFormatter={tickFormatter}
            />
            <YAxis 
              stroke={getChartTextColor()} 
              fontSize={fontSize} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize }}
              tickCount={isMobile ? 4 : 5}
            />
            <Tooltip content={<CustomTooltip units={units} />} />
            {!hideLegend && (!isMobile || !isTablet) && (
              <Legend 
                formatter={legendFormatter}
                iconSize={isMobile ? 8 : 10} 
                wrapperStyle={{ fontSize }}
                verticalAlign={isMobile ? "bottom" : "top"}
                align="center"
              />
            )}
            {dataKeys.map((key, index) => (
              <Bar 
                key={key}
                dataKey={key} 
                name={key}
                fill={colors[index % colors.length]} 
                radius={[4, 4, 0, 0]} 
                barSize={barSize}
                animationDuration={1500}
              >
                {/* Add gradient to bars */}
                <defs>
                  <linearGradient id={`colorBar${index}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors[index % colors.length]} stopOpacity={1} />
                    <stop offset="100%" stopColor={colors[index % colors.length]} stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                {displayData.map((entry, entryIndex) => (
                  <Cell 
                    key={`cell-${entryIndex}`}
                    fill={`url(#colorBar${index})`} 
                  />
                ))}
              </Bar>
            ))}
          </BarChart>
        );
      
      case "pie":
        return (
          <PieChart margin={margin}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={pieOuterRadius}
              innerRadius={pieInnerRadius}
              dataKey={dataKeys[0]}
              nameKey="name"
              labelLine={!isMobile}
              label={isMobile ? false : ({ percent }) => `${(percent * 100).toFixed(0)}%`}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                  stroke={isDarkMode ? '#1F2937' : 'white'} 
                  strokeWidth={isMobile ? 2 : 3} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip units={units} />} />
            {!hideLegend && (
              <Legend 
                formatter={(value, entry) => (
                  <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} ml-1.5 ${isMobile ? 'text-[10px]' : 'text-xs'}`}>
                    {legendFormatter(value)}
                    {!isMobile && entry.payload && entry.payload[dataKeys[0]] && ` (${entry.payload[dataKeys[0]]}${units && units[dataKeys[0]] ? ` ${units[dataKeys[0]]}` : ''})`}
                  </span>
                )} 
                iconSize={isMobile ? 8 : 10} 
                wrapperStyle={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}
                layout={isMobile ? "horizontal" : "vertical"}
                verticalAlign={isMobile ? "bottom" : "middle"}
                align={isMobile ? "center" : "right"}
              />
            )}
          </PieChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`chart-container ${className || ''}`}>
      {title && (
        <h3 className={`text-${isMobile ? 'sm' : 'base'} font-medium mb-2 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}