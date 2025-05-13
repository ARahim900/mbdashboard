
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { EnhancedDashboardCard } from "@/components/EnhancedDashboardCard";
import { EnhancedDashboardChart } from "@/components/EnhancedDashboardChart";
import { COLORS } from "@/lib/colors";
import { Droplet, Zap, Factory, Briefcase, RefreshCw, FileText } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check if dark mode is enabled
    const darkModeEnabled = document.documentElement.classList.contains("dark");
    setIsDarkMode(darkModeEnabled);
    
    // Simulate data loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(loadingTimeout);
  }, []);

  // Updated mock data for charts with months
  const waterUsageData = [
    { name: "Nov '24", usage: 300 },
    { name: "Dec '24", usage: 340 },
    { name: "Jan '25", usage: 280 },
    { name: "Feb '25", usage: 390 },
    { name: "Mar '25", usage: 430 },
    { name: "Apr '25", usage: 410 }
  ];
  
  const electricityUsageData = [
    { name: "Nov '24", usage: 520 },
    { name: "Dec '24", usage: 470 },
    { name: "Jan '25", usage: 490 },
    { name: "Feb '25", usage: 520 },
    { name: "Mar '25", usage: 550 },
    { name: "Apr '25", usage: 580 }
  ];
  
  const stpEfficiencyData = [
    { name: "Treatment", value: 85 },
    { name: "Recycling", value: 70 },
    { name: "Reuse", value: 45 }
  ];
  
  const contractorData = [
    { name: "Active", value: 12 },
    { name: "Pending", value: 5 },
    { name: "Completed", value: 8 }
  ];

  const navigateToSystem = (path: string) => {
    navigate(path);
    toast.info(`Navigating to ${path.slice(1)} management`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#374151] dark:text-white">Dashboard Overview</h2>
            <p className="mt-1 text-sm text-[#6B7280] dark:text-gray-400">Welcome back! Here's what's happening today.</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => toast.success("Dashboard data refreshed!")}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Data</span>
            </Button>
            <Button 
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Generate Report</span>
            </Button>
          </div>
        </div>

        {/* System Summary Cards - Now using grid-dashboard class for 2x2 arrangement */}
        <div className="grid-dashboard">
          {/* Water System */}
          <EnhancedDashboardCard
            title="Water System"
            subtitle="Main Consumption"
            value={isLoading ? "Loading..." : "43,500 L"}
            icon={<Droplet />}
            iconBgColor="bg-[var(--color-primary-light)]" 
            iconTextColor="text-[var(--color-primary)]"
            trend={5.2}
            trendLabel="vs last month"
            onClick={() => navigateToSystem('/water')}
          />
          
          {/* Electricity System */}
          <EnhancedDashboardCard
            title="Electricity System"
            subtitle="Total Usage"
            value={isLoading ? "Loading..." : "528 kWh"}
            icon={<Zap />}
            iconBgColor="bg-yellow-100 dark:bg-yellow-900/50" 
            iconTextColor="text-yellow-600 dark:text-yellow-400"
            trend={2.7}
            trendLabel="vs last month"
            onClick={() => navigateToSystem('/electricity')}
          />
          
          {/* STP Plant */}
          <EnhancedDashboardCard
            title="STP Plant"
            subtitle="Overall Efficiency"
            value={isLoading ? "Loading..." : "85% Efficiency"}
            icon={<Factory />}
            iconBgColor="bg-green-100 dark:bg-green-900/50" 
            iconTextColor="text-green-600 dark:text-green-400"
            trend={-1.3}
            trendLabel="vs last month"
            onClick={() => navigateToSystem('/stp')}
          />
          
          {/* Contractor Tracker */}
          <EnhancedDashboardCard
            title="Contractor Tracker"
            subtitle="Current Projects"
            value={isLoading ? "Loading..." : "12 Active"}
            icon={<Briefcase />}
            iconBgColor="bg-purple-100 dark:bg-purple-900/50" 
            iconTextColor="text-purple-600 dark:text-purple-400"
            trend={3}
            trendLabel="new this month"
            onClick={() => navigateToSystem('/contractor')}
          />
        </div>

        {/* Charts Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#374151] dark:text-white">System Analytics</h3>
          
          <div className="grid-dashboard-2col">
            {/* Water Usage Chart */}
            <Card className="animate-fade-in hover-scale">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-white">Water Usage Trend (L)</h3>
                  <div className="text-[var(--color-primary)]">
                    <Droplet className="h-5 w-5" />
                  </div>
                </div>
                <EnhancedDashboardChart 
                  type="line" 
                  data={waterUsageData} 
                  dataKeys={["usage"]} 
                  colors={[COLORS.primary]}
                  height={250}
                  isDarkMode={isDarkMode}
                />
              </CardContent>
            </Card>
            
            {/* Electricity Usage Chart */}
            <Card className="animate-fade-in hover-scale">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-white">Electricity Usage Trend (kWh)</h3>
                  <div className="text-[var(--color-accent-yellow)]">
                    <Zap className="h-5 w-5" />
                  </div>
                </div>
                <EnhancedDashboardChart 
                  type="line" 
                  data={electricityUsageData} 
                  dataKeys={["usage"]} 
                  colors={[COLORS.accentYellow]}
                  height={250}
                  isDarkMode={isDarkMode}
                />
              </CardContent>
            </Card>
            
            {/* STP Efficiency Chart */}
            <Card className="animate-fade-in hover-scale">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-white">STP Efficiency Metrics (%)</h3>
                  <div className="text-[var(--color-accent-green)]">
                    <Factory className="h-5 w-5" />
                  </div>
                </div>
                <EnhancedDashboardChart 
                  type="bar" 
                  data={stpEfficiencyData} 
                  dataKeys={["value"]} 
                  colors={[COLORS.accentGreen]}
                  height={250}
                  isDarkMode={isDarkMode}
                />
              </CardContent>
            </Card>
            
            {/* Contractor Status Chart */}
            <Card className="animate-fade-in hover-scale">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#374151] dark:text-white">Contractor Status</h3>
                  <div className="text-purple-500">
                    <Briefcase className="h-5 w-5" />
                  </div>
                </div>
                <EnhancedDashboardChart 
                  type="pie" 
                  data={contractorData} 
                  dataKeys={["value"]} 
                  colors={["#8B5CF6", COLORS.accentYellow, COLORS.accentGreen]} 
                  height={250}
                  isDarkMode={isDarkMode}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
