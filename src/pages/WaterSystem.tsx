
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { DashboardChart } from "@/components/DashboardChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplet } from "lucide-react";

const waterUsageData = [
  { name: "Jan", consumption: 320, cost: 640 },
  { name: "Feb", consumption: 300, cost: 600 },
  { name: "Mar", consumption: 340, cost: 680 },
  { name: "Apr", consumption: 280, cost: 560 },
  { name: "May", consumption: 390, cost: 780 },
  { name: "Jun", consumption: 430, cost: 860 },
  { name: "Jul", consumption: 410, cost: 820 }
];

const waterQualityData = [
  { name: "pH Level", value: 7.2 },
  { name: "TDS", value: 320 },
  { name: "Chlorine", value: 0.8 },
  { name: "Hardness", value: 150 },
  { name: "Turbidity", value: 0.5 }
];

const WaterSystem = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Droplet className="h-6 w-6 text-blue-500" />
          <h1 className="text-3xl font-bold">Water System Management</h1>
        </div>
        
        <div className="grid-dashboard">
          <DashboardCard
            title="Daily Usage"
            value="1,450 L"
            icon={<Droplet className="h-4 w-4" />}
            iconColor="bg-blue-100 text-blue-500"
            trend={2.3}
            trendLabel="from yesterday"
          />
          
          <DashboardCard
            title="Monthly Usage"
            value="43,500 L"
            icon={<Droplet className="h-4 w-4" />}
            iconColor="bg-blue-100 text-blue-500"
            trend={5.2}
            trendLabel="from last month"
          />
          
          <DashboardCard
            title="Water Quality"
            value="Excellent"
            icon={<Droplet className="h-4 w-4" />}
            iconColor="bg-green-100 text-green-500"
          />
          
          <DashboardCard
            title="Cost"
            value="$872.50"
            icon={<Droplet className="h-4 w-4" />}
            iconColor="bg-purple-100 text-purple-500"
            trend={3.7}
            trendLabel="from last month"
          />
        </div>
        
        <Tabs defaultValue="usage">
          <TabsList className="mb-4">
            <TabsTrigger value="usage">Usage Analysis</TabsTrigger>
            <TabsTrigger value="quality">Water Quality</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Water Consumption Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <DashboardChart 
                    type="line" 
                    data={waterUsageData} 
                    dataKeys={["consumption"]} 
                    colors={["#60A5FA"]}
                    height={350} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <DashboardChart 
                      type="bar" 
                      data={waterUsageData} 
                      dataKeys={["cost"]} 
                      colors={["#8B5CF6"]}
                      height={250} 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Usage vs. Cost</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <DashboardChart 
                      type="line" 
                      data={waterUsageData} 
                      dataKeys={["consumption", "cost"]} 
                      colors={["#60A5FA", "#8B5CF6"]}
                      height={250} 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="quality">
            <Card>
              <CardHeader>
                <CardTitle>Water Quality Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <DashboardChart 
                    type="bar" 
                    data={waterQualityData} 
                    dataKeys={["value"]} 
                    colors={["#10B981"]}
                    height={350} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle>Water Distribution Network</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center min-h-[400px]">
                <div className="text-center text-muted-foreground">
                  <p className="mb-2">Distribution network visualization will be available soon.</p>
                  <p>Check back later for network maps and real-time distribution data.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default WaterSystem;
