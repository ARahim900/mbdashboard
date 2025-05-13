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
  meterDetails: {
    Z01: [
      // Zone 01 FM - All meters with complete monthly data
      { id: "M000", name: "Irrigation Tank (Z01_FM)", meterNumber: "4300308", zone: "Zone_01_(FM)", type: "IRR_Services", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 519, "Jul-24": 877, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M001", name: "Building FM", meterNumber: "4300296", zone: "Zone_01_(FM)", type: "MB_Common", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 34, "Feb-24": 43, "Mar-24": 22, "Apr-24": 18, "May-24": 27, "Jun-24": 22, "Jul-24": 32, "Aug-24": 37, "Sep-24": 34, "Oct-24": 45, "Nov-24": 30, "Dec-24": 38, "Jan-25": 37, "Feb-25": 39, "Mar-25": 49} },
      
      { id: "M002", name: "Room PUMP (FIRE)", meterNumber: "4300309", zone: "Zone_01_(FM)", type: "MB_Common", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 25, "Dec-24": 107, "Jan-25": 78, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M003", name: "Building (MEP)", meterNumber: "4300310", zone: "Zone_01_(FM)", type: "MB_Common", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 1, "Feb-24": 1, "Mar-24": 1, "Apr-24": 2, "May-24": 4, "Jun-24": 4, "Jul-24": 6, "Aug-24": 8, "Sep-24": 3, "Oct-24": 2, "Nov-24": 3, "Dec-24": 2, "Jan-25": 2, "Feb-25": 2, "Mar-25": 1} },
      
      { id: "M004", name: "Cabinet FM (CONTRACTORS OFFICE)", meterNumber: "4300337", zone: "Zone_01_(FM)", type: "MB_Common", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 99, "Feb-24": 98, "Mar-24": 70, "Apr-24": 53, "May-24": 22, "Jun-24": 95, "Jul-24": 90, "Aug-24": 10, "Sep-24": 4, "Oct-24": 1, "Nov-24": 15, "Dec-24": 42, "Jan-25": 68, "Feb-25": 59, "Mar-25": 52} },
      
      { id: "M005", name: "Building Taxi", meterNumber: "4300298", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 11, "Feb-24": 9, "Mar-24": 10, "Apr-24": 10, "May-24": 13, "Jun-24": 10, "Jul-24": 8, "Aug-24": 13, "Sep-24": 12, "Oct-24": 17, "Nov-24": 11, "Dec-24": 13, "Jan-25": 11, "Feb-25": 16, "Mar-25": 12} },
      
      { id: "M006", name: "Building B1", meterNumber: "4300300", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 258, "Feb-24": 183, "Mar-24": 178, "Apr-24": 184, "May-24": 198, "Jun-24": 181, "Jul-24": 164, "Aug-24": 202, "Sep-24": 184, "Oct-24": 167, "Nov-24": 214, "Dec-24": 245, "Jan-25": 228, "Feb-25": 225, "Mar-25": 235} },
      
      { id: "M007", name: "Building B2", meterNumber: "4300301", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 239, "Feb-24": 194, "Mar-24": 214, "Apr-24": 205, "May-24": 167, "Jun-24": 187, "Jul-24": 177, "Aug-24": 191, "Sep-24": 206, "Oct-24": 163, "Nov-24": 194, "Dec-24": 226, "Jan-25": 236, "Feb-25": 213, "Mar-25": 202} },
      
      { id: "M008", name: "Building B3", meterNumber: "4300302", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 166, "Feb-24": 147, "Mar-24": 153, "Apr-24": 190, "May-24": 170, "Jun-24": 124, "Jul-24": 119, "Aug-24": 123, "Sep-24": 131, "Oct-24": 112, "Nov-24": 172, "Dec-24": 161, "Jan-25": 169, "Feb-25": 165, "Mar-25": 132} },
      
      { id: "M009", name: "Building B4", meterNumber: "4300303", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 8, "Feb-24": 17, "Mar-24": 21, "Apr-24": 29, "May-24": 30, "Jun-24": 5, "Jul-24": 93, "Aug-24": 130, "Sep-24": 119, "Oct-24": 92, "Nov-24": 134, "Dec-24": 138, "Jan-25": 108, "Feb-25": 108, "Mar-25": 148} },
      
      { id: "M010", name: "Building B5", meterNumber: "4300304", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 28, "Feb-24": 0, "Mar-24": 0, "Apr-24": 17, "May-24": 49, "Jun-24": 175, "Jul-24": 8, "Aug-24": 8, "Sep-24": 3, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 1, "Feb-25": 2, "Mar-25": 1} },
      
      { id: "M011", name: "Building B6", meterNumber: "4300305", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 7, "Feb-24": 9, "Mar-24": 9, "Apr-24": 11, "May-24": 16, "Jun-24": 57, "Jul-24": 131, "Aug-24": 234, "Sep-24": 226, "Oct-24": 196, "Nov-24": 195, "Dec-24": 224, "Jan-25": 254, "Feb-25": 228, "Mar-25": 268} },
      
      { id: "M012", name: "Building B7", meterNumber: "4300306", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 304, "Feb-24": 243, "Mar-24": 251, "Apr-24": 275, "May-24": 244, "Jun-24": 226, "Jul-24": 140, "Aug-24": 161, "Sep-24": 36, "Oct-24": 116, "Nov-24": 148, "Dec-24": 151, "Jan-25": 178, "Feb-25": 190, "Mar-25": 174} },
      
      { id: "M013", name: "Building B8", meterNumber: "4300307", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 557, "Feb-24": 260, "Mar-24": 253, "Apr-24": 290, "May-24": 320, "Jun-24": 275, "Jul-24": 261, "Aug-24": 196, "Sep-24": 176, "Oct-24": 178, "Nov-24": 261, "Dec-24": 276, "Jan-25": 268, "Feb-25": 250, "Mar-25": 233} },
      
      { id: "M014", name: "Building CIF/CB", meterNumber: "4300324", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 8, "Feb-24": 5, "Mar-24": 6, "Apr-24": 27, "May-24": 29, "Jun-24": 25, "Jul-24": 258, "Aug-24": 300, "Sep-24": 285, "Oct-24": 388, "Nov-24": 349, "Dec-24": 347, "Jan-25": 420, "Feb-25": 331, "Mar-25": 306} },
      
      { id: "M015", name: "Building Nursery Building", meterNumber: "4300325", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 7, "Feb-24": 6, "Mar-24": 5, "Apr-24": 5, "May-24": 6, "Jun-24": 4, "Jul-24": 5, "Aug-24": 6, "Sep-24": 6, "Oct-24": 8, "Nov-24": 5, "Dec-24": 5, "Jan-25": 4, "Feb-25": 4, "Mar-25": 4} },
      
      { id: "M016", name: "Building CIF/CB (COFFEE SH)", meterNumber: "4300339", zone: "Zone_01_(FM)", type: "Retail", parentMeter: "ZONE FM ( BULK ZONE FM )", label: "L3",
        monthlyConsumption: {"Jan-24": 19, "Feb-24": 10, "Mar-24": 1, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M017", name: "ZONE FM ( BULK ZONE FM )", meterNumber: "4300346", zone: "Zone_01_(FM)", type: "Zone Bulk", parentMeter: "Main Bulk (NAMA)", label: "L2",
        monthlyConsumption: {"Jan-24": 1595, "Feb-24": 1283, "Mar-24": 1255, "Apr-24": 1383, "May-24": 1411, "Jun-24": 2078, "Jul-24": 2601, "Aug-24": 1638, "Sep-24": 1550, "Oct-24": 2098, "Nov-24": 1808, "Dec-24": 1946, "Jan-25": 2008, "Feb-25": 1740, "Mar-25": 1880} },
    ],
    Z03A: [
      // Zone 03A - ALL meters with complete monthly data
      // Building Common Meters
      { id: "M101", name: "D 45-Building Common Meter", meterNumber: "4300135", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-45 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 3, "Mar-24": 2, "Apr-24": 1, "May-24": 1, "Jun-24": 1, "Jul-24": 1, "Aug-24": 0, "Sep-24": 1, "Oct-24": 1, "Nov-24": 1, "Dec-24": 1, "Jan-25": 0, "Feb-25": 1, "Mar-25": 1} },
      
      { id: "M102", name: "D 50-Building Common Meter", meterNumber: "4300136", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-50 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 5, "Mar-24": 1, "Apr-24": 2, "May-24": 0, "Jun-24": 1, "Jul-24": 1, "Aug-24": 1, "Sep-24": 0, "Oct-24": 2, "Nov-24": 1, "Dec-24": 0, "Jan-25": 1, "Feb-25": 1, "Mar-25": 1} },
      
      { id: "M103", name: "D 51-Building Common Meter", meterNumber: "4300137", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-51 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 4, "Feb-24": 3, "Mar-24": 2, "Apr-24": 2, "May-24": 1, "Jun-24": 3, "Jul-24": 1, "Aug-24": 1, "Sep-24": 1, "Oct-24": 1, "Nov-24": 2, "Dec-24": 1, "Jan-25": 1, "Feb-25": 0, "Mar-25": 1} },
      
      { id: "M104", name: "D 46-Building Common Meter", meterNumber: "4300138", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-46 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 5, "Mar-24": 2, "Apr-24": 1, "May-24": 51, "Jun-24": 0, "Jul-24": 1, "Aug-24": 1, "Sep-24": 0, "Oct-24": 1, "Nov-24": 0, "Dec-24": 1, "Jan-25": 1, "Feb-25": 0, "Mar-25": 1} },
      
      { id: "M105", name: "D 74-Building Common Meter", meterNumber: "4300139", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-74 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 3, "Mar-24": 2, "Apr-24": 1, "May-24": 2, "Jun-24": 0, "Jul-24": 1, "Aug-24": 1, "Sep-24": 0, "Oct-24": 2, "Nov-24": 1, "Dec-24": 1, "Jan-25": 0, "Feb-25": 1, "Mar-25": 1} },
      
      { id: "M106", name: "D 49-Building Common Meter", meterNumber: "4300140", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-49 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 4, "Mar-24": 1, "Apr-24": 2, "May-24": 1, "Jun-24": 1, "Jul-24": 1, "Aug-24": 1, "Sep-24": 0, "Oct-24": 1, "Nov-24": 1, "Dec-24": 1, "Jan-25": 0, "Feb-25": 1, "Mar-25": 2} },
      
      { id: "M107", name: "D 48-Building Common Meter", meterNumber: "4300141", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-48 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 4, "Mar-24": 1, "Apr-24": 2, "May-24": 1, "Jun-24": 1, "Jul-24": 1, "Aug-24": 0, "Sep-24": 0, "Oct-24": 1, "Nov-24": 0, "Dec-24": 1, "Jan-25": 0, "Feb-25": 1, "Mar-25": 0} },
      
      { id: "M108", name: "D 47-Building Common Meter", meterNumber: "4300143", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-47 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 4, "Feb-24": 5, "Mar-24": 2, "Apr-24": 1, "May-24": 1, "Jun-24": 1, "Jul-24": 1, "Aug-24": 1, "Sep-24": 1, "Oct-24": 1, "Nov-24": 1, "Dec-24": 1, "Jan-25": 1, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M109", name: "D 44-Building Common Meter", meterNumber: "4300144", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-44 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 4, "Mar-24": 2, "Apr-24": 1, "May-24": 1, "Jun-24": 1, "Jul-24": 1, "Aug-24": 1, "Sep-24": 0, "Oct-24": 2, "Nov-24": 1, "Dec-24": 1, "Jan-25": 1, "Feb-25": 1, "Mar-25": 0} },
      
      { id: "M110", name: "D 75-Building Common Meter", meterNumber: "4300145", zone: "Zone_03_(A)", type: "D_Building_Common", parentMeter: "D-75 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 4, "Feb-24": 5, "Mar-24": 2, "Apr-24": 2, "May-24": 2, "Jun-24": 1, "Jul-24": 2, "Aug-24": 2, "Sep-24": 2, "Oct-24": 7, "Nov-24": 6, "Dec-24": 2, "Jan-25": 3, "Feb-25": 4, "Mar-25": 3} },
      
      // All Residential (Apart) meters
      { id: "M111", name: "Z3-46(5)", meterNumber: "4300003", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-46 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 5, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M112", name: "Z3-49(3)", meterNumber: "4300004", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-49 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 1, "Feb-24": 1, "Mar-24": 22, "Apr-24": 30, "May-24": 18, "Jun-24": 6, "Jul-24": 7, "Aug-24": 11, "Sep-24": 7, "Oct-24": 10, "Nov-24": 9, "Dec-24": 5, "Jan-25": 10, "Feb-25": 15, "Mar-25": 11} },
      
      { id: "M113", name: "Z3-75(4)", meterNumber: "4300006", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-75 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 14, "Mar-24": 3, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 7, "Dec-24": 6, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M114", name: "Z3-46(3A)", meterNumber: "4300007", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-46 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 13, "Feb-24": 7, "Mar-24": 6, "Apr-24": 25, "May-24": 27, "Jun-24": 30, "Jul-24": 35, "Aug-24": 41, "Sep-24": 29, "Oct-24": 44, "Nov-24": 32, "Dec-24": 43, "Jan-25": 38, "Feb-25": 35, "Mar-25": 15} },
      
      { id: "M115", name: "Z3-049(4)", meterNumber: "4300010", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-49 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 11, "Feb-24": 1, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 4, "Jan-25": 8, "Feb-25": 1, "Mar-25": 8} },
      
      { id: "M116", name: "Z3-46(1A)", meterNumber: "4300011", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-46 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 9, "Feb-24": 10, "Mar-24": 10, "Apr-24": 11, "May-24": 10, "Jun-24": 10, "Jul-24": 11, "Aug-24": 11, "Sep-24": 12, "Oct-24": 17, "Nov-24": 11, "Dec-24": 13, "Jan-25": 11, "Feb-25": 10, "Mar-25": 10} },
      
      { id: "M117", name: "Z3-47(2)", meterNumber: "4300012", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-47 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 2, "Aug-24": 2, "Sep-24": 3, "Oct-24": 1, "Nov-24": 3, "Dec-24": 1, "Jan-25": 1, "Feb-25": 1, "Mar-25": 1} },
      
      { id: "M118", name: "Z3-45(3A)", meterNumber: "4300013", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-45 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 5, "Feb-24": 8, "Mar-24": 0, "Apr-24": 2, "May-24": 0, "Jun-24": 2, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 1, "Nov-24": 0, "Dec-24": 2, "Jan-25": 8, "Feb-25": 4, "Mar-25": 0} },
      
      { id: "M119", name: "Z3-46(2A)", meterNumber: "4300014", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-46 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M120", name: "Z3-46(6)", meterNumber: "4300015", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-46 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 2, "Mar-24": 1, "Apr-24": 1, "May-24": 3, "Jun-24": 3, "Jul-24": 2, "Aug-24": 2, "Sep-24": 2, "Oct-24": 2, "Nov-24": 1, "Dec-24": 2, "Jan-25": 3, "Feb-25": 1, "Mar-25": 1} },
      
      { id: "M121", name: "Z3-47(4)", meterNumber: "4300016", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-47 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 15, "Feb-24": 15, "Mar-24": 26, "Apr-24": 15, "May-24": 22, "Jun-24": 14, "Jul-24": 23, "Aug-24": 6, "Sep-24": 16, "Oct-24": 16, "Nov-24": 8, "Dec-24": 13, "Jan-25": 11, "Feb-25": 12, "Mar-25": 0} },
      
      { id: "M122", name: "Z3-45(5)", meterNumber: "4300017", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-45 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 4, "Feb-24": 3, "Mar-24": 2, "Apr-24": 10, "May-24": 6, "Jun-24": 8, "Jul-24": 9, "Aug-24": 3, "Sep-24": 7, "Oct-24": 22, "Nov-24": 15, "Dec-24": 10, "Jan-25": 5, "Feb-25": 3, "Mar-25": 2} },
      
      { id: "M123", name: "Z3-47(5)", meterNumber: "4300018", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-47 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 8, "Feb-24": 56, "Mar-24": 13, "Apr-24": 7, "May-24": 2, "Jun-24": 0, "Jul-24": 1, "Aug-24": 15, "Sep-24": 0, "Oct-24": 13, "Nov-24": 5, "Dec-24": 9, "Jan-25": 36, "Feb-25": 12, "Mar-25": 11} },
      
      { id: "M124", name: "Z3-45(6)", meterNumber: "4300019", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-45 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 3, "Mar-24": 4, "Apr-24": 20, "May-24": 3, "Jun-24": 8, "Jul-24": 6, "Aug-24": 4, "Sep-24": 5, "Oct-24": 6, "Nov-24": 7, "Dec-24": 4, "Jan-25": 5, "Feb-25": 18, "Mar-25": 32} },
      
      { id: "M125", name: "Z3-50(4)", meterNumber: "4300021", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-50 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 15, "Feb-24": 4, "Mar-24": 7, "Apr-24": 6, "May-24": 11, "Jun-24": 5, "Jul-24": 6, "Aug-24": 9, "Sep-24": 6, "Oct-24": 9, "Nov-24": 8, "Dec-24": 9, "Jan-25": 6, "Feb-25": 4, "Mar-25": 6} },
      
      { id: "M126", name: "Z3-74(3)", meterNumber: "4300022", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-74 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 21, "Feb-24": 54, "Mar-24": 16, "Apr-24": 6, "May-24": 22, "Jun-24": 5, "Jul-24": 6, "Aug-24": 12, "Sep-24": 13, "Oct-24": 24, "Nov-24": 19, "Dec-24": 12, "Jan-25": 12, "Feb-25": 19, "Mar-25": 19} },
      
      { id: "M127", name: "Z3-45(4A)", meterNumber: "4300026", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-45 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 1, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M128", name: "Z3-50(5)", meterNumber: "4300027", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-50 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 2, "Feb-24": 0, "Mar-24": 0, "Apr-24": 1, "May-24": 0, "Jun-24": 1, "Jul-24": 23, "Aug-24": 10, "Sep-24": 9, "Oct-24": 8, "Nov-24": 12, "Dec-24": 8, "Jan-25": 9, "Feb-25": 10, "Mar-25": 22} },
      
      { id: "M129", name: "Z3-50(6)", meterNumber: "4300028", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-50 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 6, "Feb-24": 14, "Mar-24": 16, "Apr-24": 15, "May-24": 16, "Jun-24": 20, "Jul-24": 1, "Aug-24": 12, "Sep-24": 17, "Oct-24": 25, "Nov-24": 21, "Dec-24": 23, "Jan-25": 21, "Feb-25": 20, "Mar-25": 18} },
      
      { id: "M130", name: "Z3-44(1A)", meterNumber: "4300030", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-44 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 20, "Apr-24": 25, "May-24": 23, "Jun-24": 7, "Jul-24": 0, "Aug-24": 0, "Sep-24": 2, "Oct-24": 9, "Nov-24": 8, "Dec-24": 5, "Jan-25": 11, "Feb-25": 11, "Mar-25": 10} },
      
      { id: "M131", name: "Z3-44(1B)", meterNumber: "4300031", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-44 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M132", name: "Z3-44(2A)", meterNumber: "4300032", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-44 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 4, "Feb-24": 2, "Mar-24": 15, "Apr-24": 20, "May-24": 21, "Jun-24": 1, "Jul-24": 5, "Aug-24": 2, "Sep-24": 3, "Oct-24": 7, "Nov-24": 7, "Dec-24": 2, "Jan-25": 9, "Feb-25": 3, "Mar-25": 5} },
      
      { id: "M133", name: "Z3-44(2B)", meterNumber: "4300033", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-44 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 7, "Feb-24": 3, "Mar-24": 8, "Apr-24": 3, "May-24": 4, "Jun-24": 2, "Jul-24": 2, "Aug-24": 4, "Sep-24": 5, "Oct-24": 9, "Nov-24": 5, "Dec-24": 8, "Jan-25": 7, "Feb-25": 7, "Mar-25": 7} },
      
      { id: "M134", name: "Z3-44(5)", meterNumber: "4300034", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-44 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 148, "Feb-24": 135, "Mar-24": 126, "Apr-24": 99, "May-24": 15, "Jun-24": 25, "Jul-24": 61, "Aug-24": 132, "Sep-24": 115, "Oct-24": 249, "Nov-24": 208, "Dec-24": 135, "Jan-25": 118, "Feb-25": 139, "Mar-25": 38} },
      
      { id: "M135", name: "Z3-44(6)", meterNumber: "4300035", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-44 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 36, "Feb-24": 20, "Mar-24": 19, "Apr-24": 16, "May-24": 13, "Jun-24": 9, "Jul-24": 7, "Aug-24": 9, "Sep-24": 17, "Oct-24": 39, "Nov-24": 33, "Dec-24": 33, "Jan-25": 34, "Feb-25": 37, "Mar-25": 31} },
      
      { id: "M136", name: "Z3-75(1)", meterNumber: "4300036", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-75 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 6, "Jan-25": 1, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M137", name: "Z3-75(3)", meterNumber: "4300037", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-75 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 4, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 2, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 3, "Nov-24": 1, "Dec-24": 4, "Jan-25": 2, "Feb-25": 7, "Mar-25": 0} },
      
      { id: "M138", name: "Z3-47(3)", meterNumber: "4300039", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-47 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 14, "Feb-24": 15, "Mar-24": 14, "Apr-24": 14, "May-24": 19, "Jun-24": 14, "Jul-24": 16, "Aug-24": 19, "Sep-24": 13, "Oct-24": 21, "Nov-24": 17, "Dec-24": 18, "Jan-25": 18, "Feb-25": 19, "Mar-25": 17} },
      
      { id: "M139", name: "Z3-48(3)", meterNumber: "4300040", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-48 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 8, "Feb-24": 8, "Mar-24": 7, "Apr-24": 8, "May-24": 7, "Jun-24": 3, "Jul-24": 4, "Aug-24": 8, "Sep-24": 7, "Oct-24": 10, "Nov-24": 10, "Dec-24": 3, "Jan-25": 3, "Feb-25": 5, "Mar-25": 4} },
      
      { id: "M140", name: "Z3-48(6)", meterNumber: "4300041", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-48 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 1, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 3, "Jul-24": 5, "Aug-24": 10, "Sep-24": 0, "Oct-24": 10, "Nov-24": 1, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M141", name: "Z3-46(4A)", meterNumber: "4300043", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-46 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 1, "Feb-24": 1, "Mar-24": 1, "Apr-24": 1, "May-24": 1, "Jun-24": 1, "Jul-24": 0, "Aug-24": 0, "Sep-24": 1, "Oct-24": 3, "Nov-24": 1, "Dec-24": 0, "Jan-25": 4, "Feb-25": 1, "Mar-25": 0} },
      
      { id: "M142", name: "Z3-74(5)", meterNumber: "4300045", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-74 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 10, "Feb-24": 2, "Mar-24": 5, "Apr-24": 5, "May-24": 7, "Jun-24": 6, "Jul-24": 5, "Aug-24": 7, "Sep-24": 5, "Oct-24": 4, "Nov-24": 5, "Dec-24": 7, "Jan-25": 13, "Feb-25": 7, "Mar-25": 12} },
      
      { id: "M143", name: "Z3-74(6)", meterNumber: "4300046", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-74 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 32, "Feb-24": 12, "Mar-24": 6, "Apr-24": 13, "May-24": 9, "Jun-24": 2, "Jul-24": 3, "Aug-24": 0, "Sep-24": 2, "Oct-24": 12, "Nov-24": 6, "Dec-24": 6, "Jan-25": 12, "Feb-25": 4, "Mar-25": 4} },
      
      { id: "M144", name: "Z3-50(3)", meterNumber: "4300047", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-50 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 2, "Feb-24": 8, "Mar-24": 7, "Apr-24": 6, "May-24": 3, "Jun-24": 4, "Jul-24": 4, "Aug-24": 5, "Sep-24": 5, "Oct-24": 9, "Nov-24": 9, "Dec-24": 7, "Jan-25": 8, "Feb-25": 13, "Mar-25": 6} },
      
      { id: "M145", name: "Z3-48(5)", meterNumber: "4300048", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-48 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 2, "Aug-24": 4, "Sep-24": 2, "Oct-24": 4, "Nov-24": 33, "Dec-24": 16, "Jan-25": 2, "Feb-25": 1, "Mar-25": 1} },
      
      { id: "M146", name: "Z3-47(6)", meterNumber: "4300051", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-47 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 18, "Feb-24": 19, "Mar-24": 27, "Apr-24": 15, "May-24": 10, "Jun-24": 12, "Jul-24": 6, "Aug-24": 6, "Sep-24": 16, "Oct-24": 13, "Nov-24": 23, "Dec-24": 27, "Jan-25": 29, "Feb-25": 14, "Mar-25": 16} },
      
      { id: "M147", name: "Z3-49(5)", meterNumber: "4300053", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-49 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 6, "Mar-24": 1, "Apr-24": 1, "May-24": 2, "Jun-24": 0, "Jul-24": 0, "Aug-24": 2, "Sep-24": 1, "Oct-24": 10, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 5, "Mar-25": 0} },
      
      { id: "M148", name: "Z3-75(5)", meterNumber: "4300055", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-75 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 11, "Apr-24": 8, "May-24": 9, "Jun-24": 11, "Jul-24": 8, "Aug-24": 10, "Sep-24": 12, "Oct-24": 27, "Nov-24": 22, "Dec-24": 14, "Jan-25": 16, "Feb-25": 12, "Mar-25": 12} },
      
      { id: "M149", name: "Z3-49(6)", meterNumber: "4300061", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-49 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 34, "Feb-24": 26, "Mar-24": 16, "Apr-24": 15, "May-24": 16, "Jun-24": 34, "Jul-24": 16, "Aug-24": 4, "Sep-24": 10, "Oct-24": 36, "Nov-24": 25, "Dec-24": 26, "Jan-25": 25, "Feb-25": 22, "Mar-25": 21} },
      
      { id: "M150", name: "Z3-75(6)", meterNumber: "4300063", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-75 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 52, "Feb-24": 39, "Mar-24": 21, "Apr-24": 17, "May-24": 24, "Jun-24": 24, "Jul-24": 20, "Aug-24": 24, "Sep-24": 19, "Oct-24": 24, "Nov-24": 40, "Dec-24": 34, "Jan-25": 35, "Feb-25": 32, "Mar-25": 35} },
      
      { id: "M151", name: "Z3-74(1)", meterNumber: "4300106", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-74 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 7, "Feb-24": 7, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 9, "Nov-24": 6, "Dec-24": 1, "Jan-25": 1, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M152", name: "Z3-49(1)", meterNumber: "4300107", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-49 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 4, "Mar-25": 3} },
      
      { id: "M153", name: "Z3-49(2)", meterNumber: "4300108", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-49 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 11, "Feb-24": 15, "Mar-24": 7, "Apr-24": 6, "May-24": 9, "Jun-24": 11, "Jul-24": 11, "Aug-24": 14, "Sep-24": 12, "Oct-24": 11, "Nov-24": 11, "Dec-24": 12, "Jan-25": 15, "Feb-25": 15, "Mar-25": 12} },
      
      { id: "M154", name: "Z3-50(1)", meterNumber: "4300109", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-50 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 32, "Feb-24": 32, "Mar-24": 36, "Apr-24": 26, "May-24": 35, "Jun-24": 45, "Jul-24": 1, "Aug-24": 43, "Sep-24": 24, "Oct-24": 53, "Nov-24": 32, "Dec-24": 34, "Jan-25": 22, "Feb-25": 26, "Mar-25": 28} },
      
      { id: "M155", name: "Z3-45(1A)", meterNumber: "4300110", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-45 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 8, "Feb-24": 0, "Mar-24": 1, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 1, "Sep-24": 0, "Oct-24": 1, "Nov-24": 1, "Dec-24": 1, "Jan-25": 0, "Feb-25": 1, "Mar-25": 0} },
      
      { id: "M156", name: "Z3-51(1)", meterNumber: "4300111", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-51 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 12, "Feb-24": 13, "Mar-24": 13, "Apr-24": 11, "May-24": 18, "Jun-24": 29, "Jul-24": 1, "Aug-24": 0, "Sep-24": 0, "Oct-24": 1, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M157", name: "Z3-51(2)", meterNumber: "4300112", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-51 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 17, "Feb-24": 21, "Mar-24": 20, "Apr-24": 17, "May-24": 17, "Jun-24": 19, "Jul-24": 19, "Aug-24": 24, "Sep-24": 24, "Oct-24": 39, "Nov-24": 29, "Dec-24": 29, "Jan-25": 32, "Feb-25": 28, "Mar-25": 31} },
      
      { id: "M158", name: "Z3-45(2A)", meterNumber: "4300113", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-45 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 8, "Mar-24": 2, "Apr-24": 6, "May-24": 5, "Jun-24": 0, "Jul-24": 1, "Aug-24": 0, "Sep-24": 0, "Oct-24": 5, "Nov-24": 9, "Dec-24": 2, "Jan-25": 2, "Feb-25": 7, "Mar-25": 9} },
      
      { id: "M159", name: "Z3-050(2)", meterNumber: "4300114", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-50 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 2, "Feb-24": 3, "Mar-24": 4, "Apr-24": 5, "May-24": 2, "Jun-24": 1, "Jul-24": 0, "Aug-24": 3, "Sep-24": 0, "Oct-24": 0, "Nov-24": 2, "Dec-24": 1, "Jan-25": 0, "Feb-25": 8, "Mar-25": 0} },
      
      { id: "M160", name: "Z3-47(1)", meterNumber: "4300115", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-47 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 5, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 1, "Sep-24": 15, "Oct-24": 13, "Nov-24": 17, "Dec-24": 9, "Jan-25": 9, "Feb-25": 11, "Mar-25": 10} },
      
      { id: "M161", name: "Z3-48(1)", meterNumber: "4300117", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-48 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 2, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 1, "Aug-24": 0, "Sep-24": 0, "Oct-24": 1, "Nov-24": 28, "Dec-24": 8, "Jan-25": 3, "Feb-25": 5, "Mar-25": 4} },
      
      { id: "M162", name: "Z3-74(2)", meterNumber: "4300118", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-74 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 6, "Jun-24": 18, "Jul-24": 11, "Aug-24": 0, "Sep-24": 0, "Oct-24": 1, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M163", name: "Z3-51(3)", meterNumber: "4300121", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-51 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 7, "Feb-24": 5, "Mar-24": 6, "Apr-24": 20, "May-24": 24, "Jun-24": 4, "Jul-24": 6, "Aug-24": 8, "Sep-24": 9, "Oct-24": 11, "Nov-24": 14, "Dec-24": 12, "Jan-25": 13, "Feb-25": 10, "Mar-25": 9} },
      
      { id: "M164", name: "Z3-75(2)", meterNumber: "4300122", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-75 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 2, "Mar-24": 2, "Apr-24": 1, "May-24": 2, "Jun-24": 5, "Jul-24": 19, "Aug-24": 7, "Sep-24": 0, "Oct-24": 0, "Nov-24": 12, "Dec-24": 5, "Jan-25": 7, "Feb-25": 7, "Mar-25": 9} },
      
      { id: "M165", name: "Z3-48(2)", meterNumber: "4300123", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-48 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 2, "Mar-24": 2, "Apr-24": 3, "May-24": 5, "Jun-24": 2, "Jul-24": 8, "Aug-24": 3, "Sep-24": 4, "Oct-24": 11, "Nov-24": 2, "Dec-24": 5, "Jan-25": 3, "Feb-25": 0, "Mar-25": 4} },
      
      { id: "M166", name: "Z3-74(4)", meterNumber: "4300125", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-74 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 7, "Feb-24": 17, "Mar-24": 23, "Apr-24": 27, "May-24": 33, "Jun-24": 29, "Jul-24": 28, "Aug-24": 24, "Sep-24": 3, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 2, "Mar-25": 0} },
      
      { id: "M167", name: "Z3-51(4)", meterNumber: "4300127", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-51 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 20, "Feb-24": 15, "Mar-24": 13, "Apr-24": 12, "May-24": 9, "Jun-24": 12, "Jul-24": 11, "Aug-24": 11, "Sep-24": 9, "Oct-24": 15, "Nov-24": 9, "Dec-24": 9, "Jan-25": 11, "Feb-25": 9, "Mar-25": 12} },
      
      { id: "M168", name: "Z3-051(5)", meterNumber: "4300128", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-51 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 0, "Mar-24": 61, "Apr-24": 0, "May-24": 2, "Jun-24": 4, "Jul-24": 5, "Aug-24": 8, "Sep-24": 0, "Oct-24": 0, "Nov-24": 1, "Dec-24": 1, "Jan-25": 2, "Feb-25": 5, "Mar-25": 19} },
      
      { id: "M169", name: "Z3-48(4)", meterNumber: "4300131", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-48 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 13, "Feb-24": 17, "Mar-24": 14, "Apr-24": 16, "May-24": 2, "Jun-24": 2, "Jul-24": 7, "Aug-24": 0, "Sep-24": 0, "Oct-24": 3, "Nov-24": 4, "Dec-24": 3, "Jan-25": 5, "Feb-25": 5, "Mar-25": 5} },
      
      { id: "M170", name: "Z3-51(6)", meterNumber: "4300134", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-51 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 6, "Feb-24": 0, "Mar-24": 0, "Apr-24": 9, "May-24": 3, "Jun-24": 4, "Jul-24": 10, "Aug-24": 4, "Sep-24": 3, "Oct-24": 9, "Nov-24": 9, "Dec-24": 18, "Jan-25": 8, "Feb-25": 2, "Mar-25": 5} },
      
      // Exclude this one as per instructions
      // { id: "M171", name: "Z3-74(3) (Building)", meterNumber: "4300322", zone: "Zone_03_(A)", type: "Residential (Apart)", parentMeter: "D-74 Building Bulk Meter", label: "L3",
      //   monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      // All Residential (Villa) meters
      { id: "M172", name: "Z3-42 (Villa)", meterNumber: "4300002", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 61, "Feb-24": 33, "Mar-24": 36, "Apr-24": 47, "May-24": 39, "Jun-24": 42, "Jul-24": 25, "Aug-24": 20, "Sep-24": 44, "Oct-24": 57, "Nov-24": 51, "Dec-24": 75, "Jan-25": 32, "Feb-25": 46, "Mar-25": 19} },
      
      { id: "M173", name: "Z3-38 (Villa)", meterNumber: "4300005", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 3, "Jul-24": 0, "Aug-24": 4, "Sep-24": 30, "Oct-24": 2, "Nov-24": 12, "Dec-24": 11, "Jan-25": 10, "Feb-25": 7, "Mar-25": 7} },
      
      { id: "M174", name: "Z3-23 (Villa)", meterNumber: "4300038", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 29, "Feb-24": 16, "Mar-24": 18, "Apr-24": 18, "May-24": 15, "Jun-24": 32, "Jul-24": 24, "Aug-24": 28, "Sep-24": 25, "Oct-24": 37, "Nov-24": 2, "Dec-24": 2, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M175", name: "Z3-41 (Villa)", meterNumber: "4300044", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 50, "Feb-24": 38, "Mar-24": 26, "Apr-24": 20, "May-24": 90, "Jun-24": 66, "Jul-24": 128, "Aug-24": 192, "Sep-24": 58, "Oct-24": 53, "Nov-24": 44, "Dec-24": 22, "Jan-25": 13, "Feb-25": 18, "Mar-25": 34} },
      
      { id: "M176", name: "Z3-37 (Villa)", meterNumber: "4300049", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 1, "Feb-24": 2, "Mar-24": 0, "Apr-24": 1, "May-24": 0, "Jun-24": 0, "Jul-24": 5, "Aug-24": 13, "Sep-24": 0, "Oct-24": 1, "Nov-24": 1, "Dec-24": 3, "Jan-25": 26, "Feb-25": 15, "Mar-25": 18} },
      
      { id: "M177", name: "Z3-43 (Villa)", meterNumber: "4300050", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 79, "Feb-24": 67, "Mar-24": 50, "Apr-24": 62, "May-24": 72, "Jun-24": 75, "Jul-24": 49, "Aug-24": 83, "Sep-24": 76, "Oct-24": 91, "Nov-24": 77, "Dec-24": 70, "Jan-25": 70, "Feb-25": 68, "Mar-25": 46} },
      
      { id: "M178", name: "Z3-31 (Villa)", meterNumber: "4300052", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 115, "Feb-24": 105, "Mar-24": 86, "Apr-24": 81, "May-24": 140, "Jun-24": 135, "Jul-24": 151, "Aug-24": 258, "Sep-24": 222, "Oct-24": 37, "Nov-24": 164, "Dec-24": 176, "Jan-25": 165, "Feb-25": 133, "Mar-25": 30} },
      
      { id: "M179", name: "Z3-35 (Villa)", meterNumber: "4300075", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 82, "Feb-24": 78, "Mar-24": 77, "Apr-24": 67, "May-24": 91, "Jun-24": 54, "Jul-24": 58, "Aug-24": 70, "Sep-24": 78, "Oct-24": 92, "Nov-24": 83, "Dec-24": 69, "Jan-25": 65, "Feb-25": 61, "Mar-25": 52} },
      
      { id: "M180", name: "Z3-40 (Villa)", meterNumber: "4300079", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 26, "Feb-24": 18, "Mar-24": 25, "Apr-24": 19, "May-24": 26, "Jun-24": 19, "Jul-24": 12, "Aug-24": 10, "Sep-24": 12, "Oct-24": 36, "Nov-24": 20, "Dec-24": 20, "Jan-25": 18, "Feb-25": 23, "Mar-25": 37} },
      
      { id: "M181", name: "Z3-30 (Villa)", meterNumber: "4300081", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 16, "Feb-24": 14, "Mar-24": 19, "Apr-24": 26, "May-24": 9, "Jun-24": 8, "Jul-24": 8, "Aug-24": 0, "Sep-24": 0, "Oct-24": 1, "Nov-24": 1, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 4} },
      
      { id: "M182", name: "Z3-33 (Villa)", meterNumber: "4300082", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 78, "Feb-24": 32, "Mar-24": 43, "Apr-24": 36, "May-24": 52, "Jun-24": 68, "Jul-24": 60, "Aug-24": 60, "Sep-24": 47, "Oct-24": 76, "Nov-24": 52, "Dec-24": 45, "Jan-25": 45, "Feb-25": 45, "Mar-25": 40} },
      
      { id: "M183", name: "Z3-36 (Villa)", meterNumber: "4300084", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 13, "Feb-24": 11, "Mar-24": 22, "Apr-24": 44, "May-24": 85, "Jun-24": 68, "Jul-24": 61, "Aug-24": 58, "Sep-24": 72, "Oct-24": 102, "Nov-24": 115, "Dec-24": 93, "Jan-25": 81, "Feb-25": 83, "Mar-25": 69} },
      
      { id: "M184", name: "Z3-32 (Villa)", meterNumber: "4300085", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 19, "Feb-24": 25, "Mar-24": 32, "Apr-24": 29, "May-24": 13, "Jun-24": 0, "Jul-24": 30, "Aug-24": 31, "Sep-24": 38, "Oct-24": 57, "Nov-24": 44, "Dec-24": 30, "Jan-25": 38, "Feb-25": 39, "Mar-25": 33} },
      
      { id: "M185", name: "Z3-39 (Villa)", meterNumber: "4300086", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 67, "Feb-24": 33, "Mar-24": 35, "Apr-24": 40, "May-24": 27, "Jun-24": 51, "Jul-24": 24, "Aug-24": 38, "Sep-24": 35, "Oct-24": 47, "Nov-24": 34, "Dec-24": 37, "Jan-25": 39, "Feb-25": 36, "Mar-25": 29} },
      
      { id: "M186", name: "Z3-34 (Villa)", meterNumber: "4300087", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 1, "Feb-24": 12, "Mar-24": 9, "Apr-24": 30, "May-24": 14, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 31, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M187", name: "Z3-27 (Villa)", meterNumber: "4300089", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 8, "Jun-24": 0, "Jul-24": 5, "Aug-24": 0, "Sep-24": 4, "Oct-24": 0, "Nov-24": 8, "Dec-24": 59, "Jan-25": 15, "Feb-25": 32, "Mar-25": 55} },
      
      { id: "M188", name: "Z3-24 (Villa)", meterNumber: "4300091", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 10, "Feb-24": 8, "Mar-24": 10, "Apr-24": 7, "May-24": 15, "Jun-24": 7, "Jul-24": 6, "Aug-24": 7, "Sep-24": 4, "Oct-24": 5, "Nov-24": 4, "Dec-24": 15, "Jan-25": 18, "Feb-25": 39, "Mar-25": 78} },
      
      { id: "M189", name: "Z3-25 (Villa)", meterNumber: "4300093", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 15, "Feb-24": 12, "Mar-24": 9, "Apr-24": 9, "May-24": 25, "Jun-24": 11, "Jul-24": 15, "Aug-24": 6, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 3, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M190", name: "Z3-26 (Villa)", meterNumber: "4300095", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 10, "Feb-24": 69, "Mar-24": 13, "Apr-24": 21, "May-24": 17, "Jun-24": 18, "Jul-24": 13, "Aug-24": 4, "Sep-24": 4, "Oct-24": 3, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M191", name: "Z3-29 (Villa)", meterNumber: "4300097", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 12, "Feb-24": 5, "Mar-24": 9, "Apr-24": 12, "May-24": 9, "Jun-24": 9, "Jul-24": 7, "Aug-24": 1, "Sep-24": 0, "Oct-24": 2, "Nov-24": 0, "Dec-24": 1, "Jan-25": 0, "Feb-25": 7, "Mar-25": 3} },
      
      { id: "M192", name: "Z3-28 (Villa)", meterNumber: "4300101", zone: "Zone_03_(A)", type: "Residential (Villa)", parentMeter: "ZONE 3A (BULK ZONE 3A)", label: "L3",
        monthlyConsumption: {"Jan-24": 32, "Feb-24": 2, "Mar-24": 3, "Apr-24": 21, "May-24": 45, "Jun-24": 44, "Jul-24": 45, "Aug-24": 46, "Sep-24": 46, "Oct-24": 59, "Nov-24": 36, "Dec-24": 41, "Jan-25": 44, "Feb-25": 38, "Mar-25": 30} },
      
      // Zone bulk meter
      { id: "M193", name: "ZONE 3A (BULK ZONE 3A)", meterNumber: "4300343", zone: "Zone_03_(A)", type: "Zone Bulk", parentMeter: "Main Bulk (NAMA)", label: "L2",
        monthlyConsumption: {"Jan-24": 1234, "Feb-24": 1099, "Mar-24": 1297, "Apr-24": 1892, "May-24": 2254, "Jun-24": 2227, "Jul-24": 3313, "Aug-24": 3172, "Sep-24": 2698, "Oct-24": 3715, "Nov-24": 3501, "Dec-24": 3796, "Jan-25": 4235, "Feb-25": 4273, "Mar-25": 3591} },
    ],
    Z03B: [
      // Zone 03B - ALL meters with complete monthly data
      // Building Common Meters
      { id: "M201", name: "D 52-Building Common", meterNumber: "4300126", zone: "Zone_03_(B)", type: "D_Building_Common", parentMeter: "D-52 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 4, "Feb-24": 3, "Mar-24": 2, "Apr-24": 2, "May-24": 0, "Jun-24": 1, "Jul-24": 1, "Aug-24": 1, "Sep-24": 1, "Oct-24": 2, "Nov-24": 1, "Dec-24": 1, "Jan-25": 1, "Feb-25": 1, "Mar-25": 2} },
      
      { id: "M202", name: "D 53-Building Common", meterNumber: "4300201", zone: "Zone_03_(B)", type: "D_Building_Common", parentMeter: "D-53 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 2, "Feb-24": 29, "Mar-24": 1, "Apr-24": 0, "May-24": 2, "Jun-24": 16, "Jul-24": 13, "Aug-24": 3, "Sep-24": 0, "Oct-24": 0, "Nov-24": 1, "Dec-24": 0, "Jan-25": 8, "Feb-25": 1, "Mar-25": 7} },
      
      { id: "M203", name: "D 54-Building Common", meterNumber: "4300202", zone: "Zone_03_(B)", type: "D_Building_Common", parentMeter: "D-54 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 4, "Feb-24": 4, "Mar-24": 3, "Apr-24": 3, "May-24": 2, "Jun-24": 2, "Jul-24": 2, "Aug-24": 1, "Sep-24": 1, "Oct-24": 1, "Nov-24": 1, "Dec-24": 1, "Jan-25": 1, "Feb-25": 1, "Mar-25": 1} },
      
      // Irrigation service
      { id: "M204", name: "Irrigation Tank 02", meterNumber: "4300320", zone: "Zone_03_(B)", type: "IRR_Services", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 134, "Feb-24": 163, "Mar-24": 39, "Apr-24": 0, "May-24": 0, "Jun-24": 115, "Jul-24": 1072, "Aug-24": 2, "Sep-24": 0, "Oct-24": 0, "Nov-24": 47, "Dec-24": 17, "Jan-25": 44, "Feb-25": 43, "Mar-25": 43} },
      
      // All Residential (Apart) meters
      { id: "M205", name: "Z3-52(1)", meterNumber: "4300142", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-52 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 11, "Feb-24": 12, "Mar-24": 9, "Apr-24": 9, "May-24": 9, "Jun-24": 11, "Jul-24": 11, "Aug-24": 10, "Sep-24": 11, "Oct-24": 10, "Nov-24": 10, "Dec-24": 10, "Jan-25": 10, "Feb-25": 10, "Mar-25": 9} },
      
      { id: "M206", name: "Z3-52(2)", meterNumber: "4300054", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-52 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 9, "Feb-24": 10, "Mar-24": 8, "Apr-24": 9, "May-24": 10, "Jun-24": 9, "Jul-24": 10, "Aug-24": 9, "Sep-24": 9, "Oct-24": 8, "Nov-24": 9, "Dec-24": 9, "Jan-25": 9, "Feb-25": 8, "Mar-25": 8} },
      
      { id: "M207", name: "Z3-54(1)", meterNumber: "4300056", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-54 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 5, "Aug-24": 15, "Sep-24": 25, "Oct-24": 21, "Nov-24": 16, "Dec-24": 14, "Jan-25": 9, "Feb-25": 6, "Mar-25": 4} },
      
      { id: "M208", name: "Z3-54(5)", meterNumber: "4300062", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-54 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 6, "Feb-24": 6, "Mar-24": 3, "Apr-24": 5, "May-24": 5, "Jun-24": 6, "Jul-24": 10, "Aug-24": 13, "Sep-24": 10, "Oct-24": 11, "Nov-24": 11, "Dec-24": 11, "Jan-25": 7, "Feb-25": 5, "Mar-25": 4} },
      
      { id: "M209", name: "Z3-52(5)", meterNumber: "4300064", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-52 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 17, "Feb-24": 10, "Mar-24": 13, "Apr-24": 12, "May-24": 9, "Jun-24": 10, "Jul-24": 8, "Aug-24": 9, "Sep-24": 13, "Oct-24": 33, "Nov-24": 23, "Dec-24": 21, "Jan-25": 25, "Feb-25": 13, "Mar-25": 13} },
      
      { id: "M210", name: "Z3-54(3)", meterNumber: "4300065", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-54 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 1, "Mar-24": 2, "Apr-24": 1, "May-24": 2, "Jun-24": 5, "Jul-24": 10, "Aug-24": 13, "Sep-24": 21, "Oct-24": 7, "Nov-24": 4, "Dec-24": 3, "Jan-25": 2, "Feb-25": 3, "Mar-25": 2} },
      
      { id: "M211", name: "Z3-53(2)", meterNumber: "4300066", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-53 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 15, "Feb-24": 10, "Mar-24": 7, "Apr-24": 8, "May-24": 10, "Jun-24": 13, "Jul-24": 12, "Aug-24": 15, "Sep-24": 16, "Oct-24": 27, "Nov-24": 28, "Dec-24": 20, "Jan-25": 19, "Feb-25": 12, "Mar-25": 12} },
      
      { id: "M212", name: "Z3-54(6)", meterNumber: "4300067", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-54 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 8, "Oct-24": 8, "Nov-24": 7, "Dec-24": 5, "Jan-25": 2, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M213", name: "Z3-52(3)", meterNumber: "4300068", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-52 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 34, "Feb-24": 30, "Mar-24": 22, "Apr-24": 18, "May-24": 16, "Jun-24": 22, "Jul-24": 24, "Aug-24": 26, "Sep-24": 25, "Oct-24": 29, "Nov-24": 30, "Dec-24": 28, "Jan-25": 34, "Feb-25": 30, "Mar-25": 28} },
      
      { id: "M214", name: "Z3-53(1)", meterNumber: "4300069", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-53 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 2, "May-24": 7, "Jun-24": 18, "Jul-24": 19, "Aug-24": 23, "Sep-24": 20, "Oct-24": 25, "Nov-24": 17, "Dec-24": 13, "Jan-25": 10, "Feb-25": 5, "Mar-25": 3} },
      
      { id: "M215", name: "Z3-53(3)", meterNumber: "4300070", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-53 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 7, "Feb-24": 5, "Mar-24": 6, "Apr-24": 5, "May-24": 5, "Jun-24": 6, "Jul-24": 9, "Aug-24": 10, "Sep-24": 9, "Oct-24": 9, "Nov-24": 9, "Dec-24": 8, "Jan-25": 10, "Feb-25": 10, "Mar-25": 11} },
      
      { id: "M216", name: "Z3-53(4)", meterNumber: "4300071", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-53 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 4, "Feb-24": 4, "Mar-24": 3, "Apr-24": 5, "May-24": 6, "Jun-24": 7, "Jul-24": 9, "Aug-24": 10, "Sep-24": 11, "Oct-24": 12, "Nov-24": 10, "Dec-24": 8, "Jan-25": 7, "Feb-25": 5, "Mar-25": 4} },
      
      { id: "M217", name: "Z3-52(4)", meterNumber: "4300073", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-52 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 2, "Dec-24": 21, "Jan-25": 18, "Feb-25": 17, "Mar-25": 19} },
      
      { id: "M218", name: "Z3-54(4)", meterNumber: "4300074", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-54 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 10, "Oct-24": 35, "Nov-24": 20, "Dec-24": 20, "Jan-25": 18, "Feb-25": 11, "Mar-25": 8} },
      
      { id: "M219", name: "Z3-52(6)", meterNumber: "4300072", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-52 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 9, "Feb-24": 12, "Mar-24": 8, "Apr-24": 12, "May-24": 9, "Jun-24": 8, "Jul-24": 10, "Aug-24": 12, "Sep-24": 15, "Oct-24": 17, "Nov-24": 28, "Dec-24": 33, "Jan-25": 39, "Feb-25": 22, "Mar-25": 18} },
      
      { id: "M220", name: "Z3-53(5)", meterNumber: "4300149", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-53 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 28, "Feb-24": 35, "Mar-24": 25, "Apr-24": 20, "May-24": 32, "Jun-24": 38, "Jul-24": 45, "Aug-24": 52, "Sep-24": 54, "Oct-24": 55, "Nov-24": 62, "Dec-24": 68, "Jan-25": 56, "Feb-25": 48, "Mar-25": 39} },
      
      { id: "M221", name: "Z3-53(6)", meterNumber: "4300148", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-53 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 6, "Jul-24": 15, "Aug-24": 24, "Sep-24": 35, "Oct-24": 61, "Nov-24": 58, "Dec-24": 49, "Jan-25": 48, "Feb-25": 40, "Mar-25": 35} },
      
      { id: "M222", name: "Z3-54(2)", meterNumber: "4300133", zone: "Zone_03_(B)", type: "Residential (Apart)", parentMeter: "D-54 Building Bulk Meter", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      // All Residential (Villa) meters
      { id: "M250", name: "Z3-21 (Villa)", meterNumber: "4300009", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 59, "Feb-24": 29, "Mar-24": 23, "Apr-24": 27, "May-24": 34, "Jun-24": 31, "Jul-24": 38, "Aug-24": 43, "Sep-24": 46, "Oct-24": 38, "Nov-24": 53, "Dec-24": 56, "Jan-25": 41, "Feb-25": 42, "Mar-25": 42} },
      
      { id: "M251", name: "Z3-20 (Villa)", meterNumber: "4300020", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 12, "Feb-24": 8, "Mar-24": 9, "Apr-24": 9, "May-24": 9, "Jun-24": 10, "Jul-24": 11, "Aug-24": 15, "Sep-24": 12, "Oct-24": 14, "Nov-24": 14, "Dec-24": 13, "Jan-25": 12, "Feb-25": 7, "Mar-25": 7} },
      
      { id: "M252", name: "Z3-13 (Villa)", meterNumber: "4300025", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 30, "Feb-24": 19, "Mar-24": 17, "Apr-24": 21, "May-24": 21, "Jun-24": 21, "Jul-24": 23, "Aug-24": 32, "Sep-24": 25, "Oct-24": 22, "Nov-24": 23, "Dec-24": 28, "Jan-25": 20, "Feb-25": 18, "Mar-25": 18} },
      
      { id: "M253", name: "Z3-15 (Villa)", meterNumber: "4300057", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 53, "Feb-24": 25, "Mar-24": 27, "Apr-24": 30, "May-24": 42, "Jun-24": 47, "Jul-24": 49, "Aug-24": 29, "Sep-24": 53, "Oct-24": 54, "Nov-24": 51, "Dec-24": 33, "Jan-25": 41, "Feb-25": 35, "Mar-25": 35} },
      
      { id: "M254", name: "Z3-14 (Villa)", meterNumber: "4300060", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 157, "Feb-24": 134, "Mar-24": 116, "Apr-24": 107, "May-24": 96, "Jun-24": 134, "Jul-24": 131, "Aug-24": 156, "Sep-24": 148, "Oct-24": 134, "Nov-24": 75, "Dec-24": 111, "Jan-25": 94, "Feb-25": 102, "Mar-25": 30} },
      
      { id: "M255", name: "Z3-12 (Villa)", meterNumber: "4300076", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 95, "Feb-24": 101, "Mar-24": 83, "Apr-24": 73, "May-24": 72, "Jun-24": 93, "Jul-24": 97, "Aug-24": 81, "Sep-24": 71, "Oct-24": 59, "Nov-24": 100, "Dec-24": 86, "Jan-25": 78, "Feb-25": 59, "Mar-25": 54} },
      
      { id: "M256", name: "Z3-16 (Villa)", meterNumber: "4300077", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 35, "Feb-24": 30, "Mar-24": 15, "Apr-24": 19, "May-24": 23, "Jun-24": 41, "Jul-24": 60, "Aug-24": 46, "Sep-24": 45, "Oct-24": 50, "Nov-24": 40, "Dec-24": 38, "Jan-25": 45, "Feb-25": 35, "Mar-25": 33} },
      
      { id: "M257", name: "Z3-17 (Villa)", meterNumber: "4300078", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 86, "Feb-24": 41, "Mar-24": 59, "Apr-24": 44, "May-24": 78, "Jun-24": 87, "Jul-24": 106, "Aug-24": 127, "Sep-24": 124, "Oct-24": 97, "Nov-24": 84, "Dec-24": 72, "Jan-25": 68, "Feb-25": 60, "Mar-25": 55} },
      
      { id: "M258", name: "Z3-18 (Villa)", meterNumber: "4300080", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 88, "Feb-24": 69, "Mar-24": 67, "Apr-24": 51, "May-24": 63, "Jun-24": 79, "Jul-24": 97, "Aug-24": 112, "Sep-24": 108, "Oct-24": 87, "Nov-24": 71, "Dec-24": 59, "Jan-25": 62, "Feb-25": 56, "Mar-25": 52} },
      
      { id: "M259", name: "Z3-19 (Villa)", meterNumber: "4300083", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 67, "Feb-24": 45, "Mar-24": 36, "Apr-24": 40, "May-24": 54, "Jun-24": 68, "Jul-24": 89, "Aug-24": 103, "Sep-24": 95, "Oct-24": 91, "Nov-24": 77, "Dec-24": 62, "Jan-25": 58, "Feb-25": 48, "Mar-25": 43} },
      
      { id: "M260", name: "Z3-11 (Villa)", meterNumber: "4300088", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 23, "Feb-24": 16, "Mar-24": 13, "Apr-24": 15, "May-24": 19, "Jun-24": 25, "Jul-24": 32, "Aug-24": 41, "Sep-24": 45, "Oct-24": 39, "Nov-24": 33, "Dec-24": 27, "Jan-25": 24, "Feb-25": 18, "Mar-25": 15} },
      
      { id: "M261", name: "Z3-10 (Villa)", meterNumber: "4300090", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 61, "Feb-24": 48, "Mar-24": 43, "Apr-24": 38, "May-24": 52, "Jun-24": 67, "Jul-24": 89, "Aug-24": 105, "Sep-24": 98, "Oct-24": 87, "Nov-24": 73, "Dec-24": 58, "Jan-25": 54, "Feb-25": 45, "Mar-25": 41} },
      
      { id: "M262", name: "Z3-22 (Villa)", meterNumber: "4300092", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 49, "Feb-24": 35, "Mar-24": 28, "Apr-24": 31, "May-24": 44, "Jun-24": 59, "Jul-24": 78, "Aug-24": 91, "Sep-24": 85, "Oct-24": 73, "Nov-24": 61, "Dec-24": 48, "Jan-25": 43, "Feb-25": 37, "Mar-25": 33} },
      
      { id: "M263", name: "Z3-9 (Villa)", meterNumber: "4300094", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 34, "Feb-24": 26, "Mar-24": 21, "Apr-24": 23, "May-24": 32, "Jun-24": 45, "Jul-24": 58, "Aug-24": 67, "Sep-24": 62, "Oct-24": 55, "Nov-24": 47, "Dec-24": 38, "Jan-25": 35, "Feb-25": 29, "Mar-25": 25} },
      
      { id: "M264", name: "Z3-8 (Villa)", meterNumber: "4300096", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 42, "Feb-24": 34, "Mar-24": 29, "Apr-24": 31, "May-24": 39, "Jun-24": 51, "Jul-24": 67, "Aug-24": 78, "Sep-24": 73, "Oct-24": 64, "Nov-24": 55, "Dec-24": 45, "Jan-25": 42, "Feb-25": 35, "Mar-25": 31} },
      
      { id: "M265", name: "Z3-7 (Villa)", meterNumber: "4300098", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 18, "Feb-24": 14, "Mar-24": 11, "Apr-24": 12, "May-24": 17, "Jun-24": 23, "Jul-24": 31, "Aug-24": 38, "Sep-24": 35, "Oct-24": 29, "Nov-24": 24, "Dec-24": 19, "Jan-25": 17, "Feb-25": 14, "Mar-25": 12} },
      
      { id: "M266", name: "Z3-6 (Villa)", meterNumber: "4300100", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 29, "Feb-24": 23, "Mar-24": 19, "Apr-24": 21, "May-24": 28, "Jun-24": 37, "Jul-24": 49, "Aug-24": 58, "Sep-24": 54, "Oct-24": 47, "Nov-24": 39, "Dec-24": 31, "Jan-25": 28, "Feb-25": 23, "Mar-25": 20} },
      
      { id: "M267", name: "Z3-5 (Villa)", meterNumber: "4300102", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 37, "Feb-24": 29, "Mar-24": 24, "Apr-24": 26, "May-24": 35, "Jun-24": 46, "Jul-24": 61, "Aug-24": 72, "Sep-24": 67, "Oct-24": 59, "Nov-24": 49, "Dec-24": 39, "Jan-25": 36, "Feb-25": 30, "Mar-25": 26} },
      
      { id: "M268", name: "Z3-4 (Villa)", meterNumber: "4300103", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 5, "Jun-24": 15, "Jul-24": 28, "Aug-24": 35, "Sep-24": 32, "Oct-24": 28, "Nov-24": 23, "Dec-24": 18, "Jan-25": 16, "Feb-25": 13, "Mar-25": 10} },
      
      { id: "M269", name: "Z3-3 (Villa)", meterNumber: "4300104", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 2, "Jul-24": 8, "Aug-24": 15, "Sep-24": 14, "Oct-24": 12, "Nov-24": 10, "Dec-24": 8, "Jan-25": 7, "Feb-25": 5, "Mar-25": 4} },
      
      { id: "M270", name: "Z3-2 (Villa)", meterNumber: "4300105", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 1, "Aug-24": 3, "Sep-24": 3, "Oct-24": 2, "Nov-24": 2, "Dec-24": 1, "Jan-25": 1, "Feb-25": 1, "Mar-25": 0} },
      
      { id: "M271", name: "Z3-1 (Villa)", meterNumber: "4300008", zone: "Zone_03_(B)", type: "Residential (Villa)", parentMeter: "ZONE 3B (BULK ZONE 3B)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      // Zone bulk meter
      { id: "M350", name: "ZONE 3B (BULK ZONE 3B)", meterNumber: "4300344", zone: "Zone_03_(B)", type: "Zone Bulk", parentMeter: "Main Bulk (NAMA)", label: "L2",
        monthlyConsumption: {"Jan-24": 2653, "Feb-24": 2169, "Mar-24": 2315, "Apr-24": 2381, "May-24": 2634, "Jun-24": 2932, "Jul-24": 3369, "Aug-24": 3458, "Sep-24": 3742, "Oct-24": 2906, "Nov-24": 2695, "Dec-24": 3583, "Jan-25": 3256, "Feb-25": 2962, "Mar-25": 3331} }
    ],
    Z05: [
      // Zone 05 - ALL meters with complete monthly data
      // Irrigation service
      { id: "M301", name: "Irrigation Tank 03", meterNumber: "4300321", zone: "Zone_05", type: "IRR_Services", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 1223, "Feb-24": 1016, "Mar-24": 552, "Apr-24": 808, "May-24": 0, "Jun-24": 347, "Jul-24": 763, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 1, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      // All Residential (Villa) meters
      { id: "M302", name: "Z5-17", meterNumber: "4300001", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 88, "Feb-24": 80, "Mar-24": 78, "Apr-24": 61, "May-24": 1, "Jun-24": 61, "Jul-24": 72, "Aug-24": 82, "Sep-24": 80, "Oct-24": 87, "Nov-24": 80, "Dec-24": 37, "Jan-25": 80, "Feb-25": 83, "Mar-25": 81} },
      
      { id: "M303", name: "Z5-13", meterNumber: "4300058", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 62, "Feb-24": 66, "Mar-24": 87, "Apr-24": 91, "May-24": 85, "Jun-24": 75, "Jul-24": 80, "Aug-24": 89, "Sep-24": 102, "Oct-24": 111, "Nov-24": 92, "Dec-24": 114, "Jan-25": 106, "Feb-25": 96, "Mar-25": 89} },
      
      { id: "M304", name: "Z5-14", meterNumber: "4300059", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 132, "Feb-24": 84, "Mar-24": 63, "Apr-24": 69, "May-24": 137, "Jun-24": 115, "Jul-24": 94, "Aug-24": 107, "Sep-24": 101, "Oct-24": 121, "Nov-24": 95, "Dec-24": 93, "Jan-25": 69, "Feb-25": 87, "Mar-25": 77} },
      
      { id: "M305", name: "Z5-5", meterNumber: "4300146", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 9, "Feb-24": 0, "Mar-24": 0, "Apr-24": 1, "May-24": 4, "Jun-24": 31, "Jul-24": 13, "Aug-24": 50, "Sep-24": 0, "Oct-24": 6, "Nov-24": 0, "Dec-24": 33, "Jan-25": 2, "Feb-25": 1, "Mar-25": 2} },
      
      { id: "M306", name: "Z5-30", meterNumber: "4300147", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 102, "Feb-24": 63, "Mar-24": 42, "Apr-24": 54, "May-24": 0, "Jun-24": 89, "Jul-24": 96, "Aug-24": 73, "Sep-24": 108, "Oct-24": 98, "Nov-24": 87, "Dec-24": 82, "Jan-25": 80, "Feb-25": 74, "Mar-25": 71} },
      
      { id: "M307", name: "Z5-4", meterNumber: "4300150", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 97, "Feb-24": 88, "Mar-24": 64, "Apr-24": 71, "May-24": 132, "Jun-24": 119, "Jul-24": 156, "Aug-24": 178, "Sep-24": 165, "Oct-24": 143, "Nov-24": 112, "Dec-24": 89, "Jan-25": 98, "Feb-25": 45, "Mar-25": 35} },
      
      { id: "M308", name: "Z5-6", meterNumber: "4300151", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 5, "Feb-24": 4, "Mar-24": 3, "Apr-24": 3, "May-24": 5, "Jun-24": 7, "Jul-24": 9, "Aug-24": 11, "Sep-24": 10, "Oct-24": 8, "Nov-24": 6, "Dec-24": 4, "Jan-25": 3, "Feb-25": 12, "Mar-25": 10} },
      
      { id: "M309", name: "Z5-20", meterNumber: "4300152", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 23, "Feb-24": 19, "Mar-24": 15, "Apr-24": 17, "May-24": 25, "Jun-24": 33, "Jul-24": 42, "Aug-24": 51, "Sep-24": 47, "Oct-24": 39, "Nov-24": 31, "Dec-24": 25, "Jan-25": 30, "Feb-25": 157, "Mar-25": 147} },
      
      { id: "M310", name: "Z5-23", meterNumber: "4300153", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 12, "Feb-24": 14, "Mar-24": 17, "Apr-24": 13, "May-24": 14, "Jun-24": 22, "Jul-24": 19, "Aug-24": 22, "Sep-24": 23, "Oct-24": 22, "Nov-24": 19, "Dec-24": 16, "Jan-25": 22, "Feb-25": 19, "Mar-25": 19} },
      
      { id: "M311", name: "Z5-8", meterNumber: "4300154", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 67, "Feb-24": 55, "Mar-24": 46, "Apr-24": 51, "May-24": 69, "Jun-24": 89, "Jul-24": 112, "Aug-24": 134, "Sep-24": 125, "Oct-24": 103, "Nov-24": 82, "Dec-24": 65, "Jan-25": 58, "Feb-25": 49, "Mar-25": 43} },
      
      { id: "M312", name: "Z5-19", meterNumber: "4300155", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 45, "Feb-24": 38, "Mar-24": 32, "Apr-24": 35, "May-24": 48, "Jun-24": 62, "Jul-24": 79, "Aug-24": 95, "Sep-24": 89, "Oct-24": 73, "Nov-24": 58, "Dec-24": 46, "Jan-25": 41, "Feb-25": 34, "Mar-25": 30} },
      
      { id: "M313", name: "Z5-15", meterNumber: "4300156", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 56, "Feb-24": 47, "Mar-24": 39, "Apr-24": 43, "May-24": 58, "Jun-24": 75, "Jul-24": 95, "Aug-24": 114, "Sep-24": 106, "Oct-24": 87, "Nov-24": 69, "Dec-24": 55, "Jan-25": 49, "Feb-25": 41, "Mar-25": 36} },
      
      { id: "M314", name: "Z5-7", meterNumber: "4300157", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 78, "Feb-24": 65, "Mar-24": 54, "Apr-24": 60, "May-24": 81, "Jun-24": 105, "Jul-24": 133, "Aug-24": 159, "Sep-24": 148, "Oct-24": 122, "Nov-24": 97, "Dec-24": 77, "Jan-25": 69, "Feb-25": 58, "Mar-25": 51} },
      
      { id: "M315", name: "Z5-22", meterNumber: "4300158", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 34, "Feb-24": 28, "Mar-24": 23, "Apr-24": 26, "May-24": 35, "Jun-24": 45, "Jul-24": 57, "Aug-24": 69, "Sep-24": 64, "Oct-24": 53, "Nov-24": 42, "Dec-24": 33, "Jan-25": 30, "Feb-25": 25, "Mar-25": 22} },
      
      { id: "M316", name: "Z5-18", meterNumber: "4300159", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 89, "Feb-24": 74, "Mar-24": 62, "Apr-24": 68, "May-24": 92, "Jun-24": 119, "Jul-24": 150, "Aug-24": 180, "Sep-24": 168, "Oct-24": 138, "Nov-24": 110, "Dec-24": 87, "Jan-25": 78, "Feb-25": 65, "Mar-25": 57} },
      
      { id: "M317", name: "Z5-10", meterNumber: "4300160", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 12, "Feb-24": 10, "Mar-24": 8, "Apr-24": 9, "May-24": 12, "Jun-24": 16, "Jul-24": 20, "Aug-24": 24, "Sep-24": 22, "Oct-24": 18, "Nov-24": 14, "Dec-24": 11, "Jan-25": 10, "Feb-25": 8, "Mar-25": 7} },
      
      { id: "M318", name: "Z5-12", meterNumber: "4300161", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 45, "Feb-24": 38, "Mar-24": 32, "Apr-24": 35, "May-24": 48, "Jun-24": 62, "Jul-24": 79, "Aug-24": 95, "Sep-24": 89, "Oct-24": 73, "Nov-24": 58, "Dec-24": 46, "Jan-25": 41, "Feb-25": 34, "Mar-25": 30} },
      
      { id: "M319", name: "Z5-9", meterNumber: "4300162", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 67, "Feb-24": 56, "Mar-24": 47, "Apr-24": 52, "May-24": 70, "Jun-24": 91, "Jul-24": 115, "Aug-24": 138, "Sep-24": 129, "Oct-24": 106, "Nov-24": 84, "Dec-24": 67, "Jan-25": 60, "Feb-25": 50, "Mar-25": 44} },
      
      { id: "M320", name: "Z5-16", meterNumber: "4300163", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 23, "Feb-24": 19, "Mar-24": 16, "Apr-24": 18, "May-24": 24, "Jun-24": 31, "Jul-24": 39, "Aug-24": 47, "Sep-24": 44, "Oct-24": 36, "Nov-24": 29, "Dec-24": 23, "Jan-25": 21, "Feb-25": 17, "Mar-25": 15} },
      
      { id: "M321", name: "Z5-24", meterNumber: "4300164", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 34, "Feb-24": 28, "Mar-24": 23, "Apr-24": 26, "May-24": 35, "Jun-24": 45, "Jul-24": 57, "Aug-24": 69, "Sep-24": 64, "Oct-24": 53, "Nov-24": 42, "Dec-24": 33, "Jan-25": 30, "Feb-25": 25, "Mar-25": 22} },
      
      { id: "M322", name: "Z5-21", meterNumber: "4300165", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 56, "Feb-24": 47, "Mar-24": 39, "Apr-24": 43, "May-24": 58, "Jun-24": 75, "Jul-24": 95, "Aug-24": 114, "Sep-24": 106, "Oct-24": 87, "Nov-24": 69, "Dec-24": 55, "Jan-25": 49, "Feb-25": 41, "Mar-25": 36} },
      
      { id: "M323", name: "Z5-11", meterNumber: "4300166", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M324", name: "Z5-1", meterNumber: "4300167", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M325", name: "Z5-25", meterNumber: "4300168", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M326", name: "Z5-26", meterNumber: "4300169", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M327", name: "Z5-27", meterNumber: "4300170", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M328", name: "Z5-28", meterNumber: "4300171", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M329", name: "Z5-29", meterNumber: "4300172", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M330", name: "Z5-2", meterNumber: "4300173", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M331", name: "Z5-3", meterNumber: "4300174", zone: "Zone_05", type: "Residential (Villa)", parentMeter: "ZONE 5 (Bulk Zone 5)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      // Zone bulk meter
      { id: "M335", name: "ZONE 5 (Bulk Zone 5)", meterNumber: "4300345", zone: "Zone_05", type: "Zone Bulk", parentMeter: "Main Bulk (NAMA)", label: "L2",
        monthlyConsumption: {"Jan-24": 4286, "Feb-24": 3897, "Mar-24": 4127, "Apr-24": 4911, "May-24": 2639, "Jun-24": 4992, "Jul-24": 5305, "Aug-24": 4039, "Sep-24": 2736, "Oct-24": 3383, "Nov-24": 1438, "Dec-24": 3788, "Jan-25": 4267, "Feb-25": 4231, "Mar-25": 3862} }
    ],
    Z08: [
      // Zone 08 - ALL meters with complete monthly data
      // All Residential (Villa) meters
      { id: "M401", name: "Z8-11", meterNumber: "4300023", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 1, "Mar-24": 0, "Apr-24": 0, "May-24": 1, "Jun-24": 23, "Jul-24": 2, "Aug-24": 2, "Sep-24": 1, "Oct-24": 1, "Nov-24": 2, "Dec-24": 0, "Jan-25": 0, "Feb-25": 1, "Mar-25": 0} },
      
      { id: "M402", name: "Z8-13", meterNumber: "4300024", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 1, "Feb-24": 1, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M403", name: "Z8-1", meterNumber: "4300188", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 3, "Feb-24": 3, "Mar-24": 3, "Apr-24": 2, "May-24": 2, "Jun-24": 3, "Jul-24": 4, "Aug-24": 4, "Sep-24": 3, "Oct-24": 2, "Nov-24": 3, "Dec-24": 2, "Jan-25": 2, "Feb-25": 3, "Mar-25": 3} },
      
      { id: "M404", name: "Z8-12", meterNumber: "4300196", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 242, "Feb-24": 145, "Mar-24": 142, "Apr-24": 141, "May-24": 213, "Jun-24": 275, "Jul-24": 318, "Aug-24": 311, "Sep-24": 309, "Oct-24": 301, "Nov-24": 250, "Dec-24": 207, "Jan-25": 192, "Feb-25": 215, "Mar-25": 249} },
      
      { id: "M405", name: "Z8-15", meterNumber: "4300198", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 90, "Feb-24": 78, "Mar-24": 67, "Apr-24": 61, "May-24": 60, "Jun-24": 76, "Jul-24": 80, "Aug-24": 87, "Sep-24": 93, "Oct-24": 81, "Nov-24": 73, "Dec-24": 63, "Jan-25": 61, "Feb-25": 70, "Mar-25": 70} },
      
      { id: "M406", name: "Z8-16", meterNumber: "4300199", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 73, "Feb-24": 51, "Mar-24": 48, "Apr-24": 49, "May-24": 59, "Jun-24": 76, "Jul-24": 102, "Aug-24": 91, "Sep-24": 97, "Oct-24": 106, "Nov-24": 85, "Dec-24": 62, "Jan-25": 72, "Feb-25": 59, "Mar-25": 54} },
      
      { id: "M407", name: "Z8-17", meterNumber: "4300200", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 195, "Feb-24": 168, "Mar-24": 169, "Apr-24": 192, "May-24": 210, "Jun-24": 257, "Jul-24": 291, "Aug-24": 324, "Sep-24": 318, "Oct-24": 283, "Nov-24": 207, "Dec-24": 172, "Jan-25": 162, "Feb-25": 164, "Mar-25": 171} },
      
      { id: "M408", name: "Z8-5", meterNumber: "4300287", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 375, "Feb-24": 387, "Mar-24": 413, "Apr-24": 437, "May-24": 434, "Jun-24": 520, "Jul-24": 509, "Aug-24": 521, "Sep-24": 459, "Oct-24": 403, "Nov-24": 365, "Dec-24": 349, "Jan-25": 341, "Feb-25": 325, "Mar-25": 313} },
      
      { id: "M409", name: "Z8-9", meterNumber: "4300288", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 7, "Feb-24": 7, "Mar-24": 6, "Apr-24": 7, "May-24": 7, "Jun-24": 8, "Jul-24": 10, "Aug-24": 10, "Sep-24": 9, "Oct-24": 8, "Nov-24": 8, "Dec-24": 6, "Jan-25": 12, "Feb-25": 7, "Mar-25": 5} },
      
      { id: "M410", name: "Z8-18", meterNumber: "4300289", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 79, "Feb-24": 92, "Mar-24": 105, "Apr-24": 187, "May-24": 212, "Jun-24": 292, "Jul-24": 334, "Aug-24": 410, "Sep-24": 415, "Oct-24": 390, "Nov-24": 215, "Dec-24": 101, "Jan-25": 111, "Feb-25": 334, "Mar-25": 336} },
      
      { id: "M411", name: "Z8-14", meterNumber: "4300290", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 89, "Feb-24": 72, "Mar-24": 65, "Apr-24": 71, "May-24": 85, "Jun-24": 108, "Jul-24": 134, "Aug-24": 151, "Sep-24": 142, "Oct-24": 117, "Nov-24": 93, "Dec-24": 74, "Jan-25": 67, "Feb-25": 56, "Mar-25": 49} },
      
      { id: "M412", name: "Z8-10", meterNumber: "4300291", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 123, "Feb-24": 98, "Mar-24": 89, "Apr-24": 97, "May-24": 117, "Jun-24": 149, "Jul-24": 186, "Aug-24": 209, "Sep-24": 196, "Oct-24": 162, "Nov-24": 129, "Dec-24": 102, "Jan-25": 92, "Feb-25": 77, "Mar-25": 68} },
      
      { id: "M413", name: "Z8-6", meterNumber: "4300292", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 156, "Feb-24": 124, "Mar-24": 112, "Apr-24": 122, "May-24": 147, "Jun-24": 187, "Jul-24": 234, "Aug-24": 263, "Sep-24": 247, "Oct-24": 203, "Nov-24": 162, "Dec-24": 128, "Jan-25": 116, "Feb-25": 97, "Mar-25": 85} },
      
      { id: "M414", name: "Z8-7", meterNumber: "4300293", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 178, "Feb-24": 142, "Mar-24": 128, "Apr-24": 140, "May-24": 168, "Jun-24": 214, "Jul-24": 267, "Aug-24": 301, "Sep-24": 282, "Oct-24": 233, "Nov-24": 185, "Dec-24": 147, "Jan-25": 133, "Feb-25": 111, "Mar-25": 98} },
      
      { id: "M415", name: "Z8-8", meterNumber: "4300294", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 134, "Feb-24": 107, "Mar-24": 97, "Apr-24": 106, "May-24": 127, "Jun-24": 162, "Jul-24": 202, "Aug-24": 227, "Sep-24": 213, "Oct-24": 176, "Nov-24": 140, "Dec-24": 111, "Jan-25": 100, "Feb-25": 84, "Mar-25": 74} },
      
      { id: "M416", name: "Z8-2", meterNumber: "4300295", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 45, "Feb-24": 36, "Mar-24": 32, "Apr-24": 35, "May-24": 42, "Jun-24": 54, "Jul-24": 67, "Aug-24": 76, "Sep-24": 71, "Oct-24": 59, "Nov-24": 47, "Dec-24": 37, "Jan-25": 33, "Feb-25": 28, "Mar-25": 25} },
      
      { id: "M417", name: "Z8-3", meterNumber: "4300297", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 67, "Feb-24": 54, "Mar-24": 49, "Apr-24": 53, "May-24": 64, "Jun-24": 81, "Jul-24": 101, "Aug-24": 114, "Sep-24": 107, "Oct-24": 88, "Nov-24": 70, "Dec-24": 56, "Jan-25": 50, "Feb-25": 42, "Mar-25": 37} },
      
      { id: "M418", name: "Z8-4", meterNumber: "4300299", zone: "Zone_08", type: "Residential (Villa)", parentMeter: "BULK ZONE 8", label: "L3",
        monthlyConsumption: {"Jan-24": 89, "Feb-24": 71, "Mar-24": 64, "Apr-24": 70, "May-24": 84, "Jun-24": 107, "Jul-24": 134, "Aug-24": 151, "Sep-24": 142, "Oct-24": 117, "Nov-24": 93, "Dec-24": 74, "Jan-25": 67, "Feb-25": 56, "Mar-25": 49} },
      
      // Zone bulk meter
      { id: "M423", name: "ZONE 8 (Bulk Zone 8)", meterNumber: "4300342", zone: "Zone_08", type: "Zone Bulk", parentMeter: "Main Bulk (NAMA)", label: "L2",
        monthlyConsumption: {"Jan-24": 2170, "Feb-24": 1825, "Mar-24": 2021, "Apr-24": 2753, "May-24": 2722, "Jun-24": 3193, "Jul-24": 3639, "Aug-24": 3957, "Sep-24": 3947, "Oct-24": 4296, "Nov-24": 3569, "Dec-24": 3018, "Jan-25": 1547, "Feb-25": 1498, "Mar-25": 2605} }
    ],
    ZVS: [
      // Zone VS - ALL meters with complete monthly data
      // Irrigation service
      { id: "M501", name: "Irrigation Tank - VS", meterNumber: "4300326", zone: "Zone_VS", type: "IRR_Services", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 2, "May-24": 0, "Jun-24": 157, "Jul-24": 116, "Aug-24": 71, "Sep-24": 100, "Oct-24": 0, "Nov-24": 1, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      // All Retail meters
      { id: "M502", name: "Coffee 1", meterNumber: "4300327", zone: "Zone_VS", type: "Retail", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 3, "Mar-25": 3} },
      
      { id: "M503", name: "Coffee 2", meterNumber: "4300329", zone: "Zone_VS", type: "Retail", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 15, "Feb-24": 15, "Mar-24": 16, "Apr-24": 14, "May-24": 12, "Jun-24": 11, "Jul-24": 5, "Aug-24": 5, "Sep-24": 4, "Oct-24": 5, "Nov-24": 3, "Dec-24": 0, "Jan-25": 0, "Feb-25": 3, "Mar-25": 5} },
      
      { id: "M504", name: "Supermarket", meterNumber: "4300330", zone: "Zone_VS", type: "Retail", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 30, "Apr-24": 31, "May-24": 94, "Jun-24": 103, "Jul-24": 23, "Aug-24": 51, "Sep-24": 38, "Oct-24": 57, "Nov-24": 30, "Dec-24": 17, "Jan-25": 14, "Feb-25": 9, "Mar-25": 0} },
      
      { id: "M505", name: "Pharmacy", meterNumber: "4300331", zone: "Zone_VS", type: "Retail", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 11, "Apr-24": 10, "May-24": 12, "Jun-24": 6, "Jul-24": 2, "Aug-24": 5, "Sep-24": 3, "Oct-24": 1, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M506", name: "Laundry Services", meterNumber: "4300332", zone: "Zone_VS", type: "Retail", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 11, "Feb-24": 4, "Mar-24": 15, "Apr-24": 3, "May-24": 6, "Jun-24": 0, "Jul-24": 0, "Aug-24": 5, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 25, "Mar-25": 22} },
      
      { id: "M507", name: "Shop No.593 A", meterNumber: "4300333", zone: "Zone_VS", type: "Retail", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M508", name: "Building BANK", meterNumber: "4300334", zone: "Zone_VS", type: "Retail", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 10, "Apr-24": 14, "May-24": 13, "Jun-24": 0, "Jul-24": 0, "Aug-24": 10, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M509", name: "Saloon - VS", meterNumber: "4300338", zone: "Zone_VS", type: "Retail", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M510", name: "Zone VS - Building Common", meterNumber: "4300340", zone: "Zone_VS", type: "VS_Common", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      { id: "M511", name: "Zone VS - Parking Area", meterNumber: "4300341", zone: "Zone_VS", type: "VS_Common", parentMeter: "Village Square (Zone Bulk)", label: "L3",
        monthlyConsumption: {"Jan-24": 0, "Feb-24": 0, "Mar-24": 0, "Apr-24": 0, "May-24": 0, "Jun-24": 0, "Jul-24": 0, "Aug-24": 0, "Sep-24": 0, "Oct-24": 0, "Nov-24": 0, "Dec-24": 0, "Jan-25": 0, "Feb-25": 0, "Mar-25": 0} },
      
      // Zone bulk meter
      { id: "M512", name: "Village Square (Zone Bulk)", meterNumber: "4300335", zone: "Zone_VS", type: "Zone Bulk", parentMeter: "Main Bulk (NAMA)", label: "L2",
        monthlyConsumption: {"Jan-24": 26, "Feb-24": 19, "Mar-24": 72, "Apr-24": 60, "May-24": 125, "Jun-24": 277, "Jul-24": 143, "Aug-24": 137, "Sep-24": 145, "Oct-24": 63, "Nov-24": 34, "Dec-24": 17, "Jan-25": 14, "Feb-25": 12, "Mar-25": 21} }
    ]
  }
};

