
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { DashboardChart } from "@/components/DashboardChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Factory } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const efficiencyData = [
  { name: "Jan", efficiency: 82 },
  { name: "Feb", efficiency: 84 },
  { name: "Mar", efficiency: 83 },
  { name: "Apr", efficiency: 80 },
  { name: "May", efficiency: 81 },
  { name: "Jun", efficiency: 83 },
  { name: "Jul", efficiency: 85 }
];

const treatmentData = [
  { name: "Primary", efficiency: 90 },
  { name: "Secondary", efficiency: 87 },
  { name: "Tertiary", efficiency: 78 }
];

const waterQualityData = [
  { name: "BOD", value: 12, max: 30 },
  { name: "COD", value: 50, max: 100 },
  { name: "TSS", value: 15, max: 30 },
  { name: "pH", value: 7.2, max: 8.5 },
  { name: "TDS", value: 450, max: 500 }
];

const StpPlant = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Factory className="h-6 w-6 text-green-500" />
          <h1 className="text-3xl font-bold">STP Plant Management</h1>
        </div>
        
        <div className="grid-dashboard">
          <DashboardCard
            title="Overall Efficiency"
            value="85%"
            icon={<Factory className="h-4 w-4" />}
            iconColor="bg-green-100 text-green-500"
            trend={-1.3}
            trendLabel="from last month"
          />
          
          <DashboardCard
            title="Flow Rate"
            value="125 m³/h"
            icon={<Factory className="h-4 w-4" />}
            iconColor="bg-blue-100 text-blue-500"
            trend={2.1}
            trendLabel="from average"
          />
          
          <DashboardCard
            title="Water Recovery"
            value="78%"
            icon={<Factory className="h-4 w-4" />}
            iconColor="bg-teal-100 text-teal-500"
            trend={3.5}
            trendLabel="from last month"
          />
          
          <DashboardCard
            title="Energy Usage"
            value="92 kWh"
            icon={<Factory className="h-4 w-4" />}
            iconColor="bg-orange-100 text-orange-500"
            trend={-2.4}
            trendLabel="from average"
          />
        </div>
        
        <Tabs defaultValue="performance">
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="treatment">Treatment Stages</TabsTrigger>
            <TabsTrigger value="quality">Output Quality</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <DashboardChart 
                    type="line" 
                    data={efficiencyData} 
                    dataKeys={["efficiency"]} 
                    colors={["#10B981"]}
                    height={350} 
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Primary Pump</span>
                        <span className="text-green-500 font-medium">Operational</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Secondary Pump</span>
                        <span className="text-green-500 font-medium">Operational</span>
                      </div>
                      <Progress value={88} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Aeration System</span>
                        <span className="text-yellow-500 font-medium">Needs Maintenance</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Chlorination System</span>
                        <span className="text-green-500 font-medium">Operational</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Filtration System</span>
                        <span className="text-green-500 font-medium">Operational</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Aeration System</p>
                        <p className="text-sm text-muted-foreground">Scheduled maintenance</p>
                      </div>
                      <span className="text-yellow-500 font-medium">In 3 days</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Pump Inspection</p>
                        <p className="text-sm text-muted-foreground">Routine check</p>
                      </div>
                      <span className="text-muted-foreground font-medium">In 2 weeks</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <p className="font-medium">Filter Replacement</p>
                        <p className="text-sm text-muted-foreground">Regular maintenance</p>
                      </div>
                      <span className="text-muted-foreground font-medium">In 3 weeks</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Full System Service</p>
                        <p className="text-sm text-muted-foreground">Annual maintenance</p>
                      </div>
                      <span className="text-muted-foreground font-medium">In 2 months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="treatment">
            <Card>
              <CardHeader>
                <CardTitle>Treatment Efficiency by Stage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <DashboardChart 
                    type="bar" 
                    data={treatmentData} 
                    dataKeys={["efficiency"]} 
                    colors={["#10B981"]}
                    height={350} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="quality">
            <Card>
              <CardHeader>
                <CardTitle>Output Water Quality Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {waterQualityData.map((param) => (
                    <div key={param.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span>{param.name}</span>
                        <span>{param.value} / {param.max}</span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                          <div
                            style={{ width: `${(param.value / param.max) * 100}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                              param.value / param.max > 0.8 ? "bg-yellow-500" : "bg-green-500"
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StpPlant;
