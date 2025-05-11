
import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart, 
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChartDataPoint {
  name: string;
  value?: number;
  [key: string]: any;
}

interface DashboardChartProps {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: ChartDataPoint[];
  dataKeys: string[];
  colors?: string[];
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  height?: number;
  className?: string;
  gradients?: boolean;
}

export function DashboardChart({
  type,
  data,
  dataKeys,
  colors = ['#8B5CF6', '#6E5A7E', '#A78BFA', '#C4B5FD'],
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  height = 300,
  className,
  gradients = true
}: DashboardChartProps) {
  const isMobile = useIsMobile();

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.15)" />}
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: isMobile ? 10 : 12 }}
          tickMargin={8}
          axisLine={{ stroke: 'rgba(120, 120, 120, 0.2)' }}
        />
        <YAxis 
          tick={{ fontSize: isMobile ? 10 : 12 }}
          tickMargin={8} 
          axisLine={{ stroke: 'rgba(120, 120, 120, 0.2)' }}
        />
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        {dataKeys.map((key, index) => {
          const color = colors[index % colors.length];
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ stroke: color, strokeWidth: 2, r: 4, fill: 'white' }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(120, 120, 120, 0.15)" />}
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickMargin={8}
            axisLine={{ stroke: 'rgba(120, 120, 120, 0.2)' }}
          />
          <YAxis 
            tick={{ fontSize: isMobile ? 10 : 12 }}
            tickMargin={8} 
            axisLine={{ stroke: 'rgba(120, 120, 120, 0.2)' }}
          />
          {showTooltip && <Tooltip />}
          {showLegend && <Legend />}
          {dataKeys.map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index % colors.length]} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={isMobile ? 60 : 80}
          innerRadius={isMobile ? 30 : 40}
          fill="#8884d8"
          dataKey={dataKeys[0]}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
      </PieChart>
    </ResponsiveContainer>
  );

  let chartComponent;
  switch (type) {
    case 'pie':
      chartComponent = renderPieChart();
      break;
    case 'bar':
      chartComponent = renderBarChart();
      break;
    case 'line':
    case 'area':
    default:
      chartComponent = renderLineChart();
  }

  return (
    <div className={className}>
      {chartComponent}
    </div>
  );
}
