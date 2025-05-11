
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { DashboardChart } from "@/components/DashboardChart";
import { Droplet, Zap, Factory, Briefcase } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(loadingTimeout);
  }, []);

  // Mock data for charts
  const waterUsageData = [
    { name: "Jan", usage: 320 },
    { name: "Feb", usage: 300 },
    { name: "Mar", usage: 340 },
    { name: "Apr", usage: 280 },
    { name: "May", usage: 390 },
    { name: "Jun", usage: 430 },
    { name: "Jul", usage: 410 }
  ];
  
  const electricityUsageData = [
    { name: "Jan", usage: 480 },
    { name: "Feb", usage: 520 },
    { name: "Mar", usage: 470 },
    { name: "Apr", usage: 490 },
    { name: "May", usage: 520 },
    { name: "Jun", usage: 550 },
    { name: "Jul", usage: 580 }
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
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={() => toast.success("Dashboard refreshed!")}
            >
              Refresh Data
            </Button>
            <Button>Generate Report</Button>
          </div>
        </div>

        {/* System Summary Cards */}
        <div className="grid-dashboard">
          {/* Water System */}
          <DashboardCard
            title="Water System"
            value={isLoading ? undefined : "43,500 L"}
            icon={<Droplet className="h-4 w-4" />}
            iconColor="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
            trend={5.2}
            trendLabel="vs last month"
            isLoading={isLoading}
            footer={
              <Button 
                variant="ghost" 
                className="w-full justify-start text-xs"
                onClick={() => navigateToSystem('/water')}
              >
                View Details
              </Button>
            }
          />
          
          {/* Electricity System */}
          <DashboardCard
            title="Electricity System"
            value={isLoading ? undefined : "528 kWh"}
            icon={<Zap className="h-4 w-4" />}
            iconColor="bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
            trend={2.7}
            trendLabel="vs last month"
            isLoading={isLoading}
            footer={
              <Button 
                variant="ghost" 
                className="w-full justify-start text-xs"
                onClick={() => navigateToSystem('/electricity')}
              >
                View Details
              </Button>
            }
          />
          
          {/* STP Plant */}
          <DashboardCard
            title="STP Plant"
            value={isLoading ? undefined : "85% Efficiency"}
            icon={<Factory className="h-4 w-4" />}
            iconColor="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
            trend={-1.3}
            trendLabel="vs last month"
            isLoading={isLoading}
            footer={
              <Button 
                variant="ghost" 
                className="w-full justify-start text-xs"
                onClick={() => navigateToSystem('/stp')}
              >
                View Details
              </Button>
            }
          />
          
          {/* Contractor Tracker */}
          <DashboardCard
            title="Contractor Tracker"
            value={isLoading ? undefined : "12 Active"}
            icon={<Briefcase className="h-4 w-4" />}
            iconColor="bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
            trend={3}
            trendLabel="vs last month"
            isLoading={isLoading}
            footer={
              <Button 
                variant="ghost" 
                className="w-full justify-start text-xs"
                onClick={() => navigateToSystem('/contractor')}
              >
                View Details
              </Button>
            }
          />
        </div>

        {/* Detailed Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {/* Water Usage Chart */}
          <Card className="animate-fade-in hover-scale">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Water Usage Trend</h3>
                <Droplet className="h-5 w-5 text-blue-500" />
              </div>
              <DashboardChart 
                type="line" 
                data={waterUsageData} 
                dataKeys={["usage"]} 
                colors={["#60A5FA"]}
                height={200} 
              />
            </CardContent>
          </Card>
          
          {/* Electricity Usage Chart */}
          <Card className="animate-fade-in hover-scale">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Electricity Usage Trend</h3>
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <DashboardChart 
                type="line" 
                data={electricityUsageData} 
                dataKeys={["usage"]}
                colors={["#FBBF24"]}
                height={200} 
              />
            </CardContent>
          </Card>
          
          {/* STP Efficiency Chart */}
          <Card className="animate-fade-in hover-scale">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">STP Efficiency Metrics</h3>
                <Factory className="h-5 w-5 text-green-500" />
              </div>
              <DashboardChart 
                type="bar" 
                data={stpEfficiencyData} 
                dataKeys={["value"]}
                colors={["#10B981"]}
                height={200}
              />
            </CardContent>
          </Card>
          
          {/* Contractor Status Chart */}
          <Card className="animate-fade-in hover-scale">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Contractor Status</h3>
                <Briefcase className="h-5 w-5 text-purple-500" />
              </div>
              <DashboardChart 
                type="pie" 
                data={contractorData} 
                dataKeys={["value"]} 
                colors={["#8B5CF6", "#A78BFA", "#C4B5FD"]}
                height={200}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
