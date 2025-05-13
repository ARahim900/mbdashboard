import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { EnhancedDashboardCard } from '@/components/EnhancedDashboardCard';
import { EnhancedTable } from '@/components/EnhancedTable';
import { Activity, CheckCircle, AlertTriangle, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ContractorTracker = () => {

  const mockContractorData = [
    {
      id: 1,
      name: "John Doe",
      company: "ABC Construction",
      specialty: "Plumbing",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      contact: "john.doe@abc.com",
      performance: "Good"
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "XYZ Builders",
      specialty: "Electrical",
      status: "Pending",
      startDate: "2024-02-01",
      endDate: "2024-07-31",
      contact: "jane.smith@xyz.com",
      performance: "Average"
    },
    {
      id: 3,
      name: "Robert Johnson",
      company: "RJL Contractors",
      specialty: "Carpentry",
      status: "Completed",
      startDate: "2023-11-01",
      endDate: "2024-04-30",
      contact: "robert.johnson@rjl.com",
      performance: "Excellent"
    },
    {
      id: 4,
      name: "Emily White",
      company: "EWC Services",
      specialty: "HVAC",
      status: "Active",
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      contact: "emily.white@ewc.com",
      performance: "Good"
    },
    {
      id: 5,
      name: "Michael Brown",
      company: "MBC Group",
      specialty: "Painting",
      status: "Pending",
      startDate: "2024-04-15",
      endDate: "2024-09-30",
      contact: "michael.brown@mbc.com",
      performance: "Below Average"
    },
    {
      id: 6,
      name: "Linda Green",
      company: "LGC Inc.",
      specialty: "Plumbing",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      contact: "linda.green@lgc.com",
      performance: "Good"
    },
    {
      id: 7,
      name: "David Black",
      company: "DBC Ltd.",
      specialty: "Electrical",
      status: "Pending",
      startDate: "2024-02-01",
      endDate: "2024-07-31",
      contact: "david.black@dbc.com",
      performance: "Average"
    },
    {
      id: 8,
      name: "Susan Gray",
      company: "SGC Corp.",
      specialty: "Carpentry",
      status: "Completed",
      startDate: "2023-11-01",
      endDate: "2024-04-30",
      contact: "susan.gray@sgc.com",
      performance: "Excellent"
    },
    {
      id: 9,
      name: "Kevin Blue",
      company: "KBC Enterprises",
      specialty: "HVAC",
      status: "Active",
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      contact: "kevin.blue@kbc.com",
      performance: "Good"
    },
    {
      id: 10,
      name: "Karen Red",
      company: "KRC Solutions",
      specialty: "Painting",
      status: "Pending",
      startDate: "2024-04-15",
      endDate: "2024-09-30",
      contact: "karen.red@krc.com",
      performance: "Below Average"
    }
  ];

  const contractorTableColumns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'company',
      header: 'Company',
    },
    {
      accessorKey: 'specialty',
      header: 'Specialty',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
    },
    {
      accessorKey: 'contact',
      header: 'Contact',
    },
    {
      accessorKey: 'performance',
      header: 'Performance',
      cell: ({ row }) => {
        const performance = row.getValue('performance');
        let icon = null;
        let color = "text-gray-500";

        switch (performance) {
          case "Excellent":
            icon = <CheckCircle className="w-4 h-4 text-green-500 inline-block mr-1" />;
            color = "text-green-500";
            break;
          case "Good":
            icon = <CheckCircle className="w-4 h-4 text-green-400 inline-block mr-1" />;
            color = "text-green-400";
            break;
          case "Average":
            icon = <AlertTriangle className="w-4 h-4 text-yellow-500 inline-block mr-1" />;
            color = "text-yellow-500";
            break;
          case "Below Average":
            icon = <AlertTriangle className="w-4 h-4 text-red-500 inline-block mr-1" />;
            color = "text-red-500";
            break;
          default:
            break;
        }

        return (
          <div className="flex items-center">
            {icon}
            <span className={color}>{performance}</span>
          </div>
        );
      },
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#374151] dark:text-white">Contractor Tracker</h2>
            <p className="mt-1 text-sm text-[#6B7280] dark:text-gray-400">Manage and monitor contractor performance and project timelines.</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => toast.success("Contractor data refreshed!")}
              className="flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
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

        {/* Contractor Summary Cards */}
        <div className="grid-dashboard">
          <EnhancedDashboardCard
            title="Active Projects"
            subtitle="Ongoing"
            value="12"
            icon={<Activity />}
            iconBgColor="bg-blue-100 dark:bg-blue-900/50" 
            iconTextColor="text-blue-600 dark:text-blue-400"
            trend={5}
            trendLabel="vs last month"
            onClick={() => toast.info("View active projects")}
          />
          
          <EnhancedDashboardCard
            title="Pending Approvals"
            subtitle="Awaiting Review"
            value="5"
            icon={<AlertTriangle />}
            iconBgColor="bg-yellow-100 dark:bg-yellow-900/50" 
            iconTextColor="text-yellow-600 dark:text-yellow-400"
            trend={2}
            trendLabel="new requests"
            onClick={() => toast.info("View pending approvals")}
          />
          
          <EnhancedDashboardCard
            title="Completed Projects"
            subtitle="Last Quarter"
            value="8"
            icon={<CheckCircle />}
            iconBgColor="bg-green-100 dark:bg-green-900/50" 
            iconTextColor="text-green-600 dark:text-green-400"
            trend={-3}
            trendLabel="vs previous quarter"
            onClick={() => toast.info("View completed projects")}
          />
          
          <EnhancedDashboardCard
            title="Total Contractors"
            subtitle="In Database"
            value="35"
            icon={<User />}
            iconBgColor="bg-purple-100 dark:bg-purple-900/50" 
            iconTextColor="text-purple-600 dark:text-purple-400"
            trend={1}
            trendLabel="newly added"
            onClick={() => toast.info("View all contractors")}
          />
        </div>

        {/* Contractor Table */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#374151] dark:text-white">Contractor Details</h3>
          <EnhancedTable 
            columns={contractorTableColumns} 
            data={mockContractorData} 
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContractorTracker;
