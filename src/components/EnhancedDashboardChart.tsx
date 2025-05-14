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
  TooltipProps
} from "recharts";
import { COLORS } from "@/lib/colors";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "@/lib/theme-context";

interface EnhancedDashboardChartProps {
  type: "line" | "bar" | "pie";
  data: any[];
  dataKeys: string[];
  colors: string[];
  height?: number;
  isDarkMode?: boolean;
  className?: string;
}

// Custom tooltip component for better presentation
const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  const { isDarkMode } = useTheme();
  
  if (!active || !payload || !payload.length) return null;
  
  return (
    <div 
      className={`custom-tooltip p-2 rounded-lg shadow-lg border ${
        isDarkMode 
          ? 'bg-[#1F2937] border-[#4B5563] text-[#E5E7EB]' 
          : 'bg-white border-[#E5E7EB] text-[#374151]'
      }`}
    >
      <p className="text-sm font-medium mb-1">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center text-xs">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="mr-2">{entry.name || entry.dataKey}:</span>
          <span className="font-semibold">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function EnhancedDashboardChart({
  type,
  data,
  dataKeys,
  colors,
  height = 250,
  className
}: EnhancedDashboardChartProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const { isDarkMode } = useTheme();
  
  // Handle empty or invalid data
  if (!data || data.length === 0) {
    return (
      <div className={`chart-container flex items-center justify-center h-[${height}px] ${className || ''}`}>
        <p className="text-sm text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }
  
  // Helper functions for chart styling based on dark mode
  const getChartStrokeColor = () => isDarkMode ? COLORS.borderDark : COLORS.borderLight;
  const getChartTextColor = () => isDarkMode ? COLORS.textLight : COLORS.textMuted;
  
  // Mobile optimizations
  const getMargin = () => {
    if (isMobile) {
      return { top: 5, right: 5, left: -20, bottom: 5 };
    } else if (isTablet) {
      return { top: 5, right: 10, left: -15, bottom: 5 };
    } else {
      return { top: 5, right: 20, left: -10, bottom: 5 };
    }
  };

  // Responsively adjust chart parameters
  const getFontSize = () => isMobile ? 10 : 12;
  const getBarSize = () => isMobile ? 25 : isTablet ? 30 : 35;
  const getPieOuterRadius = () => isMobile ? 70 : 90;
  const getPieInnerRadius = () => isMobile ? 40 : 55;
  const getDotRadius = () => isMobile ? 3 : 4;
  const getActiveDotRadius = () => isMobile ? 5 : 7;
  const getStrokeWidth = () => isMobile ? 2 : 2.5;
  
  // Limit number of data points on small screens
  const limitDataForMobile = (originalData: any[]) => {
    if (!isMobile || originalData.length <= 5) return originalData;
    
    // For mobile, only show a subset of data points to avoid crowding
    const step = Math.ceil(originalData.length / 5);
    return originalData.filter((_, i) => i % step === 0 || i === originalData.length - 1);
  };

  // Displayed data with mobile optimization
  const displayData = isMobile && (type === 'line' || type === 'bar') 
    ? limitDataForMobile(data) 
    : data;

  // Custom formatter for mobile legend - truncate long text
  const legendFormatter = (value: string) => {
    if (isMobile && value.length > 10) {
      return `${value.substring(0, 8)}...`;
    }
    return value;
  };

  // Custom tick formatter for X axis
  const tickFormatter = (value: string) => {
    if (isMobile && value.length > 5) {
      return value.substring(0, 5) + "...";
    }
    return value;
  };

  // Render different chart types
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={displayData} margin={getMargin()}>
            <CartesianGrid strokeDasharray="3 3" stroke={getChartStrokeColor()} opacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke={getChartTextColor()} 
              fontSize={getFontSize()} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: getFontSize() }}
              tickMargin={5}
              tickFormatter={tickFormatter}
            />
            <YAxis 
              stroke={getChartTextColor()} 
              fontSize={getFontSize()} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: getFontSize() }}
              tickCount={isMobile ? 4 : 5}
            />
            <Tooltip content={<CustomTooltip />} />
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
          <BarChart data={displayData} margin={getMargin()}>
            <CartesianGrid strokeDasharray="3 3" stroke={getChartStrokeColor()} opacity={0.5} />
            <XAxis 
              dataKey="name" 
              stroke={getChartTextColor()} 
              fontSize={getFontSize()} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: getFontSize() }}
              tickMargin={5}
              tickFormatter={tickFormatter}
            />
            <YAxis 
              stroke={getChartTextColor()} 
              fontSize={getFontSize()} 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: getFontSize() }}
              tickCount={isMobile ? 4 : 5}
            />
            <Tooltip content={<CustomTooltip />} />
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
                radius={[4, 4, 0, 0]} 
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
            <Tooltip content={<CustomTooltip />} />
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