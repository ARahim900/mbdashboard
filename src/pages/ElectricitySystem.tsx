
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { DashboardChart } from "@/components/DashboardChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap } from "lucide-react";

const electricityUsageData = [
  { name: "Jan", consumption: 480, cost: 720 },
  { name: "Feb", consumption: 520, cost: 780 },
  { name: "Mar", consumption: 470, cost: 705 },
  { name: "Apr", consumption: 490, cost: 735 },
  { name: "May", consumption: 520, cost: 780 },
  { name: "Jun", consumption: 550, cost: 825 },
  { name: "Jul", consumption: 580, cost: 870 }
];

const peakUsageData = [
  { name: "00:00", usage: 210 },
  { name: "04:00", usage: 180 },
  { name: "08:00", usage: 460 },
  { name: "12:00", usage: 520 },
  { name: "16:00", usage: 570 },
  { name: "20:00", usage: 480 },
];

const sourceDistribution = [
  { name: "Grid", value: 65 },
  { name: "Solar", value: 25 },
  { name: "Generator", value: 10 }
];

const ElectricitySystem = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Zap className="h-6 w-6 text-yellow-500" />
          <h1 className="text-3xl font-bold">Electricity System Management</h1>
        </div>
        
        <div className="grid-dashboard">
          <DashboardCard
            title="Daily Usage"
            value="17.6 kWh"
            icon={<Zap className="h-4 w-4" />}
            iconColor="bg-yellow-100 text-yellow-500"
            trend={-1.2}
            trendLabel="from yesterday"
          />
          
          <DashboardCard
            title="Monthly Usage"
            value="528 kWh"
            icon={<Zap className="h-4 w-4" />}
            iconColor="bg-yellow-100 text-yellow-500"
            trend={2.7}
            trendLabel="from last month"
          />
          
          <DashboardCard
            title="Peak Demand"
            value="24.3 kW"
            icon={<Zap className="h-4 w-4" />}
            iconColor="bg-orange-100 text-orange-500"
            trend={4.5}
            trendLabel="from last peak"
          />
          
          <DashboardCard
            title="Cost"
            value="$792.00"
            icon={<Zap className="h-4 w-4" />}
            iconColor="bg-purple-100 text-purple-500"
            trend={3.9}
            trendLabel="from last month"
          />
        </div>
        
        <Tabs defaultValue="usage">
          <TabsList className="mb-4">
            <TabsTrigger value="usage">Consumption Analysis</TabsTrigger>
            <TabsTrigger value="peak">Peak Demand</TabsTrigger>
            <TabsTrigger value="sources">Power Sources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Electricity Consumption Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <DashboardChart 
                    type="line" 
                    data={electricityUsageData} 
                    dataKeys={["consumption"]} 
                    colors={["#FBBF24"]}
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
                      data={electricityUsageData} 
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
                      data={electricityUsageData} 
                      dataKeys={["consumption", "cost"]} 
                      colors={["#FBBF24", "#8B5CF6"]}
                      height={250} 
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="peak">
            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Throughout Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <DashboardChart 
                    type="line" 
                    data={peakUsageData} 
                    dataKeys={["usage"]} 
                    colors={["#F97316"]}
                    height={350} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources">
            <Card>
              <CardHeader>
                <CardTitle>Power Source Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-[300px] w-full md:w-1/2">
                  <DashboardChart 
                    type="pie" 
                    data={sourceDistribution} 
                    dataKeys={["value"]} 
                    colors={["#FBBF24", "#10B981", "#F97316"]}
                    height={300} 
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span>Grid Power</span>
                      </div>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span>Solar Power</span>
                      </div>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        <span>Generator</span>
                      </div>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ElectricitySystem;
