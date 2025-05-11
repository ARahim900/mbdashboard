import React from 'react';
import { useState, useMemo } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  FileText, Activity, ArrowDown, ArrowUp, RefreshCw, Download,
  Building2, CheckCircle2, AlertTriangle, XCircle, Calendar,
  DollarSign, Search, Filter, MoreVertical, Clock, Tag,
  AlertCircle, TrendingUp, Package, Zap, Settings
} from "lucide-react";

// Define the base color scheme
const BASE_COLOR = '#4E4456';
const SUCCESS_COLOR = '#10B981';
const WARNING_COLOR = '#F59E0B';
const DANGER_COLOR = '#EF4444';
const INFO_COLOR = '#3B82F6';

// Contract Status Colors
const STATUS_COLORS = {
  'Active': '#10B981',
  'Expired': '#EF4444',
  'Upcoming': '#3B82F6',
  'Terminated': '#6B7280'
};

// Contract data from the CSV
const contractData = {
  contracts: [
    { id: 1, contractor: "KONE Assarain LLC", service: "Lift Maintenance Services", status: "Active", type: "Contract", startDate: "1/1/2025", endDate: "12/31/2025", monthlyRate: "525 OMR", annualTotal: 11550, note: "" },
    { id: 2, contractor: "Oman Water Treatment Company (OWATCO)", service: "Comprehensive STP Operation and Maintenance", status: "Active", type: "Contract", startDate: "1/26/2024", endDate: "1/25/2029", monthlyRate: "3,103.8 OMR", annualTotal: 37245.4, note: "New contract due to early termination of previous Contract with Celar Company" },
    { id: 3, contractor: "Kalhat", service: "Facility Management (FM)", status: "Active", type: "Contract", startDate: "5/7/2024", endDate: "5/6/2030", monthlyRate: "32,200.8 OMR", annualTotal: 386409.718, note: "New contract overlapping with COMO" },
    { id: 4, contractor: "Future Cities S.A.O.C (Tadoom)", service: "Smart Water Meters", status: "Active", type: "Contract", startDate: "9/24/2024", endDate: "9/23/2032", monthlyRate: "2.7 Per Meter", annualTotal: 184.3, note: "New contract replacing OIFC" },
    { id: 5, contractor: "Muna Noor International LLC", service: "Pest Control Services", status: "Active", type: "Contract", startDate: "7/1/2024", endDate: "6/30/2026", monthlyRate: "1,400 /Month", annualTotal: 16000, note: "" },
    { id: 6, contractor: "Gulf Expert", service: "Chillers, BMS & Pressurisation Units", status: "Active", type: "Contract", startDate: "6/3/2024", endDate: "6/2/2025", monthlyRate: "770 OMR", annualTotal: 9240, note: "" },
    { id: 7, contractor: "Bahwan Engineering Company LLC", service: "Fire Alarm & Fire Fighting Equipment", status: "Active", type: "Contract", startDate: "11/1/2024", endDate: "10/31/2025", monthlyRate: "743.8", annualTotal: 8925, note: "" },
    { id: 8, contractor: "NMC", service: "Lagoon Main Two Drain Pipes Cleaning", status: "Active", type: "Contract", startDate: "", endDate: "", monthlyRate: "", annualTotal: 0, note: "" },
    { id: 9, contractor: "Celar Water", service: "STP Operation and Maintenance", status: "Expired", type: "Contract", startDate: "1/16/2021", endDate: "1/15/2025", monthlyRate: "4,439 /Month", annualTotal: 0, note: "" },
    { id: 10, contractor: "Advanced Technology and Projects", service: "BMS Non-Comprehensive Maintenance", status: "Expired", type: "Contract", startDate: "3/26/2023", endDate: "3/25/2024", monthlyRate: "3,800 /Year", annualTotal: 0, note: "" },
    { id: 11, contractor: "Al Naba Services LLC", service: "Garbage Removal Services", status: "Expired", type: "Contract", startDate: "4/2/2023", endDate: "4/1/2024", monthlyRate: "32 /Skip Trip", annualTotal: 0, note: "" },
    { id: 12, contractor: "Oman Pumps Manufacturing Co.", service: "Supply, Installation of Pumps", status: "Expired", type: "Contract", startDate: "2/23/2020", endDate: "7/22/2025", monthlyRate: "37,800 on Delivery", annualTotal: 0, note: "" },
    { id: 13, contractor: "Rimal Global", service: "Provision of Services", status: "Expired", type: "Contract", startDate: "11/22/2021", endDate: "11/21/2031", monthlyRate: "51,633 on Delivery", annualTotal: 0, note: "" },
    { id: 14, contractor: "COMO", service: "Facility Management (FM)", status: "Expired", type: "Contract", startDate: "3/1/2022", endDate: "2/28/2025", monthlyRate: "44,382 /Month", annualTotal: 0, note: "" },
    { id: 15, contractor: "Muscat Electronics LLC", service: "Daikin AC Chillers Maintenance", status: "Expired", type: "Contract", startDate: "3/26/2023", endDate: "4/25/2024", monthlyRate: "199.5 /Quarter", annualTotal: 0, note: "" },
    { id: 16, contractor: "Uni Gaz", service: "Gas Refilling for Flame Operation", status: "Expired", type: "Contract", startDate: "", endDate: "", monthlyRate: "", annualTotal: 0, note: "" },
    { id: 17, contractor: "Genetcoo", service: "York AC Chillers Maintenance", status: "Expired", type: "Contract", startDate: "", endDate: "", monthlyRate: "", annualTotal: 0, note: "" }
  ],
  summary: {
    totalContracts: 17,
    activeContracts: 8,
    expiredContracts: 9,
    totalAnnualValue: 469554.418,
    averageContractValue: 29346.53,
    largestContract: "Kalhat - FM",
    largestContractValue: 386409.718
  }
};

// KPI Card Component
const ContractKPICard = ({ title, value, unit, change, icon, bgColor, size, status }) => {
  const isPositive = parseFloat(change) >= 0;
  const Icon = icon;
  
  const getStatusColor = () => {
    switch(status) {
      case 'Active': return 'text-green-600';
      case 'Warning': return 'text-amber-600';
      case 'Critical': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };
  
  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${size === 'large' ? 'border-2' : 'border'} ${bgColor} hover:shadow-lg transition-shadow duration-300`}>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">{title}</span>
          <span className="p-2 rounded-full bg-white bg-opacity-20">
            <Icon className="h-5 w-5" style={{ color: STATUS_COLORS[status] || INFO_COLOR }} />
          </span>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline">
            <span className={`${size === 'large' ? 'text-3xl' : 'text-2xl'} font-bold ${getStatusColor()}`}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            <span className="ml-1 text-gray-600">{unit}</span>
          </div>
          {change && (
            <div className="flex items-center mt-1">
              {isPositive ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              <span className={isPositive ? "text-green-500" : "text-red-500"}>
                {Math.abs(parseFloat(change)).toFixed(1)}%
              </span>
              <span className="text-gray-500 text-sm ml-1">vs last quarter</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Contract Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch(status) {
      case 'Active':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle2 };
      case 'Expired':
        return { color: 'bg-red-100 text-red-800', icon: XCircle };
      case 'Upcoming':
        return { color: 'bg-blue-100 text-blue-800', icon: Calendar };
      case 'Terminated':
        return { color: 'bg-gray-100 text-gray-800', icon: AlertTriangle };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    }
  };
  
  const config = getStatusConfig();
  const Icon = config.icon;
  
  return (
    <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${config.color}`}>
      <Icon className="h-3 w-3 mr-1" />
      {status}
    </span>
  );
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between mt-1">
            <span style={{ color: entry.color }} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: entry.color }}></div>
              {entry.name}:
            </span>
            <span className="ml-2 font-medium">
              {typeof entry.value === 'number' && entry.name.includes('Value') 
                ? `OMR ${entry.value.toLocaleString()}` 
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Main Contract Tracker Dashboard Component
const MuscatBayContractTracker = () => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('contractor');
  const [activeTab, setActiveTab] = useState('overview');

  // Filter contracts based on status and search query
  const filteredContracts = useMemo(() => {
    return contractData.contracts.filter(contract => {
      const matchesStatus = selectedStatus === 'All' || contract.status === selectedStatus;
      const matchesSearch = contract.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contract.service.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [selectedStatus, searchQuery]);

  // Calculate statistics
  const statistics = useMemo(() => {
    const activeContracts = contractData.contracts.filter(c => c.status === 'Active');
    const expiredContracts = contractData.contracts.filter(c => c.status === 'Expired');
    const totalValue = activeContracts.reduce((sum, contract) => sum + (contract.annualTotal || 0), 0);
    
    return {
      totalContracts: contractData.contracts.length,
      activeContracts: activeContracts.length,
      expiredContracts: expiredContracts.length,
      totalValue: totalValue,
      averageValue: totalValue / activeContracts.length,
      expiringNext30Days: 2, // Mock data for contracts expiring in next 30 days
      expiringNext90Days: 3  // Mock data for contracts expiring in next 90 days
    };
  }, []);

  // Prepare data for charts
  const statusChartData = [
    { name: 'Active', value: statistics.activeContracts, color: STATUS_COLORS.Active },
    { name: 'Expired', value: statistics.expiredContracts, color: STATUS_COLORS.Expired }
  ];

  const contractTypeData = [
    { type: 'Facility Management', value: 2, amount: 386409.718 + 0 },
    { type: 'Maintenance Services', value: 4, amount: 11550 + 37245.4 + 9240 + 8925 },
    { type: 'Utilities', value: 2, amount: 16000 + 184.3 },
    { type: 'Others', value: 1, amount: 0 }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-[#4E4456] text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Muscat Bay Contract Tracker</h1>
          <p className="text-gray-200 mt-1">
            Comprehensive contract management and tracking system
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex space-x-1">
            {['overview', 'contracts', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-[#4E4456] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <ContractKPICard
                title="Total Contracts"
                value={statistics.totalContracts}
                unit=""
                icon={FileText}
                bgColor="border-blue-500"
                size="large"
                status="Active"
              />
              <ContractKPICard
                title="Active Contracts"
                value={statistics.activeContracts}
                unit=""
                icon={CheckCircle2}
                bgColor="border-green-500"
                size="large"
                status="Active"
              />
              <ContractKPICard
                title="Total Annual Value"
                value={`OMR ${(statistics.totalValue / 1000).toFixed(0)}k`}
                unit=""
                icon={DollarSign}
                bgColor="border-green-500"
                size="large"
              />
              <ContractKPICard
                title="Expiring Soon"
                value={statistics.expiringNext30Days}
                unit="in 30 days"
                icon={AlertTriangle}
                bgColor="border-amber-500"
                size="large"
                status="Warning"
              />
            </div>

            {/* Contract Status Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Contract Status Overview</h2>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="name"
                      >
                        {statusChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Contract Value by Type</h2>
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contractTypeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="amount" name="Annual Value (OMR)" fill={INFO_COLOR} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Updates and Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Recent Contract Updates</h2>
                <div className="space-y-3">
                  {contractData.contracts.filter(c => c.note).slice(0, 3).map((contract) => (
                    <div key={contract.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{contract.contractor}</p>
                        <p className="text-xs text-gray-600">{contract.note}</p>
                        <p className="text-xs text-gray-400 mt-1">{contract.startDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Contract Alerts</h2>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-amber-50 border-l-4 border-amber-400">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <div className="ml-3">
                      <p className="text-sm text-amber-800">Gulf Expert contract expires in 6 months</p>
                      <p className="text-xs text-amber-600">Review renewal options</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-red-50 border-l-4 border-red-400">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <div className="ml-3">
                      <p className="text-sm text-red-800">9 contracts have expired</p>
                      <p className="text-xs text-red-600">Action required</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 border-l-4 border-green-400">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div className="ml-3">
                      <p className="text-sm text-green-800">All active contracts are compliant</p>
                      <p className="text-xs text-green-600">No immediate action needed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <>
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search contracts..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="contractor">Sort by Contractor</option>
                    <option value="service">Sort by Service</option>
                    <option value="value">Sort by Value</option>
                    <option value="endDate">Sort by End Date</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contracts Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contractor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monthly Rate
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Annual Value
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredContracts.map((contract) => (
                      <tr key={contract.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {contract.contractor}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {contract.service}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={contract.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contract.startDate || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contract.endDate || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {contract.monthlyRate || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                          {contract.annualTotal > 0 ? `OMR ${contract.annualTotal.toLocaleString()}` : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <>
            {/* Contract Value Trends */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">Contract Value Analysis</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-gray-100 rounded-md flex items-center text-sm hover:bg-gray-200">
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    <span>Refresh</span>
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 rounded-md flex items-center text-sm hover:bg-gray-200">
                    <Download className="h-3.5 w-3.5 mr-1" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              <div style={{ height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contractTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="value" name="Contract Count" fill={BASE_COLOR} />
                    <Bar dataKey="amount" name="Total Value (OMR)" fill={INFO_COLOR} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Contract Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-4">
                <h3 className="text-blue-800 font-medium mb-2">Portfolio Health</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-blue-600 text-xs">Active Rate</div>
                    <div className="text-xl font-bold text-blue-900">
                      {((statistics.activeContracts / statistics.totalContracts) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-blue-600 text-xs">Value Concentration</div>
                    <div className="text-xl font-bold text-blue-900">High</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-md p-4">
                <h3 className="text-green-800 font-medium mb-2">Financial Impact</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-green-600 text-xs">Total Value</div>
                    <div className="text-xl font-bold text-green-900">
                      OMR {(statistics.totalValue / 1000).toFixed(0)}k
                    </div>
                  </div>
                  <div>
                    <div className="text-green-600 text-xs">Largest Contract</div>
                    <div className="text-xl font-bold text-green-900">82%</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-md p-4">
                <h3 className="text-purple-800 font-medium mb-2">Risk Assessment</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-purple-600 text-xs">Expiring Soon</div>
                    <div className="text-xl font-bold text-purple-900">
                      {statistics.expiringNext90Days}
                    </div>
                  </div>
                  <div>
                    <div className="text-purple-600 text-xs">Renewal Due</div>
                    <div className="text-xl font-bold text-purple-900">4</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MuscatBayContractTracker;