
import React from 'react';
import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, 
  ScatterChart, Scatter, ZAxis, ReferenceArea, ReferenceLine
} from "recharts";
import {
  Waves, BarChart3, ArrowDown, ArrowUp, RefreshCw, Download, Home, ChevronRight,
  Filter, Clock, Calendar, MoreHorizontal, PieChart as PieChartIcon, Share2,
  Activity, ThumbsDown, Ban, Check, Settings, AlertTriangle, CheckCircle,
  AreaChart, Menu, Search, Settings2, Sliders, MoreVertical, Trash, Printer, Save,
  Eye, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the base color and generate a color palette
const BASE_COLOR = '#4E4456';
const SECONDARY_COLOR = '#8A7A94';
const ACCENT_COLOR = '#9F5CAC';
const SUCCESS_COLOR = '#10B981';
const WARNING_COLOR = '#F59E0B';
const DANGER_COLOR = '#EF4444';
const INFO_COLOR = '#3B82F6';

// Define color scheme for water data visualization
const WATER_COLORS = {
  consumption: '#0EA5E9',
  tanks: '#0891B2',
  irrigation: '#0D9488',
  residential: '#3B82F6',
  commercial: '#8B5CF6',
  recreation: '#EC4899',
  utility: '#F59E0B',
  other: '#6B7280'
};

// Mock water data for the dashboard
const waterData = {
  // Last 12 months of consumption data
  monthlyConsumption: [
    { month: 'Apr-24', consumption: 68452, tanks: 8420, irrigation: 39741, residential: 12342, commercial: 3871, other: 4078 },
    { month: 'May-24', consumption: 72348, tanks: 9120, irrigation: 42875, residential: 11879, commercial: 4129, other: 4345 },
    { month: 'Jun-24', consumption: 91537, tanks: 10190, irrigation: 58271, residential: 13972, commercial: 4691, other: 4413 },
    { month: 'Jul-24', consumption: 98210, tanks: 11350, irrigation: 63742, residential: 14329, commercial: 4387, other: 4402 },
    { month: 'Aug-24', consumption: 102149, tanks: 11540, irrigation: 65387, residential: 15740, commercial: 5082, other: 4400 },
    { month: 'Sep-24', consumption: 96785, tanks: 10830, irrigation: 61349, residential: 15238, commercial: 4968, other: 4400 },
    { month: 'Oct-24', consumption: 88461, tanks: 9870, irrigation: 53782, residential: 15218, commercial: 5191, other: 4400 },
    { month: 'Nov-24', consumption: 83297, tanks: 9230, irrigation: 48752, residential: 15573, commercial: 5342, other: 4400 },
    { month: 'Dec-24', consumption: 84182, tanks: 9340, irrigation: 49248, residential: 15782, commercial: 5412, other: 4400 },
    { month: 'Jan-25', consumption: 79538, tanks: 8820, irrigation: 45291, residential: 15872, commercial: 5146, other: 4409 },
    { month: 'Feb-25', consumption: 78129, tanks: 8650, irrigation: 44187, residential: 15738, commercial: 5154, other: 4400 },
    { month: 'Mar-25', consumption: 83478, tanks: 9290, irrigation: 49532, residential: 15134, commercial: 5122, other: 4400 }
  ],
  
  // Daily consumption for the latest month
  dailyConsumption: [
    { day: '1', value: 2481, tanks: 274, irrigation: 1438, residential: 467, commercial: 168, other: 134 },
    { day: '2', value: 2736, tanks: 297, irrigation: 1595, residential: 516, commercial: 193, other: 135 },
    { day: '3', value: 2583, tanks: 288, irrigation: 1497, residential: 494, commercial: 170, other: 134 },
    { day: '4', value: 2394, tanks: 265, irrigation: 1387, residential: 458, commercial: 149, other: 135 },
    { day: '5', value: 2619, tanks: 287, irrigation: 1516, residential: 504, commercial: 177, other: 135 },
    { day: '6', value: 2847, tanks: 312, irrigation: 1656, residential: 548, commercial: 196, other: 135 },
    { day: '7', value: 2736, tanks: 301, irrigation: 1587, residential: 526, commercial: 187, other: 135 },
    { day: '8', value: 2394, tanks: 265, irrigation: 1387, residential: 458, commercial: 149, other: 135 },
    { day: '9', value: 2429, tanks: 271, irrigation: 1408, residential: 465, commercial: 149, other: 136 },
    { day: '10', value: 2683, tanks: 295, irrigation: 1554, residential: 516, commercial: 182, other: 136 },
    { day: '11', value: 2936, tanks: 324, irrigation: 1707, residential: 564, commercial: 203, other: 138 },
    { day: '12', value: 2574, tanks: 286, irrigation: 1492, residential: 493, commercial: 167, other: 136 },
    { day: '13', value: 2493, tanks: 275, irrigation: 1441, residential: 478, commercial: 163, other: 136 },
    { day: '14', value: 2472, tanks: 273, irrigation: 1428, residential: 473, commercial: 162, other: 136 },
    { day: '15', value: 2862, tanks: 317, irrigation: 1657, residential: 549, commercial: 203, other: 136 },
    { day: '16', value: 3096, tanks: 342, irrigation: 1798, residential: 596, commercial: 223, other: 137 },
    { day: '17', value: 2943, tanks: 325, irrigation: 1708, residential: 567, commercial: 206, other: 137 },
    { day: '18', value: 2705, tanks: 299, irrigation: 1565, residential: 519, commercial: 185, other: 137 },
    { day: '19', value: 2574, tanks: 285, irrigation: 1487, residential: 494, commercial: 171, other: 137 },
    { day: '20', value: 2637, tanks: 291, irrigation: 1527, residential: 506, commercial: 176, other: 137 },
    { day: '21', value: 2839, tanks: 317, irrigation: 1648, residential: 542, commercial: 195, other: 137 },
    { day: '22', value: 2794, tanks: 310, irrigation: 1616, residential: 535, commercial: 196, other: 137 },
    { day: '23', value: 2583, tanks: 287, irrigation: 1495, residential: 494, commercial: 170, other: 137 },
    { day: '24', value: 2738, tanks: 304, irrigation: 1587, residential: 522, commercial: 188, other: 137 },
    { day: '25', value: 2847, tanks: 316, irrigation: 1648, residential: 545, commercial: 201, other: 137 },
    { day: '26', value: 2782, tanks: 310, irrigation: 1612, residential: 531, commercial: 192, other: 137 },
    { day: '27', value: 2639, tanks: 293, irrigation: 1527, residential: 506, commercial: 176, other: 137 },
    { day: '28', value: 2583, tanks: 287, irrigation: 1493, residential: 495, commercial: 171, other: 137 },
    { day: '29', value: 2429, tanks: 270, irrigation: 1404, residential: 465, commercial: 153, other: 137 },
    { day: '30', value: 2572, tanks: 285, irrigation: 1487, residential: 493, commercial: 170, other: 137 },
    { day: '31', value: 2729, tanks: 303, irrigation: 1581, residential: 523, commercial: 185, other: 137 }
  ],
  
  // Distribution by zones
  zoneDistribution: [
    { name: 'Zone 1 (Residential)', value: 31.8, consumption: 26573, leakProbability: 'Low' },
    { name: 'Zone 2 (Commercial)', value: 14.5, consumption: 12108, leakProbability: 'Medium' },
    { name: 'Zone 3 (Irrigation)', value: 42.7, consumption: 35654, leakProbability: 'High' },
    { name: 'Zone 4 (Amenities)', value: 11.0, consumption: 9183, leakProbability: 'Low' }
  ],
  
  // Distribution by source
  sourceDistribution: [
    { name: 'Municipal Supply', value: 62.3, consumption: 52008 },
    { name: 'Recycled Water', value: 28.7, consumption: 23958 },
    { name: 'Emergency Backup', value: 9.0, consumption: 7512 }
  ],
  
  // Water quality measurements
  qualityMetrics: [
    { name: 'pH Level', value: 7.2, min: 6.5, max: 8.5, status: 'normal' },
    { name: 'Chlorine', value: 1.3, min: 0.5, max: 2.0, unit: 'mg/L', status: 'normal' },
    { name: 'Turbidity', value: 0.7, min: 0, max: 1.0, unit: 'NTU', status: 'normal' },
    { name: 'TDS', value: 280, min: 0, max: 500, unit: 'mg/L', status: 'normal' },
    { name: 'Hardness', value: 120, min: 0, max: 200, unit: 'mg/L', status: 'normal' }
  ],
  
  // Alerts and notifications
  alerts: [
    { 
      id: 1, 
      type: 'warning', 
      message: 'Increased consumption in Zone 3 detected', 
      timestamp: '2025-03-14T08:23:11', 
      status: 'active',
      details: 'Consumption increased by 22% compared to average'
    },
    { 
      id: 2, 
      type: 'info', 
      message: 'Scheduled maintenance for pumping station', 
      timestamp: '2025-03-10T10:45:22', 
      status: 'active',
      details: 'Maintenance scheduled on March 28, 2025'
    },
    { 
      id: 3, 
      type: 'danger', 
      message: 'Possible leak detected in irrigation system', 
      timestamp: '2025-03-07T14:12:09', 
      status: 'active',
      details: 'Abnormal flow detected in Zone 3 section 2'
    },
    { 
      id: 4, 
      type: 'success', 
      message: 'Water quality check completed', 
      timestamp: '2025-03-01T09:30:45', 
      status: 'resolved',
      details: 'All parameters within acceptable range'
    }
  ],
  
  // Summary statistics
  summary: {
    totalConsumption: 83478,
    previousMonthConsumption: 78129,
    changePercentage: 6.8,
    averageDaily: 2693,
    peakDay: { date: '2025-03-16', value: 3096 },
    distributionEfficiency: 92.5,
    leakageLoss: 3.4,
    systemHealth: 95
  },
  
  // Water savings recommendations
  savingsRecommendations: [
    { 
      id: 1, 
      title: 'Optimize irrigation schedules', 
      potential: 8.2, 
      difficulty: 'medium',
      details: 'Adjust irrigation timings based on weather forecast'
    },
    { 
      id: 2, 
      title: 'Fix leaks in Zone 3', 
      potential: 3.4, 
      difficulty: 'high',
      details: 'Repair identified leakages in main irrigation lines'
    },
    { 
      id: 3, 
      title: 'Install smart water meters', 
      potential: 5.7, 
      difficulty: 'medium',
      details: 'Replace conventional meters with smart monitoring'
    },
    { 
      id: 4, 
      title: 'Use recycled water for landscaping', 
      potential: 12.3, 
      difficulty: 'high',
      details: 'Expand treated wastewater usage for non-potable purposes'
    }
  ]
};

// Custom tooltip for chart components
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between mt-1">
            <span style={{ color: entry.color }} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: entry.color }}
              ></div>
              {entry.name}:
            </span>
            <span className="ml-2 font-medium">
              {entry.value.toLocaleString()} {entry.name.includes('consumption') || entry.name.includes('value') ? 'm³' : '%'}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Custom active shape for pie chart
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value, percent } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#333" className="text-xs">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill="#333" className="text-base font-medium">
        {value.toLocaleString()} m³
      </text>
      <text x={cx} y={cy + 35} dy={8} textAnchor="middle" fill="#666" className="text-xs">
        {(percent * 100).toFixed(1)}%
      </text>
      <Pie
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        dataKey="value"
      />
    </g>
  );
};

// Custom box for reference areas on charts
const CustomizedDot = (props) => {
  const { cx, cy, payload, value } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      stroke={value > 2800 ? DANGER_COLOR : value > 2600 ? WARNING_COLOR : SUCCESS_COLOR}
      strokeWidth={1.5}
      fill="white"
      fillOpacity={1}
    />
  );
};

// Alert badge component
const AlertBadge = ({ type }) => {
  const getBadgeConfig = () => {
    switch(type) {
      case 'info':
        return { bg: 'bg-blue-100', text: 'text-blue-800', icon: <Activity className="h-3.5 w-3.5" /> };
      case 'warning':
        return { bg: 'bg-amber-100', text: 'text-amber-800', icon: <AlertTriangle className="h-3.5 w-3.5" /> };
      case 'danger':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: <Ban className="h-3.5 w-3.5" /> };
      case 'success':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="h-3.5 w-3.5" /> };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: <Activity className="h-3.5 w-3.5" /> };
    }
  };
  
  const config = getBadgeConfig();
  
  return (
    <span className={`flex items-center px-2 py-1 rounded ${config.bg} ${config.text}`}>
      {config.icon}
      <span className="ml-1 text-xs font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
    </span>
  );
};

// Water KPI Card Component
const WaterKPICard = ({ title, value, unit, change = "0", icon, bgColor, size = "md", onClick = () => {} }) => {
  const isPositive = parseFloat(change) > 0;
  
  return (
    <div 
      className={`rounded-lg shadow-md overflow-hidden ${bgColor} hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-gray-600 font-medium">{title}</h3>
          <span className="p-2 rounded-full bg-white bg-opacity-20">
            {icon}
          </span>
        </div>
        <div className="mt-3">
          <div className="text-2xl font-bold">
            {typeof value === 'number' ? value.toLocaleString() : value}
            <span className="ml-1 text-gray-600 text-lg">{unit}</span>
          </div>
          <div className="flex items-center mt-1">
            {isPositive ? (
              <ArrowUp className="h-4 w-4 text-red-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-green-500" />
            )}
            <span className={isPositive ? "text-red-500" : "text-green-500"}>
              {Math.abs(parseFloat(change))}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quality Metric Component
const QualityMetricCard = ({ name, value, min, max, unit = "", status }) => {
  // Calculate percentage for the progress indicator
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Determine status color
  const getStatusColor = () => {
    if (status === 'critical') return 'bg-red-500';
    if (status === 'warning') return 'bg-amber-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">{name}</span>
        <span className="text-sm text-gray-500">{min} - {max} {unit}</span>
      </div>
      <div className="flex items-end justify-between mb-1">
        <span className="text-xl font-bold">{value} {unit}</span>
        <span className={`px-2 py-0.5 text-xs rounded ${
          status === 'normal' ? 'bg-green-100 text-green-800' :
          status === 'warning' ? 'bg-amber-100 text-amber-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status.toUpperCase()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div 
          className={`h-2 rounded-full ${getStatusColor()}`} 
          style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const MuscatBayWaterDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMonth, setSelectedMonth] = useState("Mar-25");
  const [selectedZone, setSelectedZone] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePieIndex, setActivePieIndex] = useState(0);
  const navigate = useNavigate();
  
  // Current month's data
  const currentMonthData = waterData.monthlyConsumption[waterData.monthlyConsumption.length - 1];
  
  // Previous month's data
  const previousMonthData = waterData.monthlyConsumption[waterData.monthlyConsumption.length - 2];
  
  // Calculate change percentages
  const calculatedChange = (currentMonthData.consumption - previousMonthData.consumption) / previousMonthData.consumption * 100;
  const irrigationChange = (currentMonthData.irrigation - previousMonthData.irrigation) / previousMonthData.irrigation * 100;
  const residentialChange = (currentMonthData.residential - previousMonthData.residential) / previousMonthData.residential * 100;
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-[#4E4456] text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2 text-white hover:bg-white/20" 
              onClick={() => navigate('/')}
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Muscat Bay Water Management</h1>
              <p className="text-gray-200 mt-1">
                Comprehensive water monitoring and analytics system
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        {/* Summary KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <WaterKPICard
            title="Total Water Consumption"
            value={waterData.summary.totalConsumption}
            unit="m³"
            change="6.8"
            icon={<Waves className="h-5 w-5 text-blue-600" />}
            bgColor="border border-blue-500"
            onClick={() => {}}
          />
          <WaterKPICard
            title="Irrigation Usage"
            value={currentMonthData.irrigation}
            unit="m³"
            change="12.1"
            icon={<Activity className="h-5 w-5 text-green-600" />}
            bgColor="border border-green-500"
            onClick={() => {}}
          />
          <WaterKPICard
            title="Residential Consumption"
            value={currentMonthData.residential}
            unit="m³"
            change="-3.8"
            icon={<Home className="h-5 w-5 text-purple-600" />}
            bgColor="border border-purple-500"
            onClick={() => {}}
          />
        </div>

        {/* Chart Tabs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-gray-600" />
              <h2 className="text-lg font-medium text-gray-800">
                Water Consumption Trends
              </h2>
            </div>
            <div className="flex mt-2 sm:mt-0">
              <div className="mr-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1 text-sm outline-none"
                >
                  <option value="daily">Daily View</option>
                  <option value="monthly">Monthly View</option>
                </select>
              </div>
              <div className="flex space-x-1">
                <button
                  className="px-3 py-1 bg-gray-100 rounded-md flex items-center text-sm"
                  onClick={() => window.alert('Chart downloaded')}
                >
                  <Download className="h-3.5 w-3.5 mr-1" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button
                  className="px-3 py-1 bg-gray-100 rounded-md flex items-center text-sm"
                  onClick={() => window.alert('Print chart')}
                >
                  <RefreshCw className="h-3.5 w-3.5 mr-1" />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>
          </div>
          
          <div style={{ height: 380 }}>
            <ResponsiveContainer width="100%" height="100%">
              {selectedPeriod === 'monthly' ? (
                <BarChart
                  data={waterData.monthlyConsumption}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="irrigation" 
                    name="Irrigation" 
                    stackId="a" 
                    fill={WATER_COLORS.irrigation} 
                  />
                  <Bar 
                    dataKey="residential" 
                    name="Residential" 
                    stackId="a" 
                    fill={WATER_COLORS.residential} 
                  />
                  <Bar 
                    dataKey="commercial" 
                    name="Commercial" 
                    stackId="a" 
                    fill={WATER_COLORS.commercial} 
                  />
                  <Bar 
                    dataKey="other" 
                    name="Other" 
                    stackId="a" 
                    fill={WATER_COLORS.other} 
                  />
                </BarChart>
              ) : (
                <LineChart
                  data={waterData.dailyConsumption}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <ReferenceLine y={2800} stroke={DANGER_COLOR} strokeDasharray="3 3" />
                  <ReferenceLine y={2600} stroke={WARNING_COLOR} strokeDasharray="3 3" />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Daily Consumption"
                    stroke={WATER_COLORS.consumption} 
                    dot={<CustomizedDot />}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution and Quality Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Zone Distribution Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Consumption by Zone</h3>
              <PieChartIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activePieIndex}
                    activeShape={renderActiveShape}
                    data={waterData.zoneDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill={WATER_COLORS.consumption}
                    dataKey="consumption"
                    onMouseEnter={(_, index) => setActivePieIndex(index)}
                  >
                    {waterData.zoneDistribution.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? WATER_COLORS.residential : 
                              index === 1 ? WATER_COLORS.commercial : 
                              index === 2 ? WATER_COLORS.irrigation : 
                              WATER_COLORS.other} 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                {waterData.zoneDistribution.map((zone, index) => (
                  <div 
                    key={index}
                    className={`flex items-center p-2 rounded-md ${
                      zone.leakProbability === 'High' ? 'bg-red-50' : 
                      zone.leakProbability === 'Medium' ? 'bg-amber-50' : 
                      'bg-blue-50'
                    }`}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ 
                        backgroundColor: index === 0 ? WATER_COLORS.residential : 
                                       index === 1 ? WATER_COLORS.commercial : 
                                       index === 2 ? WATER_COLORS.irrigation : 
                                       WATER_COLORS.other
                      }}
                    ></div>
                    <span className="text-xs font-medium truncate">{zone.name}</span>
                    <span className={`ml-auto text-xs ${
                      zone.leakProbability === 'High' ? 'text-red-700' : 
                      zone.leakProbability === 'Medium' ? 'text-amber-700' : 
                      'text-blue-700'
                    }`}>
                      {zone.leakProbability}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Water Quality Metrics */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Water Quality Metrics</h3>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <Filter className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <Clock className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {waterData.qualityMetrics.map((metric, index) => (
                <QualityMetricCard
                  key={index}
                  name={metric.name}
                  value={metric.value}
                  min={metric.min}
                  max={metric.max}
                  unit={metric.unit || ''}
                  status={metric.status}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Alerts and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Alerts Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Recent Alerts</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {waterData.alerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                  <AlertBadge type={alert.type} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.details}</p>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    {new Date(alert.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-blue-600 text-sm hover:text-blue-800 flex items-center mx-auto">
                <span>View All Alerts</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-800">Water Saving Recommendations</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {waterData.savingsRecommendations.map((rec) => (
                <div key={rec.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                  <div className={`px-2 py-1 rounded-md text-xs font-bold ${
                    rec.potential > 10 ? 'bg-green-100 text-green-700' : 
                    rec.potential > 5 ? 'bg-blue-100 text-blue-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {rec.potential}%
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{rec.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{rec.details}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${
                    rec.difficulty === 'high' ? 'bg-amber-100 text-amber-800' : 
                    rec.difficulty === 'medium' ? 'bg-blue-100 text-blue-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {rec.difficulty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Consumption by Source</h3>
            <div className="flex items-center space-x-2">
              <select 
                className="text-sm bg-gray-100 border border-gray-300 rounded-md px-3 py-1 outline-none"
                defaultValue="all"
              >
                <option value="all">All Sources</option>
                <option value="municipal">Municipal Supply</option>
                <option value="recycled">Recycled Water</option>
                <option value="emergency">Emergency Backup</option>
              </select>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume (m³)
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distribution (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost (OMR)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {waterData.sourceDistribution.map((source, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{source.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-900">{source.consumption.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-900">{source.value}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-sm text-gray-900">
                        {(source.consumption * 0.003).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">TOTAL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {waterData.summary.totalConsumption.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    100%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {(waterData.summary.totalConsumption * 0.003).toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuscatBayWaterDashboard;
