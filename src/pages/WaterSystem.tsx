
import React from 'react';
import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  Droplet, Activity, AlertTriangle, BarChart2, ArrowDown, ArrowUp,
  ZoomIn, Filter, Download, Table, ArrowLeft, RefreshCw
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

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

const WaterSystem = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Simplified data for the page
  const waterConsumptionData = [
    { month: "Nov '24", consumption: 35290 },
    { month: "Dec '24", consumption: 36733 },
    { month: "Jan '25", consumption: 32580 },
    { month: "Feb '25", consumption: 44043 },
    { month: "Mar '25", consumption: 34915 },
    { month: "Apr '25", consumption: 43500 }
  ];
  
  const zoneEfficiencyData = [
    { zone: "Zone 01", value: 96.6, color: ZONE_COLORS[0] },
    { zone: "Zone 03A", value: 31.4, color: ZONE_COLORS[1] },
    { zone: "Zone 03B", value: 44.1, color: ZONE_COLORS[2] },
    { zone: "Zone 05", value: 30.7, color: ZONE_COLORS[3] },
    { zone: "Zone 08", value: 90.4, color: ZONE_COLORS[4] },
    { zone: "Zone VS", value: 0, color: ZONE_COLORS[5] }
  ];
  
  const totalConsumption = useMemo(() => {
    return waterConsumptionData[waterConsumptionData.length - 1].consumption;
  }, [waterConsumptionData]);
  
  const handleBackToDashboard = () => {
    navigate('/');
    toast.info("Navigating back to dashboard");
  };
  
  const handleRefreshData = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Water system data refreshed");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header with Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={handleBackToDashboard}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#374151] dark:text-white">
              Water System
            </h2>
            <p className="mt-1 text-sm text-[#6B7280] dark:text-gray-400">
              Monitor water consumption and efficiency across all zones.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={handleRefreshData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Refreshing...' : 'Refresh Data'}</span>
            </Button>
            <Button 
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Consumption Card */}
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Total Consumption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-4xl font-bold text-[var(--color-primary)]">
                    {totalConsumption.toLocaleString()} L
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Monthly consumption
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center">
                  <Droplet className="h-6 w-6 text-[var(--color-primary)]" />
                </div>
              </div>
              <div className="mt-4 h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={waterConsumptionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis tickFormatter={(value) => `${value / 1000}k`} tickLine={false} axisLine={false} />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} L`, 'Consumption']} />
                    <Line type="monotone" dataKey="consumption" stroke={BASE_COLOR} strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Zone Efficiency Card */}
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Zone Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={zoneEfficiencyData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="zone" type="category" width={80} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {zoneEfficiencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Another card for example */}
          <Card className="hover-scale">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Water Loss Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={zoneEfficiencyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      nameKey="zone"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {zoneEfficiencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Water Loss']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WaterSystem;