// KPI Card Component with hierarchy support
const KPICard = ({ title, value, unit, change, icon, bgColor, size, onClick }) => {
  const isPositive = parseFloat(change) >= 0;
  const changeAbs = Math.abs(parseFloat(change));

  // Handle potential NaN or Infinity from change calculation
  const displayChange = isNaN(changeAbs) || !isFinite(changeAbs) ? "N/A" : `${changeAbs}%`;
  const changeColor = isNaN(changeAbs) || !isFinite(changeAbs) ? "text-gray-500" : isPositive ? "text-green-500" : "text-red-500";
  const changeArrow = isNaN(changeAbs) || !isFinite(changeAbs) ? null : isPositive ?
    <ArrowUp className="h-4 w-4 text-green-500" /> :
    <ArrowDown className="h-4 w-4 text-red-500" />;

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden ${size === 'large' ? 'border-2' : 'border'} ${bgColor} hover:shadow-lg transition-shadow duration-300 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">{title}</span>
          <span className={`p-2 rounded-full bg-white bg-opacity-20`}>{icon}</span>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline">
            <span className={`${size === 'large' ? 'text-3xl' : 'text-2xl'} font-bold`}>
              {value.toLocaleString()}
            </span>
            <span className="ml-1 text-gray-600">{unit}</span>
          </div>
          <div className="flex items-center mt-1">
            {changeArrow}
            <span className={changeColor}>
              {displayChange}
            </span>
            {displayChange !== "N/A" && <span className="text-gray-500 text-sm ml-1">vs prev month</span>}
          </div>
        </div>
        {onClick && (
          <div className="mt-2 text-xs text-blue-500 flex items-center">
            <span>View details</span>
            <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </div>
        )}
      </div>
    </div>
  );
};

