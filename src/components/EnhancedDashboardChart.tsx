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
  Cell
} from "recharts";
import { COLORS } from "@/lib/colors";

interface EnhancedDashboardChartProps {
  type: "line" | "bar" | "pie";
  data: any[];
  dataKeys: string[];
  colors: string[];
  height?: number;
  isDarkMode?: boolean;
}

export function EnhancedDashboardChart({
  type,
  data,
  dataKeys,
  colors,
  height = 250,
  isDarkMode = false
}: EnhancedDashboardChartProps) {
  
  // Helper functions for chart styling based on dark mode
  const getChartStrokeColor = () => isDarkMode ? COLORS.borderDark : COLORS.borderLight;
  const getChartTextColor = () => isDarkMode ? COLORS.textLight : COLORS.textMuted;
  
  // Tooltip styles
  const tooltipStyle = {
    backgroundColor: isDarkMode ? 'rgba(31,41,55,0.95)' : 'rgba(255,255,255,0.95)',
    border: isDarkMode ? `1px solid ${COLORS.borderDark}` : `1px solid ${COLORS.borderLight}`,
    borderRadius: '0.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    color: isDarkMode ? COLORS.textLight : COLORS.textDark
  };

  // Render different chart types
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={getChartStrokeColor()} />
            <XAxis 
              dataKey="name" 
              stroke={getChartTextColor()} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke={getChartTextColor()} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              cursor={{ stroke: colors[0], strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            {dataKeys.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[index % colors.length]} 
                strokeWidth={2.5} 
                dot={{ r: 4, fill: colors[index % colors.length] }} 
                activeDot={{ r: 7, stroke: isDarkMode ? COLORS.bgDarkElevated : 'white', strokeWidth: 2, fill: colors[index % colors.length] }}
              />
            ))}
          </LineChart>
        );
      
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={getChartStrokeColor()} />
            <XAxis 
              dataKey="name" 
              stroke={getChartTextColor()} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <YAxis 
              stroke={getChartTextColor()} 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
            />
            <Tooltip 
              contentStyle={tooltipStyle}
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            />
            {dataKeys.map((key, index) => (
              <Bar 
                key={key}
                dataKey={key} 
                fill={colors[index % colors.length]} 
                radius={[6, 6, 0, 0]} 
                barSize={35}
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
              outerRadius={90}
              innerRadius={55}
              dataKey={dataKeys[0]}
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                  stroke={isDarkMode ? COLORS.bgDarkElevated : 'white'} 
                  strokeWidth={3} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={tooltipStyle}
            />
            <Legend 
              formatter={(value, entry) => (
                <span className={`${isDarkMode ? 'text-gray-300' : 'text-text-muted'} ml-1.5 text-xs`}>
                  {value} ({entry.payload[dataKeys[0]]})
                </span>
              )} 
              iconSize={10} 
              wrapperStyle={{ fontSize: '0.75rem' }}
            />
          </PieChart>
        );
      
      default:
        return null;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      {renderChart()}
    </ResponsiveContainer>
  );
}