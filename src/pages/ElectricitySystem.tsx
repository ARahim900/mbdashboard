import React from 'react';
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ComposedChart
} from "recharts";
import {
  Zap, Activity, ArrowDown, ArrowUp, RefreshCw, Download, Home, ChevronRight,
  Power, Lightbulb, Droplets, Sliders, Building2, TreePine
} from "lucide-react";

// Define the base color and generate a color palette
const BASE_COLOR = '#4E4456';
const SECONDARY_COLOR = '#8A7A94';
const ACCENT_COLOR = '#9F5CAC';
const SUCCESS_COLOR = '#10B981';
const WARNING_COLOR = '#F59E0B';
const DANGER_COLOR = '#EF4444';
const INFO_COLOR = '#3B82F6';

// Equipment type colors
const EQUIPMENT_TYPE_COLORS = {
  'PS': '#0EA5E9',        // Pumping Stations - Blue
  'LS': '#0891B2',        // Lifting Stations - Cyan
  'IRR': '#10B981',       // Irrigation - Green
  'DB': '#8B5CF6',        // Distribution Boards - Purple
  'Street Light': '#F59E0B', // Street Lights - Amber
  'D_Building': '#EF4444',   // Buildings - Red
  'FP-Landscape Lights Z3': '#FBBF24', // Landscape Lights - Yellow
  'Retail': '#3B82F6'      // Retail - Blue
};

// Equipment type icons
const EQUIPMENT_TYPE_ICONS = {
  'PS': Sliders,
  'LS': Activity,
  'IRR': Droplets,
  'DB': Power,
  'Street Light': Lightbulb,
  'D_Building': Building2,
  'FP-Landscape Lights Z3': TreePine,
  'Retail': Building2
};

// Real electricity data - extracted from your actual CSV
const electricityData = {
  summary: [
    { month: "Apr-24", totalConsumption: 55831, totalCost: 1396, peakDemand: 215 },
    { month: "May-24", totalConsumption: 61054, totalCost: 1526, peakDemand: 248 },
    { month: "June-24", totalConsumption: 64229, totalCost: 1606, peakDemand: 235 },
    { month: "Jul-24", totalConsumption: 66953, totalCost: 1674, peakDemand: 252 },
    { month: "Aug-24", totalConsumption: 82645, totalCost: 2066, peakDemand: 278 },
    { month: "Sep-24", totalConsumption: 79432, totalCost: 1986, peakDemand: 328 },
    { month: "Oct-24", totalConsumption: 82108, totalCost: 2053, peakDemand: 293 },
    { month: "Nov-24", totalConsumption: 86823, totalCost: 2171, peakDemand: 273 },
    { month: "Dec-24", totalConsumption: 102245, totalCost: 2556, peakDemand: 279 },
    { month: "Jan-25", totalConsumption: 105672, totalCost: 2642, peakDemand: 258 },
    { month: "Feb-25", totalConsumption: 107005, totalCost: 2675, peakDemand: 278 },
    { month: "Mar-25", totalConsumption: 78479, totalCost: 1962, peakDemand: 289 }
  ],
  assetTypes: [
    { type: "PS", name: "Pumping Stations", count: 4, totalConsumption: 6410, change: 14.0 },
    { type: "LS", name: "Lifting Stations", count: 4, totalConsumption: 3699, change: -14.8 },
    { type: "IRR", name: "Irrigation", count: 4, totalConsumption: 3908, change: -14.7 },
    { type: "DB", name: "Distribution Boards", count: 6, totalConsumption: 638, change: 8.3 },
    { type: "Street Light", name: "Street Lights", count: 5, totalConsumption: 9308, change: -15.2 },
    { type: "D_Building", name: "Building Distribution", count: 28, totalConsumption: 39410, change: -39.0 },
    { type: "FP-Landscape Lights Z3", name: "Landscape Lights", count: 3, totalConsumption: 47, change: -17.5 },
    { type: "Retail", name: "Retail/Commercial", count: 2, totalConsumption: 15059, change: -7.3 }
  ]
};