// Custom tooltip for chart components
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-gray-200">
        <p className="font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between mt-1">
            <span style={{ color: entry.color }} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: entry.color }}
              ></div>
              {entry.name}:
            </span>
            <span className="ml-2 font-medium">
              {entry.value.toLocaleString()} m³
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Custom responsive label for different screens
const ResponsiveLabel = ({ x, y, stroke, value, windowWidth }) => {
  // Return an empty group element instead of null when hidden
  if (windowWidth < 768) return <g></g>;

  const formattedValue = value.toLocaleString();
  // Estimate text width for background box
  const textWidth = formattedValue.length * 6 + 8; // Rough estimation
  const textHeight = 18; // Rough estimation

  return (
    <g>
      <rect
        x={x - textWidth / 2}
        y={y - textHeight - 5} // Position above the point
        width={textWidth}
        height={textHeight}
        rx={4} // Rounded corners
        fill="rgba(255, 255, 255, 0.8)" // Semi-transparent white background
        stroke={stroke} // Border color matching the line
        strokeWidth={1}
      />
      <text x={x} y={y - 10} dy={-2} fill="#333" fontSize={12} textAnchor="middle">
        {formattedValue}
      </text>
    </g>
  );
};

// Custom label component for Bar charts with background box
const CustomBarLabel = ({ x, y, width, height, value }) => {
  const formattedValue = value.toLocaleString();
   // Estimate text width for background box
  const textWidth = formattedValue.length * 6 + 8; // Rough estimation
  const textHeight = 18; // Rough estimation

  return (
     <g>
      <rect
        x={x + width / 2 - textWidth / 2}
        y={y - textHeight - 5} // Position above the bar
        width={textWidth}
        height={textHeight}
        rx={4} // Rounded corners
        fill="rgba(255, 255, 255, 0.8)" // Semi-transparent white background
        stroke="#333" // Border color
        strokeWidth={1}
      />
      <text x={x + width / 2} y={y - 10} dy={-2} fill="#333" fontSize={12} textAnchor="middle">
        {formattedValue}
      </text>
    </g>
  );
};


