import { useMediaQuery } from "@/hooks/use-media-query";

// Utility for formatting chart data in a mobile-friendly way
export const useChartFormatter = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  
  // Format text for legends and labels based on screen size
  const formatText = (text: string, maxLength?: number) => {
    if (!text) return "";
    
    const limit = maxLength || (isMobile ? 10 : isTablet ? 15 : 30);
    
    if (text.length > limit) {
      return `${text.substring(0, limit - 3)}...`;
    }
    
    return text;
  };
  
  // Format numbers for better display on small screens
  const formatNumber = (value: number) => {
    if (typeof value !== "number") return value;
    
    if (isMobile) {
      // More compact for mobile
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
      return value.toLocaleString();
    }
    
    // More detailed for larger screens
    return value.toLocaleString();
  };
  
  // Reduce dataset size for mobile
  const optimizeDataForMobile = <T extends Record<string, any>>(
    data: T[],
    maxPoints: number = 5
  ): T[] => {
    if (!isMobile || !Array.isArray(data) || data.length <= maxPoints) {
      return data;
    }
    
    // Keep first, last, and evenly sample the rest
    const step = Math.max(1, Math.floor(data.length / maxPoints));
    const result: T[] = [];
    
    for (let i = 0; i < data.length; i += step) {
      result.push(data[i]);
    }
    
    // Always include the last data point if it's not already included
    if (result[result.length - 1] !== data[data.length - 1]) {
      result.push(data[data.length - 1]);
    }
    
    return result;
  };
  
  // Get appropriate sizes for chart elements based on screen size
  const getChartSizes = () => {
    return {
      fontSize: isMobile ? 10 : 12,
      iconSize: isMobile ? 8 : 10,
      dotRadius: isMobile ? 3 : 4,
      strokeWidth: isMobile ? 2 : 2.5,
      barSize: isMobile ? 20 : isTablet ? 30 : 40,
      pieRadius: isMobile ? 70 : 90,
      padding: isMobile ? { top: 5, right: 5, left: 0, bottom: 5 } : 
                isTablet ? { top: 10, right: 10, left: 5, bottom: 10 } : 
                { top: 10, right: 20, left: 10, bottom: 10 }
    };
  };
  
  return {
    formatText,
    formatNumber,
    optimizeDataForMobile,
    getChartSizes,
    isMobile,
    isTablet
  };
};