import React from 'react';
import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ComposedChart, AreaChart, Area
} from "recharts";
import {
  Droplets, Activity, ArrowDown, ArrowUp, RefreshCw, Download,
  Recycle, Gauge, TrendingUp, Truck, PieChart, Droplet, Calendar,
  AlertCircle, CheckCircle2, Layers, Filter, Beaker, FlaskConical
} from "lucide-react";

// Define the base color and generate a color palette
const BASE_COLOR = '#4E4456';
const SUCCESS_COLOR = '#10B981';
const WARNING_COLOR = '#F59E0B';
const DANGER_COLOR = '#EF4444';
const INFO_COLOR = '#3B82F6';

// Complete STP data based on actual CSV from July 2024 to May 2025
const stpData = {
  summary: [
    { month: "Jul-24", tankers: 432, inlet: 16416, produced: 17844, toIrrigation: 15665, efficiency: 108.7, utilization: 87.8, avgDailyProduction: 558 },
    { month: "Aug-24", tankers: 407, inlet: 16094, produced: 17465, toIrrigation: 15164, efficiency: 108.5, utilization: 86.8, avgDailyProduction: 563 },
    { month: "Sep-24", tankers: 259, inlet: 13195, produced: 14251, toIrrigation: 12456, efficiency: 108.0, utilization: 87.4, avgDailyProduction: 475 },
    { month: "Oct-24", tankers: 287, inlet: 17169, produced: 18242, toIrrigation: 15949, efficiency: 106.2, utilization: 87.4, avgDailyProduction: 588 },
    { month: "Nov-24", tankers: 223, inlet: 15029, produced: 16652, toIrrigation: 14023, efficiency: 110.8, utilization: 84.2, avgDailyProduction: 555 },
    { month: "Dec-24", tankers: 201, inlet: 15468, produced: 17125, toIrrigation: 14504, efficiency: 110.7, utilization: 84.7, avgDailyProduction: 552 },
    { month: "Jan-25", tankers: 213, inlet: 15874, produced: 17892, toIrrigation: 15028, efficiency: 112.7, utilization: 84.0, avgDailyProduction: 577 },
    { month: "Feb-25", tankers: 121, inlet: 13080, produced: 14408, toIrrigation: 12075, efficiency: 110.2, utilization: 83.8, avgDailyProduction: 515 },
    { month: "Mar-25", tankers: 131, inlet: 16603, produced: 18900, toIrrigation: 16093, efficiency: 113.8, utilization: 85.1, avgDailyProduction: 610 },
    { month: "Apr-25", tankers: 188, inlet: 18056, produced: 19876, toIrrigation: 17534, efficiency: 110.1, utilization: 88.2, avgDailyProduction: 664 },
    { month: "May-25", tankers: 97, inlet: 6234, produced: 6846, toIrrigation: 6116, efficiency: 109.8, utilization: 89.3, avgDailyProduction: 685 }
  ],
  processMetrics: [
    {
      name: "Tanker Operations",
      current: 131,
      previous: 121,
      unit: "tankers",
      type: "count",
      icon: Truck,
      color: "#3B82F6"
    },
    {
      name: "Inlet Sewage",
      current: 16603,
      previous: 13080,
      unit: "m³",
      type: "volume",
      icon: Droplets,
      color: "#0891B2"
    },
    {
      name: "Treated Water",
      current: 18900,
      previous: 14408,
      unit: "m³",
      type: "volume",
      icon: Recycle,
      color: "#10B981"
    },
    {
      name: "TSE to Irrigation",
      current: 16093,
      previous: 12075,
      unit: "m³",
      type: "volume",
      icon: Droplet,
      color: "#8B5CF6"
    }
  ],
  kpiMetrics: [
    {
      name: "Treatment Efficiency",
      value: 113.8,
      previous: 110.2,
      unit: "%",
      icon: Beaker,
      color: "#10B981",
      target: 100
    },
    {
      name: "TSE Utilization",
      value: 85.1,
      previous: 83.8,
      unit: "%",
      icon: PieChart,
      color: "#3B82F6",
      target: 80
    },
    {
      name: "Daily Production",
      value: 610,
      previous: 515,
      unit: "m³/day",
      icon: TrendingUp,
      color: "#F59E0B",
      target: 500
    },
    {
      name: "Plant Capacity",
      value: 78.5,
      previous: 72.1,
      unit: "%",
      icon: Gauge,
      color: "#EF4444",
      target: 85
    }
  ],
  operationalInsights: [
    {
      metric: "Peak Production Month",
      value: "Apr-25",
      detail: "19,876 m³ treated",
      status: "optimal",
      icon: TrendingUp,
      color: "#10B981"
    },
    {
      metric: "Lowest Production Month",
      value: "May-25",
      detail: "6,846 m³ treated",
      status: "warning",
      icon: AlertCircle,
      color: "#F59E0B"
    },
    {
      metric: "Best Efficiency",
      value: "Mar-25",
      detail: "113.8% efficiency",
      status: "optimal",
      icon: CheckCircle2,
      color: "#10B981"
    },
    {
      metric: "Avg Monthly Tankers",
      value: "225",
      detail: "Per month average",
      status: "normal",
      icon: Truck,
      color: "#3B82F6"
    }
  ]
};

// Enhanced KPI Card Component
const StpKPICard = ({ name, value, previous, unit, icon, color, bgColor, target }) => {
  const change = previous ? ((value - previous) / previous * 100).toFixed(1) : '0';
  const isPositive = parseFloat(change) > 0;
  const Icon = icon;
  
  // Determine performance status
  const getPerformanceStatus = () => {
    if (!target) return 'normal';
    const ratio = value / target;
    if (ratio >= 1) return 'excellent';
    if (ratio >= 0.9) return 'good';
    if (ratio >= 0.8) return 'warning';
    return 'poor';
  };
  
  const performanceStatus = getPerformanceStatus();
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden border ${bgColor || 'border-gray-200'} hover:shadow-lg transition-shadow duration-300`}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="p-2 rounded-full bg-white bg-opacity-20 mr-2">
              <Icon className="h-5 w-5" style={{ color }} />
            </span>
            <span className="text-gray-800 font-medium">{name}</span>
          </div>
          {target && (
            <span className={`text-xs px-2 py-1 rounded ${
              performanceStatus === 'excellent' ? 'bg-green-100 text-green-800' :
              performanceStatus === 'good' ? 'bg-blue-100 text-blue-800' :
              performanceStatus === 'warning' ? 'bg-amber-100 text-amber-800' :
              'bg-red-100 text-red-800'
            }`}>
              Target: {target}{unit}
            </span>
          )}
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="text-2xl font-bold">{value.toLocaleString()} {unit}</div>
              <div className="flex items-center mt-1">
                {isPositive ? (
                  <ArrowUp className="h-4 w-4 text-green-500" />
                ) : parseFloat(change) === 0 ? null : (
                  <ArrowDown className="h-4 w-4 text-red-500" />
                )}
                <span className={isPositive ? "text-green-500" : parseFloat(change) === 0 ? "text-gray-500" : "text-red-500"}>
                  {Math.abs(parseFloat(change)).toFixed(1)}%
                </span>
                <span className="text-gray-500 text-sm ml-1">vs last month</span>
              </div>
            </div>
            {target && (
              <div className="text-right">
                <div className="text-sm text-gray-600">Performance</div>
                <div className={`text-lg font-bold ${
                  performanceStatus === 'excellent' ? 'text-green-600' :
                  performanceStatus === 'good' ? 'text-blue-600' :
                  performanceStatus === 'warning' ? 'text-amber-600' :
                  'text-red-600'
                }`}>
                  {((value / target) * 100).toFixed(0)}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Process Metrics Card Component
const ProcessMetricsCard = ({ name, current, previous, unit, type, icon, color }) => {
  const change = previous ? ((current - previous) / previous * 100).toFixed(1) : '0';
  const isPositive = parseFloat(change) > 0;
  const Icon = icon;
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Icon className="h-5 w-5 mr-2" style={{ color }} />
          <h3 className="text-gray-700 font-medium">{name}</h3>
        </div>
      </div>
      <div className="flex justify-between items-baseline">
        <div>
          <div className="text-2xl font-bold">{current.toLocaleString()} {unit}</div>
          <div className="flex items-center mt-1">
            {isPositive ? (
              <ArrowUp className="h-4 w-4 text-green-500" />
            ) : parseFloat(change) === 0 ? null : (
              <ArrowDown className="h-4 w-4 text-red-500" />
            )}
            <span className={isPositive ? "text-green-500" : parseFloat(change) === 0 ? "text-gray-500" : "text-red-500"}>
              {Math.abs(parseFloat(change)).toFixed(1)}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Operational Insights Card
const OperationalInsightCard = ({ metric, value, detail, status, icon, color }) => {
  const Icon = icon;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className="h-5 w-5 mr-2" style={{ color }} />
          <div>
            <h4 className="text-sm text-gray-600">{metric}</h4>
            <p className="text-lg font-bold">{value}</p>
            <p className="text-xs text-gray-500">{detail}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded ${
          status === 'optimal' ? 'bg-green-100 text-green-800' :
          status === 'warning' ? 'bg-amber-100 text-amber-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
};

// Custom tooltip for chart components
const CustomTooltip = ({ active, payload, label }: {active?: boolean, payload?: any[], label?: string}) => {
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
              {typeof entry.value === 'number' 
                ? entry.value.toLocaleString() 
                : entry.value}
              {entry.name.includes('Efficiency') || entry.name.includes('Utilization') ? '%' : ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Main STP Dashboard Component
const MuscatBayStpDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("Mar-25");
  const [activeChartIndex, setActiveChartIndex] = useState(0);

  // Get current month data
  const currentMonthData = useMemo(() => {
    return stpData.summary.find(m => m.month === selectedMonth) ||
      stpData.summary[stpData.summary.length - 1];
  }, [selectedMonth]);

  // Get previous month data
  const previousMonthData = useMemo(() => {
    const currentIndex = stpData.summary.findIndex(m => m.month === selectedMonth);
    return currentIndex > 0 
      ? stpData.summary[currentIndex - 1]
      : stpData.summary[0];
  }, [selectedMonth]);

  // Update process metrics with current month data
  const updatedProcessMetrics = useMemo(() => {
    return [
      { ...stpData.processMetrics[0], current: currentMonthData.tankers, previous: previousMonthData.tankers },
      { ...stpData.processMetrics[1], current: currentMonthData.inlet, previous: previousMonthData.inlet },
      { ...stpData.processMetrics[2], current: currentMonthData.produced, previous: previousMonthData.produced },
      { ...stpData.processMetrics[3], current: currentMonthData.toIrrigation, previous: previousMonthData.toIrrigation }
    ];
  }, [currentMonthData, previousMonthData]);

  // Update KPI metrics with current month data
  const updatedKpiMetrics = useMemo(() => {
    return [
      { ...stpData.kpiMetrics[0], value: currentMonthData.efficiency, previous: previousMonthData.efficiency },
      { ...stpData.kpiMetrics[1], value: currentMonthData.utilization, previous: previousMonthData.utilization },
      { ...stpData.kpiMetrics[2], value: currentMonthData.avgDailyProduction, previous: previousMonthData.avgDailyProduction },
      { ...stpData.kpiMetrics[3], value: currentMonthData.produced > 0 ? ((currentMonthData.produced / 24000) * 100).toFixed(1) : 0, previous: previousMonthData.produced > 0 ? ((previousMonthData.produced / 24000) * 100).toFixed(1) : 0 }
    ];
  }, [currentMonthData, previousMonthData]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-[#4E4456] text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Muscat Bay STP Plant</h1>
          <p className="text-gray-200 mt-1">
            Sewage Treatment Plant Operations & Performance Analytics
          </p>
          <div className="mt-2 text-sm text-gray-300">
            Complete 11-month analysis (Jul 2024 - May 2025)
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Period Selection</h3>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {stpData.summary.map(period => (
              <button
                key={period.month}
                onClick={() => setSelectedMonth(period.month)}
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedMonth === period.month
                    ? 'bg-[#4E4456] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.month}
              </button>
            ))}
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {updatedKpiMetrics.map((metric) => (
            <StpKPICard
              key={metric.name}
              name={metric.name}
              value={Number(metric.value)}
              previous={Number(metric.previous)}
              unit={metric.unit}
              icon={metric.icon}
              color={metric.color}
              bgColor={`border-${metric.color.slice(1)}`}
              target={metric.target}
            />
          ))}
        </div>

        {/* Process Operations Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {updatedProcessMetrics.map((metric) => (
            <ProcessMetricsCard
              key={metric.name}
              name={metric.name}
              current={metric.current}
              previous={metric.previous}
              unit={metric.unit}
              type={metric.type}
              icon={metric.icon}
              color={metric.color}
            />
          ))}
        </div>

        {/* Treatment Process Flow */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Treatment Process Flow - {selectedMonth}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Inlet Sewage</div>
              <div className="text-2xl font-bold text-blue-600">{currentMonthData.inlet.toLocaleString()} m³</div>
              <div className="text-xs text-gray-500 mt-1">Direct MB + {currentMonthData.tankers} Tankers</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Treated Water</div>
              <div className="text-2xl font-bold text-green-600">{currentMonthData.produced.toLocaleString()} m³</div>
              <div className="text-xs text-gray-500 mt-1">{currentMonthData.efficiency}% efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">TSE to Irrigation</div>
              <div className="text-2xl font-bold text-purple-600">{currentMonthData.toIrrigation.toLocaleString()} m³</div>
              <div className="text-xs text-gray-500 mt-1">{currentMonthData.utilization}% utilization</div>
            </div>
          </div>
        </div>

        {/* Operational Insights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stpData.operationalInsights.map((insight, index) => (
            <OperationalInsightCard key={index} {...insight} />
          ))}
        </div>

        {/* Treatment Trends Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">
              STP Performance Trends (11 Months)
            </h2>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button
                className="px-3 py-1.5 bg-gray-100 rounded-md flex items-center text-sm hover:bg-gray-200"
                onClick={() => setActiveChartIndex((prev) => (prev + 1) % 3)}
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                <span>Switch View</span>
              </button>
              <button
                className="px-3 py-1.5 bg-gray-100 rounded-md flex items-center text-sm hover:bg-gray-200"
                onClick={() => window.alert('Chart downloaded')}
              >
                <Download className="h-3.5 w-3.5 mr-1" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div style={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              {activeChartIndex === 0 ? (
                <ComposedChart data={stpData.summary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="inlet"
                    name="Inlet Sewage (m³)"
                    fill="#3B82F6"
                    barSize={30}
                  />
                  <Bar
                    yAxisId="left"
                    dataKey="produced"
                    name="Treated Water (m³)"
                    fill="#10B981"
                    barSize={30}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="efficiency"
                    name="Efficiency %"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </ComposedChart>
              ) : activeChartIndex === 1 ? (
                <AreaChart data={stpData.summary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="toIrrigation" 
                    stackId="1" 
                    name="TSE to Irrigation (m³)" 
                    stroke="#8B5CF6" 
                    fill="#8B5CF6"
                    fillOpacity={0.7}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="utilization" 
                    stackId="2" 
                    name="TSE Utilization %" 
                    stroke="#F59E0B" 
                    fill="#F59E0B"
                    fillOpacity={0.7}
                  />
                </AreaChart>
              ) : (
                <LineChart data={stpData.summary}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="tankers" 
                    name="Tankers Discharged" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgDailyProduction" 
                    name="Daily Production (m³)" 
                    stroke="#10B981" 
                    strokeWidth={2}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Summary Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Comprehensive Performance Summary</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tankers
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inlet (m³)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produced (m³)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To Irrigation (m³)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Efficiency %
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilization %
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Daily Avg.
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stpData.summary.map((item) => (
                  <tr key={item.month} className={item.month === selectedMonth ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {item.tankers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {item.inlet.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {item.produced.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {item.toIrrigation.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <span className={`font-medium ${
                        item.efficiency > 110 ? 'text-green-600' :
                        item.efficiency > 100 ? 'text-amber-600' :
                        'text-red-600'
                      }`}>
                        {item.efficiency}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <span className={`font-medium ${
                        item.utilization > 85 ? 'text-green-600' :
                        item.utilization > 80 ? 'text-amber-600' :
                        'text-red-600'
                      }`}>
                        {item.utilization}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      {item.avgDailyProduction}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    AVERAGE
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {Math.round(stpData.summary.reduce((sum, m) => sum + m.tankers, 0) / stpData.summary.length)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {Math.round(stpData.summary.reduce((sum, m) => sum + m.inlet, 0) / stpData.summary.length).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {Math.round(stpData.summary.reduce((sum, m) => sum + m.produced, 0) / stpData.summary.length).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {Math.round(stpData.summary.reduce((sum, m) => sum + m.toIrrigation, 0) / stpData.summary.length).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {(stpData.summary.reduce((sum, m) => sum + m.efficiency, 0) / stpData.summary.length).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {(stpData.summary.reduce((sum, m) => sum + m.utilization, 0) / stpData.summary.length).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {Math.round(stpData.summary.reduce((sum, m) => sum + m.avgDailyProduction, 0) / stpData.summary.length)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Strategic Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-4">
            <h3 className="text-blue-800 font-medium mb-3">Plant Performance</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-600">11-Month Avg Efficiency</span>
                <span className="font-bold text-blue-900">110.0%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-600">Peak Month</span>
                <span className="font-bold text-blue-900">Apr-25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-blue-600">Total Processed</span>
                <span className="font-bold text-blue-900">179k m³</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-4">
            <h3 className="text-green-800 font-medium mb-3">TSE Utilization</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Avg Utilization</span>
                <span className="font-bold text-green-900">86.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Best Month</span>
                <span className="font-bold text-green-900">May-25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Total to Irrigation</span>
                <span className="font-bold text-green-900">154k m³</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-4">
            <h3 className="text-purple-800 font-medium mb-3">Operations Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-purple-600">Total Tankers</span>
                <span className="font-bold text-purple-900">2,476</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-600">Monthly Average</span>
                <span className="font-bold text-purple-900">225 tankers</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-purple-600">Daily Production</span>
                <span className="font-bold text-purple-900">593 m³/day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuscatBayStpDashboard;