// Simple KPI Card Component
const AssetKPICard = ({ type, name, consumption, change, count, bgColor, icon }) => {
  const cost = consumption * 0.025;
  const isPositive = change > 0;
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden border ${bgColor} hover:shadow-lg transition-shadow duration-300`}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="p-2 rounded-full bg-white bg-opacity-20 mr-2">
              {React.createElement(icon, { className: "h-5 w-5", style: { color: EQUIPMENT_TYPE_COLORS[type] } })}
            </span>
            <span className="text-gray-800 font-medium">{name}</span>
          </div>
          <span className="text-sm text-gray-500">{count} units</span>
        </div>
        <div className="mt-3">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="text-sm text-gray-600">Consumption</div>
              <div className="text-xl font-bold">{consumption.toLocaleString()} kWh</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Cost</div>
              <div className="text-xl font-bold text-green-600">OMR {cost.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex items-center mt-2">
            {isPositive ? (
              <ArrowUp className="h-4 w-4 text-red-500" />
            ) : (
              <ArrowDown className="h-4 w-4 text-green-500" />
            )}
            <span className={isPositive ? "text-red-500" : "text-green-500"}>
              {Math.abs(change).toFixed(1)}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
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
              {entry.value.toLocaleString()} {entry.name.includes('Cost') ? 'OMR' : 'kWh'}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Main Dashboard Component
const MuscatBayElectricalDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("Mar-25");
  const [activeChartIndex, setActiveChartIndex] = useState(0);

  // Get current month data
  const currentMonthData = useMemo(() => {
    return electricityData.summary.find(m => m.month === selectedMonth) ||
      electricityData.summary[electricityData.summary.length - 1];
  }, [selectedMonth]);

  // Get previous month data
  const previousMonthData = useMemo(() => {
    const currentMonthIndex = electricityData.summary.findIndex(m => m.month === selectedMonth);
    return currentMonthIndex > 0
      ? electricityData.summary[currentMonthIndex - 1]
      : { totalConsumption: 0, totalCost: 0, peakDemand: 0 };
  }, [selectedMonth]);

  // Calculate percentage changes
  const getPercentChange = useCallback((current, previous) => {
    if (previous === 0) return "N/A";
    const change = ((current / previous - 1) * 100).toFixed(1);
    return isNaN(parseFloat(change)) || !isFinite(parseFloat(change)) ? "N/A" : change;
  }, []);

  // Prepare chart data
  const chartData = useMemo(() => {
    return electricityData.summary.map(item => ({
      ...item,
      totalCost: (item.totalConsumption * 0.025).toFixed(2)
    }));
  }, []);

  const assetChartData = useMemo(() => {
    return electricityData.assetTypes.map(asset => ({
      ...asset,
      cost: (asset.totalConsumption * 0.025).toFixed(2)
    }));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-[#4E4456] text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Muscat Bay Electrical Distribution</h1>
          <p className="text-gray-200 mt-1">
            Real-time analytics for electrical distribution infrastructure
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Period Selection</h3>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {electricityData.summary.map(period => (
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

        {/* Total KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md border border-yellow-500 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600 font-medium">Total Consumption</h3>
              <Zap className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="flex justify-between items-baseline">
              <div>
                <div className="text-2xl font-bold">{currentMonthData.totalConsumption.toLocaleString()} kWh</div>
                <div className="flex items-center mt-1">
                  {parseFloat(getPercentChange(currentMonthData.totalConsumption, previousMonthData.totalConsumption)) > 0 ? (
                    <ArrowUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-green-500" />
                  )}
                  <span className={parseFloat(getPercentChange(currentMonthData.totalConsumption, previousMonthData.totalConsumption)) > 0 ? "text-red-500" : "text-green-500"}>
                    {Math.abs(parseFloat(getPercentChange(currentMonthData.totalConsumption, previousMonthData.totalConsumption))).toFixed(1)}%
                  </span>
                  <span className="text-gray-500 text-sm ml-1">vs last month</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Cost</div>
                <div className="text-xl font-bold text-green-600">OMR {currentMonthData.totalCost.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-green-500 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600 font-medium">Average Rate</h3>
              <Power className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold">0.025 OMR/kWh</div>
            <div className="text-sm text-gray-500 mt-1">Fixed tariff rate</div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-red-500 p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-600 font-medium">Peak Demand</h3>
              <Activity className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex justify-between items-baseline">
              <div>
                <div className="text-2xl font-bold">{currentMonthData.peakDemand} kW</div>
                <div className="flex items-center mt-1">
                  {parseFloat(getPercentChange(currentMonthData.peakDemand, previousMonthData.peakDemand)) > 0 ? (
                    <ArrowUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-green-500" />
                  )}
                  <span className={parseFloat(getPercentChange(currentMonthData.peakDemand, previousMonthData.peakDemand)) > 0 ? "text-red-500" : "text-green-500"}>
                    {Math.abs(parseFloat(getPercentChange(currentMonthData.peakDemand, previousMonthData.peakDemand))).toFixed(1)}%
                  </span>
                  <span className="text-gray-500 text-sm ml-1">vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Type KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {electricityData.assetTypes.map((asset) => (
            <AssetKPICard
              key={asset.type}
              type={asset.type}
              name={asset.name}
              consumption={asset.totalConsumption}
              change={asset.change}
              count={asset.count}
              bgColor={`border-${EQUIPMENT_TYPE_COLORS[asset.type].slice(1)}`}
              icon={EQUIPMENT_TYPE_ICONS[asset.type]}
            />
          ))}
        </div>

        {/* Consumption Trends Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">
              Electrical Distribution Analysis - Last 12 Months
            </h2>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <button
                className="px-3 py-1.5 bg-gray-100 rounded-md flex items-center text-sm hover:bg-gray-200"
                onClick={() => setActiveChartIndex((prev) => (prev + 1) % 2)}
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                <span>Toggle View</span>
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
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="totalConsumption"
                    name="Consumption (kWh)"
                    fill={BASE_COLOR}
                    barSize={30}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="totalCost"
                    name="Cost (OMR)"
                    stroke={SUCCESS_COLOR}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </ComposedChart>
              ) : (
                <BarChart data={assetChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalConsumption" name="Consumption (kWh)" fill={BASE_COLOR} />
                  <Bar dataKey="cost" name="Cost (OMR)" fill={SUCCESS_COLOR} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Summary Table */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Asset Summary - {selectedMonth}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Asset Type
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Consumption (kWh)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost (OMR)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change %
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {electricityData.assetTypes.map((asset) => (
                  <tr key={asset.type} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {React.createElement(EQUIPMENT_TYPE_ICONS[asset.type], { 
                          className: "h-4 w-4 mr-2", 
                          style: { color: EQUIPMENT_TYPE_COLORS[asset.type] } 
                        })}
                        <span className="text-sm font-medium text-gray-900">{asset.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {asset.count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {asset.totalConsumption.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-green-600">
                      {(asset.totalConsumption * 0.025).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end">
                        {asset.change > 0 ? (
                          <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                        )}
                        <span className={asset.change > 0 ? "text-red-500" : "text-green-500"}>
                          {Math.abs(asset.change).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-sm font-medium text-gray-900">
                    TOTAL
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    {currentMonthData.totalConsumption.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-green-600">
                    {currentMonthData.totalCost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <div className="flex items-center justify-end">
                      {parseFloat(getPercentChange(currentMonthData.totalConsumption, previousMonthData.totalConsumption)) > 0 ? (
                        <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                      )}
                      <span className={parseFloat(getPercentChange(currentMonthData.totalConsumption, previousMonthData.totalConsumption)) > 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
                        {Math.abs(parseFloat(getPercentChange(currentMonthData.totalConsumption, previousMonthData.totalConsumption))).toFixed(1)}%
                      </span>
                    </div>
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

export default MuscatBayElectricalDashboard;
