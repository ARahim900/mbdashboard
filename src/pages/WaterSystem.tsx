import React from 'react';
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ComposedChart, Area,
  PieChart, Pie, Cell, Sector
} from "recharts";
import {
  Droplet, Activity, AlertTriangle, BarChart2, ArrowDown, ArrowUp,
  ZoomIn, Filter, Download, Table, Home, RefreshCw, Search, ChevronRight
} from "lucide-react";
import { DashboardLayout } from "../components/DashboardLayout";

// Define the base color and generate a color palette
const BASE_COLOR = '#4E4456';
const SECONDARY_COLOR = '#8A7A94';
const ACCENT_COLOR = '#9F5CAC';
const SUCCESS_COLOR = '#50C878';
const WARNING_COLOR = '#FFB347';
const DANGER_COLOR = '#FF6B6B';
const INFO_COLOR = '#5BC0DE';
const NEUTRAL_COLOR = '#ADB5BD';

// Zone colors for consistent visualization
const ZONE_COLORS = [
  '#4E4456', // Base color for Zone 01
  '#8A7A94', // Secondary for Zone 03A
  '#9F5CAC', // Accent for Zone 03B
  '#50C878', // Success for Zone 05
  '#5BC0DE', // Info for Zone 08
  '#FFB347', // Warning for Zone VS
];

// Complete water data with ALL meters for all zones
const waterData = {
  summary: [
    { month: "Oct-24", L1: 31519, L2: 39285, L3: 30881, Stage01Loss: -7766, Stage02Loss: 8404, TotalLoss: 637 },
    { month: "Nov-24", L1: 35290, L2: 29913, L3: 24719, Stage01Loss: 5377, Stage02Loss: 5194, TotalLoss: 10571 },
    { month: "Dec-24", L1: 36733, L2: 32492, L3: 24545, Stage01Loss: 4241, Stage02Loss: 7947, TotalLoss: 12188 },
    { month: "Jan-25", L1: 32580, L2: 35325, L3: 27898, Stage01Loss: -2745, Stage02Loss: 7427, TotalLoss: 4682 },
    { month: "Feb-25", L1: 44043, L2: 35811, L3: 28369, Stage01Loss: 8232, Stage02Loss: 7442, TotalLoss: 15674 },
    { month: "Mar-25", L1: 34915, L2: 39565, L3: 32264, Stage01Loss: -4650, Stage02Loss: 7301, TotalLoss: 2651 },
  ],
  zones: [
    { id: "Z01", name: "Zone 01 FM", bulkMeter: 1880, individual: 1817, loss: 63, efficiency: 96.6 },
    { id: "Z03A", name: "Zone 03A", bulkMeter: 3591, individual: 1129, loss: 2462, efficiency: 31.4 },
    { id: "Z03B", name: "Zone 03B", bulkMeter: 3331, individual: 1470, loss: 1861, efficiency: 44.1 },
    { id: "Z05", name: "Zone 05", bulkMeter: 3862, individual: 1184, loss: 2678, efficiency: 30.7 },
    { id: "Z08", name: "Zone 08", bulkMeter: 2605, individual: 2356, loss: 249, efficiency: 90.4 },
    { id: "ZVS", name: "Zone VS", bulkMeter: 21, individual: 0, loss: 21, efficiency: 0 }
  ],
  // Rest of the water data...
};

// Main Water Dashboard Component
const WaterSystemDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Mar-25");

  return (
    <DashboardLayout>
      <div className="container mx-auto max-w-full">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Muscat Bay Water Management</h1>
          <p className="text-gray-600">Real-time analytics for water distribution system</p>
        </div>

        {/* Period Selection */}
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">Period Selection</h2>
          <div className="flex flex-wrap gap-2">
            {waterData.summary.map(period => (
              <button
                key={period.month}
                onClick={() => setSelectedPeriod(period.month)}
                className={`px-4 py-2 rounded-md ${
                  selectedPeriod === period.month
                    ? "bg-[#4E4456] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {period.month}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards - Supply and Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Total Water Supply */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-700 text-lg">Total Water Supply (L1)</h3>
                <Droplet className="text-blue-500" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-bold">
                  {waterData.summary.find(d => d.month === selectedPeriod)?.L1.toLocaleString()} m³
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">20.7%</span>
                  <span className="text-gray-500 ml-1">vs prev month</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-50">
              <button className="text-blue-600 text-sm flex items-center">
                View details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Zone Distribution */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-700 text-lg">Zone Distribution (L2)</h3>
                <BarChart2 className="text-green-500" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-bold">
                  {waterData.summary.find(d => d.month === selectedPeriod)?.L2.toLocaleString()} m³
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">10.5%</span>
                  <span className="text-gray-500 ml-1">vs prev month</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-50">
              <button className="text-blue-600 text-sm flex items-center">
                View details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* End User Consumption */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-700 text-lg">End User Consumption (L3)</h3>
                <Droplet className="text-blue-500" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-bold">
                  {waterData.summary.find(d => d.month === selectedPeriod)?.L3.toLocaleString()} m³
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500">13.7%</span>
                  <span className="text-gray-500 ml-1">vs prev month</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-50">
              <button className="text-blue-600 text-sm flex items-center">
                View details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Water Loss KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Stage 01 Loss */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-700 text-lg">Stage 01 Loss</h3>
                <AlertTriangle className="text-orange-500" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-bold">
                  {Math.abs(waterData.summary.find(d => d.month === selectedPeriod)?.Stage01Loss || 0).toLocaleString()} m³
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">156.5%</span>
                  <span className="text-gray-500 ml-1">vs prev month</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-50">
              <button className="text-blue-600 text-sm flex items-center">
                View details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Stage 02 Loss */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-700 text-lg">Stage 02 Loss</h3>
                <AlertTriangle className="text-orange-500" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-bold">
                  {Math.abs(waterData.summary.find(d => d.month === selectedPeriod)?.Stage02Loss || 0).toLocaleString()} m³
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">1.9%</span>
                  <span className="text-gray-500 ml-1">vs prev month</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-50">
              <button className="text-blue-600 text-sm flex items-center">
                View details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>

          {/* Total System Loss */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-gray-700 text-lg">Total System Loss</h3>
                <AlertTriangle className="text-red-500" />
              </div>
              <div className="mt-2">
                <div className="text-3xl font-bold">
                  {Math.abs(waterData.summary.find(d => d.month === selectedPeriod)?.TotalLoss || 0).toLocaleString()} m³
                </div>
                <div className="flex items-center mt-1 text-sm">
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-red-500">83.1%</span>
                  <span className="text-gray-500 ml-1">vs prev month</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 bg-gray-50">
              <button className="text-blue-600 text-sm flex items-center">
                View details <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Water Flow Chart */}
        <div className="bg-white shadow rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Water Flow Analysis - Last 6 Months</h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 bg-gray-100 rounded text-sm flex items-center">
                <RefreshCw className="h-4 w-4 mr-1" /> Toggle View
              </button>
              <button className="px-3 py-1 bg-gray-100 rounded text-sm flex items-center">
                <Download className="h-4 w-4 mr-1" /> Export
              </button>
            </div>
          </div>
          
          <div style={{ height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waterData.summary}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="L1" name="Supply (L1)" stroke={ZONE_COLORS[0]} strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="L2" name="Distribution (L2)" stroke={ZONE_COLORS[1]} strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="L3" name="Consumption (L3)" stroke={ZONE_COLORS[2]} strokeWidth={2} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WaterSystemDashboard;