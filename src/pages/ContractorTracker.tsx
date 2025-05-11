
import React from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { DashboardChart } from "@/components/DashboardChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const contractorStatusData = [
  { name: "Active", value: 12 },
  { name: "Pending", value: 5 },
  { name: "Completed", value: 8 }
];

const contractorPerformance = [
  { name: "Jan", completed: 4, delayed: 1 },
  { name: "Feb", completed: 5, delayed: 2 },
  { name: "Mar", completed: 7, delayed: 0 },
  { name: "Apr", completed: 6, delayed: 1 },
  { name: "May", completed: 8, delayed: 1 },
  { name: "Jun", completed: 5, delayed: 0 },
  { name: "Jul", completed: 4, delayed: 1 }
];

const contractorList = [
  {
    id: 1,
    name: "ABC Plumbing",
    project: "Water Line Maintenance",
    status: "active",
    deadline: "2025-06-01",
    progress: 65
  },
  {
    id: 2,
    name: "ElectroTech Solutions",
    project: "Generator Servicing",
    status: "active",
    deadline: "2025-05-21",
    progress: 40
  },
  {
    id: 3,
    name: "GreenEnv Systems",
    project: "STP Filter Upgrade",
    status: "pending",
    deadline: "2025-06-15",
    progress: 0
  },
  {
    id: 4,
    name: "Metro Maintenance",
    project: "Pump Replacement",
    status: "active",
    deadline: "2025-05-18",
    progress: 80
  },
  {
    id: 5,
    name: "PowerGrid Services",
    project: "Electrical Panel Inspection",
    status: "pending",
    deadline: "2025-06-08",
    progress: 10
  }
];

const ContractorTracker = () => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "delayed":
        return <Badge variant="destructive">Delayed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-6 w-6 text-purple-500" />
          <h1 className="text-3xl font-bold">Contractor Management</h1>
        </div>
        
        <div className="grid-dashboard">
          <DashboardCard
            title="Active Contractors"
            value="12"
            icon={<Briefcase className="h-4 w-4" />}
            iconColor="bg-purple-100 text-purple-500"
            trend={3}
            trendLabel="from last month"
          />
          
          <DashboardCard
            title="Pending Approval"
            value="5"
            icon={<Clock className="h-4 w-4" />}
            iconColor="bg-amber-100 text-amber-500"
            trend={1}
            trendLabel="from last month"
          />
          
          <DashboardCard
            title="Completed Projects"
            value="8"
            icon={<CheckCircle className="h-4 w-4" />}
            iconColor="bg-green-100 text-green-500"
            trend={2}
            trendLabel="from last month"
          />
          
          <DashboardCard
            title="Delayed Projects"
            value="2"
            icon={<AlertCircle className="h-4 w-4" />}
            iconColor="bg-red-100 text-red-500"
            trend={-1}
            trendLabel="from last month"
          />
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contractors">Active Contractors</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contractor Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-[300px] w-full md:w-1/2">
                  <DashboardChart 
                    type="pie" 
                    data={contractorStatusData} 
                    dataKeys={["value"]} 
                    colors={["#8B5CF6", "#FBBF24", "#10B981"]}
                    height={300} 
                  />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span>Active Contractors</span>
                    </div>
                    <span className="text-lg font-semibold">12</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Pending Approval</span>
                    </div>
                    <span className="text-lg font-semibold">5</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Completed Projects</span>
                    </div>
                    <span className="text-lg font-semibold">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contractor Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <DashboardChart 
                    type="bar" 
                    data={contractorPerformance} 
                    dataKeys={["completed", "delayed"]} 
                    colors={["#10B981", "#EF4444"]}
                    height={250} 
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contractors">
            <Card>
              <CardHeader>
                <CardTitle>Active Contractor List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left">Contractor</th>
                        <th className="py-3 px-4 text-left">Project</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Deadline</th>
                        <th className="py-3 px-4 text-left">Progress</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractorList.map((contractor) => (
                        <tr key={contractor.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{contractor.name}</td>
                          <td className="py-3 px-4">{contractor.project}</td>
                          <td className="py-3 px-4">{getStatusBadge(contractor.status)}</td>
                          <td className="py-3 px-4">{contractor.deadline}</td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                              <div 
                                className={`h-2 rounded-full ${
                                  contractor.progress >= 80 ? "bg-green-500" : 
                                  contractor.progress >= 40 ? "bg-blue-500" : 
                                  contractor.progress > 0 ? "bg-amber-500" : "bg-gray-300"
                                }`} 
                                style={{ width: `${contractor.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-muted-foreground mt-1">{contractor.progress}%</span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" className="h-8 px-2">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Contractor Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-12">
                  <p className="mb-2">Detailed performance analytics will be available soon.</p>
                  <p>Check back later for comprehensive contractor performance data.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ContractorTracker;