// Zone selector card with improved interaction
const ZoneSelector = ({ zones, selectedZone, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">Zone Selection</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {zones.map((zone, index) => (
          <button
            key={zone.id}
            onClick={() => onChange(zone.id)}
            className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              selectedZone === zone.id
                ? 'bg-[#4E4456] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: selectedZone === zone.id ? ZONE_COLORS[index % ZONE_COLORS.length] : undefined,
              color: selectedZone === zone.id ? 'white' : undefined
            }}
          >
            {zone.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Detailed meter table component
const DetailedMeterTable = ({ meters, title, onRowClick, selectedMonth, allMonths }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [page, setPage] = useState(0);
  const rowsPerPage = 10; // Increased rows per page for more meters

  // Find the index of the selected month
  const selectedMonthIndex = allMonths.findIndex(month => month === selectedMonth);

  // Prepare meter data with current, previous consumption and change for the selected month
  const metersWithMonthlyData = useMemo(() => {
    return meters.map(meter => {
      const currentConsumption = meter.monthlyConsumption ? meter.monthlyConsumption[selectedMonth] || 0 : 0;
      const prevMonth = selectedMonthIndex > 0 ? allMonths[selectedMonthIndex - 1] : null;
      const prevConsumption = (meter.monthlyConsumption && prevMonth) ? meter.monthlyConsumption[prevMonth] || 0 : 0;

      let change = "N/A";
      if (prevConsumption > 0) {
        change = (((currentConsumption - prevConsumption) / prevConsumption) * 100).toFixed(1);
      } else if (currentConsumption > 0) {
         change = "∞"; // Indicate infinite growth from zero
      } else {
         change = "0.0"; // 0 change if both are zero
      }


      return {
        ...meter,
        currentConsumption: currentConsumption,
        prevConsumption: prevConsumption,
        change: change
      };
    });
  }, [meters, selectedMonth, allMonths, selectedMonthIndex]);


  // Apply filtering
  const filteredMeters = useMemo(() => {
    return metersWithMonthlyData.filter(meter =>
      meter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meter.meterNumber.includes(searchTerm) ||
      meter.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meter.parentMeter.toLowerCase().includes(searchTerm.toLowerCase()) || // Added parent meter search
      meter.label.toLowerCase().includes(searchTerm.toLowerCase()) // Added label search
    );
  }, [metersWithMonthlyData, searchTerm]);

  // Apply sorting
  const sortedMeters = useMemo(() => {
    if (!sortConfig.key) return filteredMeters;

    return [...filteredMeters].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.key === 'change') {
         // Handle 'N/A' and '∞' for sorting
         const aNum = parseFloat(aValue);
         const bNum = parseFloat(bValue);

         if (aValue === "N/A" && bValue === "N/A") return 0;
         if (aValue === "N/A") return sortConfig.direction === 'ascending' ? 1 : -1;
         if (bValue === "N/A") return sortConfig.direction === 'ascending' ? -1 : 1;
         if (aValue === "∞" && bValue === "∞") return 0;
         if (aValue === "∞") return sortConfig.direction === 'ascending' ? 1 : -1; // Treat infinity as larger
         if (bValue === "∞") return sortConfig.direction === 'ascending' ? -1 : 1; // Treat infinity as larger

         if (aNum < bNum) return sortConfig.direction === 'ascending' ? -1 : 1;
         if (aNum > bNum) return sortConfig.direction === 'ascending' ? 1 : -1;
         return 0;

      } else if (typeof aValue === 'string') {
          return sortConfig.direction === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else { // Assume numerical
          if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
          return 0;
      }
    });
  }, [filteredMeters, sortConfig]);

  // Calculate pagination
  const paginatedMeters = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedMeters.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedMeters, page, rowsPerPage]);

  // Get sort direction icon
  const getSortDirectionIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium text-[#4E4456] mb-4">{title}</h3>

      {/* Search and filter controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search meters..."
            className="pl-8 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex space-x-2 w-full sm:w-auto justify-end">
          <button className="px-3 py-1.5 bg-gray-100 rounded-md flex items-center text-sm">
            <Filter className="h-3.5 w-3.5 mr-1" />
            <span>Filter</span>
          </button>
          <button className="px-3 py-1.5 bg-gray-100 rounded-md flex items-center text-sm">
            <Download className="h-3.5 w-3.5 mr-1" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('name')}
              >
                Meter Label {getSortDirectionIcon('name')}
              </th>
               <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Label
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('meterNumber')}
              >
                Acct # {getSortDirectionIcon('meterNumber')}
              </th>
               <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Zone
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('type')}
              >
                Type {getSortDirectionIcon('type')}
              </th>
               <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Parent Meter
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('currentConsumption')}
              >
                {selectedMonth} (m³) {getSortDirectionIcon('currentConsumption')}
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('prevConsumption')}
              >
                Prev ({allMonths[selectedMonthIndex - 1] || 'N/A'}) (m³) {getSortDirectionIcon('prevConsumption')}
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort('change')}
              >
                Change % {getSortDirectionIcon('change')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedMeters.map((meter) => (
              <tr
                key={meter.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick && onRowClick(meter)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meter.name}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meter.label}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meter.meterNumber}</td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meter.zone}</td> {/* Added Zone column */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    meter.type === 'Residential' ? 'bg-green-100 text-green-800' :
                    meter.type === 'Retail' ? 'bg-blue-100 text-blue-800' :
                    meter.type === 'IRR_Services' ? 'bg-purple-100 text-purple-800' :
                    meter.type === 'MB_Common' ? 'bg-yellow-100 text-yellow-800' :
                    meter.type === 'D_Building_Common' ? 'bg-orange-100 text-orange-800' : // Added D_Building_Common color
                    meter.type === 'Residential (Apart)' ? 'bg-pink-100 text-pink-800' : // Added Residential (Apart) color
                    meter.type === 'Residential (Villa)' ? 'bg-indigo-100 text-indigo-800' : // Added Residential (Villa) color
                    meter.type === 'Zone Bulk' ? 'bg-teal-100 text-teal-800' :
                    meter.type === 'VS_Common' ? 'bg-lime-100 text-lime-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {meter.type}
                  </span>
                </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{meter.parentMeter}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right font-medium">{meter.currentConsumption.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{meter.prevConsumption.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={`${meter.change === "N/A" || meter.change === "0.0" ? 'text-gray-500' : parseFloat(meter.change) > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {meter.change === "N/A" ? "N/A" : meter.change === "∞" ? "∞" : `${parseFloat(meter.change) > 0 ? '+' : ''}${meter.change}%`}
                  </span>
                </td>
              </tr>
            ))}

            {paginatedMeters.length === 0 && (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                  No meters found matching your search criteria for {selectedMonth}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sortedMeters.length > rowsPerPage && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, sortedMeters.length)} of {sortedMeters.length} meters
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(prev => Math.max(0, prev - 1))}
              disabled={page === 0}
              className={`px-3 py-1 rounded ${page === 0 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(prev => (prev + 1) * rowsPerPage < sortedMeters.length ? prev + 1 : prev)}
              disabled={(page + 1) * rowsPerPage >= sortedMeters.length}
              className={`px-3 py-1 rounded ${(page + 1) * rowsPerPage >= sortedMeters.length ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Active shape for interactive pie chart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value, name
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-lg font-semibold">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{name}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${value.toLocaleString()} m³ (${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

// Shared button component for consistent styling
const ActionButton = ({ icon, label, onClick, color = "bg-[#4E4456]", className = "" }) => (
  <button
    onClick={onClick}
    className={`${color} text-white px-4 py-2 rounded-md flex items-center shadow-sm hover:shadow-md transition-shadow ${className}`}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

// Main Dashboard Component
const MuscatBayDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("Mar-25");
  const [selectedZone, setSelectedZone] = useState("Z01");
  const [activeChartIndex, setActiveChartIndex] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [showMeterDetail, setShowMeterDetail] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [currentView, setCurrentView] = useState('overview'); // 'overview', 'zone', 'meters'
  const [hoveredZone, setHoveredZone] = useState(0);

  // Extract all available months from summary data
  const allMonths = useMemo(() => waterData.summary.map(item => item.month), []);

  // Handle window resize for responsive components
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoized data transformations for performance
  // Get current month data
  const currentMonthData = useMemo(() => {
    return waterData.summary.find(m => m.month === selectedMonth) ||
      waterData.summary[waterData.summary.length - 1];
  }, [selectedMonth]);

  // Get previous month data for comparisons
  const previousMonthData = useMemo(() => {
    const currentMonthIndex = waterData.summary.findIndex(m => m.month === selectedMonth);
    return currentMonthIndex > 0
      ? waterData.summary[currentMonthIndex - 1]
      : { L1: 0, L2: 0, L3: 0, Stage01Loss: 0, Stage02Loss: 0, TotalLoss: 0 };
  }, [selectedMonth]);

  // Calculate percentage changes
  const getPercentChange = useCallback((current, previous) => {
    if (previous === 0) return "N/A"; // Handle division by zero
    const change = ((current / previous - 1) * 100).toFixed(1);
    return isNaN(change) || !isFinite(change) ? "N/A" : change; // Handle NaN or Infinity
  }, []);

  // Get selected zone data
  const selectedZoneData = useMemo(() => {
    return waterData.zones.find(z => z.id === selectedZone);
  }, [selectedZone]);

  // Get zone's meter details data
  const zoneMeterDetails = useMemo(() => {
    return waterData.meterDetails[selectedZone] || [];
  }, [selectedZone]);

  // Generate total loss data for zones
  const zoneComparisonData = useMemo(() => {
    return waterData.zones.map((zone, index) => ({
      name: zone.name,
      value: zone.loss > 0 ? zone.loss : 0,
      fill: ZONE_COLORS[index % ZONE_COLORS.length]
    }));
  }, []);

  // Generate efficiency data for the selected zone
  const efficiencyData = useMemo(() => {
    if (!selectedZoneData) return [];
    return [
      { name: 'Efficiency', value: selectedZoneData.efficiency, fill: SUCCESS_COLOR },
      { name: 'Loss', value: 100 - selectedZoneData.efficiency, fill: DANGER_COLOR }
    ];
  }, [selectedZoneData]);

  // Handle meter selection
  const handleMeterSelect = (meter) => {
    setSelectedMeter(meter);
    setShowMeterDetail(true);
  };

  // Navigate to detail view
  const navigateToZoneDetail = () => {
    setCurrentView('zone');
  };

  // Navigate to meter list
  const navigateToMeterList = () => {
    setCurrentView('meters');
  };

  // Navigate to overview
  const navigateToOverview = () => {
    setCurrentView('overview');
    setShowMeterDetail(false);
  };

  // Dynamic gauge size based on window width
  const getGaugeSize = useMemo(() => {
    if (windowSize.width < 640) return { width: 120, height: 120 };
    if (windowSize.width < 768) return { width: 150, height: 150 };
    return { width: 180, height: 180 };
  }, [windowSize.width]);

  // Dynamic chart height based on window height
  const getChartHeight = useMemo(() => {
    if (windowSize.height < 800) return 250;
    if (windowSize.height < 1000) return 300;
    return 350;
  }, [windowSize.height]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header with navigation breadcrumbs */}
      <div className="bg-[#4E4456] text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Muscat Bay Water Management</h1>
          <p className="text-gray-200 mt-1">
            Real-time analytics for water distribution system
          </p>

          {/* Breadcrumbs navigation */}
          {(currentView !== 'overview' || showMeterDetail) && (
            <div className="flex items-center mt-4 text-sm">
              <button
                onClick={navigateToOverview}
                className="flex items-center hover:underline"
              >
                <Home className="h-3.5 w-3.5 mr-1" />
                <span>Dashboard</span>
              </button>

              {currentView === 'zone' && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 mx-1" />
                  <span>Zone Details</span>
                </>
              )}

              {currentView === 'meters' && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 mx-1" />
                  <span>Meter Analysis</span>
                </>
              )}

              {showMeterDetail && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 mx-1" />
                  <span>Meter Detail</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        {/* Period Selector */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Period Selection</h3>
          {/* Responsive layout for period selector */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {waterData.summary.map(period => (
              <button
                key={period.month}
                onClick={() => setSelectedMonth(period.month)}
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  selectedMonth === period.month
                    ? 'bg-[#4E4456] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.month}
              </button>
            ))}
          </div>
        </div>

        {/* Main content based on current view */}
        {currentView === 'overview' && !showMeterDetail && (
          <>
            {/* Hierarchical KPI Section - Tier 1 (Primary Metrics) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <KPICard
                title="Total Water Supply (L1)"
                value={currentMonthData.L1}
                unit="m³"
                change={getPercentChange(currentMonthData.L1, previousMonthData.L1)}
                icon={<Droplet className="h-5 w-5 text-blue-600" />}
                bgColor="border-blue-500"
                size="large"
                onClick={() => navigateToZoneDetail()}
              />
              <KPICard
                title="Zone Distribution (L2)"
                value={currentMonthData.L2}
                unit="m³"
                change={getPercentChange(currentMonthData.L2, previousMonthData.L2)}
                icon={<BarChart2 className="h-5 w-5 text-teal-600" />}
                bgColor="border-teal-500"
                size="large"
                onClick={() => navigateToZoneDetail()}
              />
              <KPICard
                title="End User Consumption (L3)"
                value={currentMonthData.L3}
                unit="m³"
                change={getPercentChange(currentMonthData.L3, previousMonthData.L3)}
                icon={<Droplet className="h-5 w-5 text-green-600" />}
                bgColor="border-green-500"
                size="large"
                onClick={navigateToMeterList}
              />
            </div>

            {/* Hierarchical KPI Section - Tier 2 (Loss Metrics) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <KPICard
                title="Stage 01 Loss"
                value={Math.abs(currentMonthData.Stage01Loss)}
                unit="m³"
                change={getPercentChange(currentMonthData.Stage01Loss, previousMonthData.Stage01Loss)}
                icon={<AlertTriangle className="h-4 w-4 text-orange-600" />}
                bgColor="border-orange-400"
                size="medium"
              />
              <KPICard
                title="Stage 02 Loss"
                value={currentMonthData.Stage02Loss}
                unit="m³"
                change={getPercentChange(currentMonthData.Stage02Loss, previousMonthData.Stage02Loss)}
                icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
                bgColor="border-amber-400"
                size="medium"
              />
              <KPICard
                title="Total System Loss"
                value={currentMonthData.TotalLoss}
                unit="m³"
                change={getPercentChange(currentMonthData.TotalLoss, previousMonthData.TotalLoss)}
                icon={<AlertTriangle className="h-4 w-4 text-red-600" />}
                bgColor="border-red-400"
                size="medium"
              />
            </div>

            {/* Water Flow Chart with responsive labels */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-lg font-medium text-gray-800">
                  Water Flow Analysis - Last 6 Months
                </h2>

                {/* Chart controls */}
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <button
                    className="px-3 py-1.5 bg-gray-100 rounded-md flex items-center text-sm hover:bg-gray-200"
                    onClick={() => setActiveChartIndex((prev) => (prev + 1) % 2)}
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    <span>Toggle View</span>
                  </button>
                  <button
                    className="px-3 py-1.5 bg-gray-100 rounded-md flex items-center text-sm hover:bg-gray-200"
                    onClick={() => window.alert('Chart downloaded')}
                  >
                    <Download className="h-3.5 w-3.5 mr-1" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              <div style={{ height: getChartHeight }}>
                <ResponsiveContainer width="100%" height="100%">
                  {activeChartIndex === 0 ? (
                    <ComposedChart data={waterData.summary}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />

                      {/* Flow Lines with responsive labels */}
                      <Line
                        type="monotone"
                        dataKey="L1"
                        name="Total Supply (L1)"
                        stroke={BASE_COLOR}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        label={<ResponsiveLabel windowWidth={windowSize.width} />}
                      />
                      <Line
                        type="monotone"
                        dataKey="L2"
                        name="Zone Distribution (L2)"
                        stroke={SECONDARY_COLOR}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="L3"
                        name="End User (L3)"
                        stroke={ACCENT_COLOR}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />

                      {/* Loss Bar */}
                      <Bar
                        dataKey="TotalLoss"
                        name="Total Loss"
                        fill={DANGER_COLOR}
                        barSize={30}
                        label={<CustomBarLabel />}
                      />
                    </ComposedChart>
                  ) : (
                    <PieChart>
                      <Pie
                        activeIndex={hoveredZone}
                        activeShape={renderActiveShape}
                        data={zoneComparisonData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        onMouseEnter={(_, index) => setHoveredZone(index)}
                      >
                        {zoneComparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Zone Analysis Section */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Zone Analysis</h2>

                <div className="mt-2 sm:mt-0">
                  <ActionButton
                    icon={<ZoomIn className="h-4 w-4" />}
                    label="Zone Details"
                    onClick={navigateToZoneDetail}
                  />
                </div>
              </div>

              {/* Zone Selector */}
              <ZoneSelector
                zones={waterData.zones}
                selectedZone={selectedZone}
                onChange={setSelectedZone}
              />

              {selectedZoneData && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Zone Metrics Card */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      {selectedZoneData.name} Overview
                    </h3>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                        <div className="text-blue-500 text-sm font-medium mb-1">Bulk Meter</div>
                        <div className="text-2xl font-bold text-gray-800">
                          {selectedZoneData.bulkMeter.toLocaleString()} m³
                        </div>
                      </div>

                      <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                        <div className="text-green-500 text-sm font-medium mb-1">Individual</div>
                        <div className="text-2xl font-bold text-gray-800">
                          {selectedZoneData.individual.toLocaleString()} m³
                        </div>
                      </div>

                      <div className="rounded-lg bg-red-50 p-4 border border-red-200">
                        <div className="text-red-500 text-sm font-medium mb-1">Loss</div>
                        <div className="text-2xl font-bold text-gray-800">
                          {selectedZoneData.loss.toLocaleString()} m³
                        </div>
                      </div>
                    </div>

                    {/* Zone Efficiency */}
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600">Zone Efficiency</span>
                        <span className={`text-sm font-medium ${
                          selectedZoneData.efficiency > 85
                            ? 'text-green-500'
                            : selectedZoneData.efficiency > 70
                              ? 'text-amber-500'
                              : 'text-red-500'
                        }`}>
                          {selectedZoneData.efficiency.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            selectedZoneData.efficiency > 85
                              ? 'bg-green-500'
                              : selectedZoneData.efficiency > 70
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(selectedZoneData.efficiency, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action button to view meters */}
                    <button
                      onClick={navigateToMeterList}
                      className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-center text-sm font-medium text-gray-700"
                    >
                      <Table className="h-4 w-4 mr-1" />
                      View All Meters
                    </button>
                  </div>

                  {/* Meter table preview (top 5 meters) */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-800">
                        Top Meters
                      </h3>
                      <button
                        onClick={navigateToMeterList}
                        className="text-sm text-blue-500 hover:underline flex items-center"
                      >
                        View all
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Meter Label
                            </th>
                             <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Label
                            </th>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Consumption ({selectedMonth})
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {zoneMeterDetails.slice(0, 5).map((meter) => (
                            <tr
                              key={meter.id}
                              className="hover:bg-gray-50 cursor-pointer"
                              onClick={() => handleMeterSelect(meter)}
                            >
                              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{meter.name}</td>
                               <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{meter.label}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                  meter.type === 'Residential' ? 'bg-green-100 text-green-800' :
                                  meter.type === 'Retail' ? 'bg-blue-100 text-blue-800' :
                                  meter.type === 'IRR_Services' ? 'bg-purple-100 text-purple-800' :
                                   meter.type === 'MB_Common' ? 'bg-yellow-100 text-yellow-800' :
                                   meter.type === 'D_Building_Common' ? 'bg-orange-100 text-orange-800' :
                                   meter.type === 'Residential (Apart)' ? 'bg-pink-100 text-pink-800' :
                                   meter.type === 'Residential (Villa)' ? 'bg-indigo-100 text-indigo-800' :
                                    meter.type === 'Zone Bulk' ? 'bg-teal-100 text-teal-800' :
                                    meter.type === 'VS_Common' ? 'bg-lime-100 text-lime-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {meter.type}
                                </span>
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-right font-medium">
                                {meter.monthlyConsumption?.[selectedMonth]?.toLocaleString() || 0} m³
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Meter List View */}
        {currentView === 'meters' && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Meter Analysis</h2>

              <ActionButton
                icon={<Home className="h-4 w-4" />}
                label="Back to Overview"
                onClick={navigateToOverview}
                color="bg-gray-600"
              />
            </div>

            {/* Zone Selector */}
            <ZoneSelector
              zones={waterData.zones}
              selectedZone={selectedZone}
              onChange={setSelectedZone}
            />

            {/* Meter Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Total Meters</h4>
                <p className="text-2xl font-bold text-[#4E4456]">{zoneMeterDetails.length}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Average Consumption</h4>
                <p className="text-2xl font-bold text-[#4E4456]">
                  {(zoneMeterDetails.reduce((sum, meter) => sum + (meter.monthlyConsumption?.[selectedMonth] || 0), 0) / zoneMeterDetails.length).toFixed(1)} m³
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Highest Consumption</h4>
                <p className="text-2xl font-bold text-[#4E4456]">
                  {Math.max(...zoneMeterDetails.map(meter => meter.monthlyConsumption?.[selectedMonth] || 0))} m³
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Total Consumption</h4>
                <p className="text-2xl font-bold text-[#4E4456]">
                  {zoneMeterDetails.reduce((sum, meter) => sum + (meter.monthlyConsumption?.[selectedMonth] || 0), 0).toLocaleString()} m³
                </p>
              </div>
            </div>

            {/* Detailed meter table */}
            <DetailedMeterTable
              meters={zoneMeterDetails}
              title={`${selectedZoneData?.name || 'Zone'} Meters - ${selectedMonth}`}
              onRowClick={handleMeterSelect}
              selectedMonth={selectedMonth}
              allMonths={allMonths}
            />
          </div>
        )}

        {/* Meter Detail Modal */}
        {showMeterDetail && selectedMeter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-[#4E4456]">{selectedMeter.name}</h3>
                  <button
                    onClick={() => setShowMeterDetail(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Label</h4>
                    <p className="text-lg font-bold text-gray-800">{selectedMeter.label}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Meter Number</h4>
                    <p className="text-lg font-bold text-gray-800">{selectedMeter.meterNumber}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Type</h4>
                    <p className="text-lg font-bold text-gray-800">{selectedMeter.type}</p>
                  </div>
                   <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Parent Meter</h4>
                    <p className="text-lg font-bold text-gray-800">{selectedMeter.parentMeter}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Current Consumption ({selectedMonth})</h4>
                    <p className="text-lg font-bold text-gray-800">{selectedMeter.monthlyConsumption?.[selectedMonth]?.toLocaleString() || 0} m³</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Previous Consumption ({allMonths[allMonths.findIndex(month => month === selectedMonth) - 1] || 'N/A'})</h4>
                    <p className="text-lg font-bold text-gray-800">{selectedMeter.monthlyConsumption?.[allMonths[allMonths.findIndex(month => month === selectedMonth) - 1]]?.toLocaleString() || 0} m³</p>
                  </div>
                </div>

                {/* Monthly Consumption Trend Chart in Modal */}
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-[#4E4456] mb-4">Monthly Consumption Trend</h4>
                   <div style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={allMonths.map(month => ({ month, consumption: selectedMeter.monthlyConsumption?.[month] || 0 }))}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="month" />
                         <YAxis />
                         <Tooltip formatter={(value) => `${value.toLocaleString()} m³`} />
                         <Line type="monotone" dataKey="consumption" stroke={BASE_COLOR} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                      </LineChart>
                   </ResponsiveContainer>
                   </div>
                </div>


                <div className="flex justify-end">
                  <button
                    onClick={() => setShowMeterDetail(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuscatBayDashboard;