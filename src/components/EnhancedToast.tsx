import React from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

interface EnhancedToastProps {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: () => void;
  showProgress?: boolean;
}

export function EnhancedToast({
  type = "info",
  title,
  message,
  duration = 3000,
  onClose,
  showProgress = true
}: EnhancedToastProps) {
  const { isDarkMode } = useTheme();
  const [visible, setVisible] = React.useState(true);
  const [progress, setProgress] = React.useState(100);
  
  // Handle toast closing
  const handleClose = () => {
    setVisible(false);
    // Small delay to allow exit animation
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };
  
  // Handle progress bar animation
  React.useEffect(() => {
    if (!showProgress || duration <= 0) return;
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;
      
      setProgress(newProgress);
      
      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      } else {
        handleClose();
      }
    };
    
    const animationId = requestAnimationFrame(updateProgress);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [duration, showProgress]);
  
  // Get type-specific styles and icon
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: <CheckCircle className="h-5 w-5" />,
          bgColor: isDarkMode ? "bg-green-900/30" : "bg-green-50",
          borderColor: isDarkMode ? "border-green-800" : "border-green-200",
          textColor: isDarkMode ? "text-green-400" : "text-green-800",
          iconColor: isDarkMode ? "text-green-400" : "text-green-500",
          progressColor: isDarkMode ? "bg-green-700" : "bg-green-500"
        };
      case "error":
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          bgColor: isDarkMode ? "bg-red-900/30" : "bg-red-50",
          borderColor: isDarkMode ? "border-red-800" : "border-red-200",
          textColor: isDarkMode ? "text-red-400" : "text-red-800",
          iconColor: isDarkMode ? "text-red-400" : "text-red-500",
          progressColor: isDarkMode ? "bg-red-700" : "bg-red-500"
        };
      case "warning":
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          bgColor: isDarkMode ? "bg-amber-900/30" : "bg-amber-50",
          borderColor: isDarkMode ? "border-amber-800" : "border-amber-200",
          textColor: isDarkMode ? "text-amber-400" : "text-amber-800",
          iconColor: isDarkMode ? "text-amber-400" : "text-amber-500",
          progressColor: isDarkMode ? "bg-amber-700" : "bg-amber-500"
        };
      case "info":
      default:
        return {
          icon: <Info className="h-5 w-5" />,
          bgColor: isDarkMode ? "bg-blue-900/30" : "bg-blue-50",
          borderColor: isDarkMode ? "border-blue-800" : "border-blue-200",
          textColor: isDarkMode ? "text-blue-400" : "text-blue-800",
          iconColor: isDarkMode ? "text-blue-400" : "text-blue-500",
          progressColor: isDarkMode ? "bg-blue-700" : "bg-blue-500"
        };
    }
  };
  
  const styles = getTypeStyles();
  
  if (!visible) return null;
  
  return (
    <div 
      className={cn(
        "fixed top-4 right-4 max-w-sm w-full z-50",
        "transform transition-all duration-300 ease-in-out",
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className={cn(
        "rounded-lg shadow-md border p-4",
        styles.bgColor,
        styles.borderColor
      )}>
        <div className="flex items-start">
          <div className={cn("flex-shrink-0", styles.iconColor)}>
            {styles.icon}
          </div>
          
          <div className="ml-3 flex-1">
            <p className={cn("font-medium", styles.textColor)}>
              {title}
            </p>
            {message && (
              <p className={cn("mt-1 text-sm", 
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                {message}
              </p>
            )}
          </div>
          
          <button
            type="button"
            className={cn(
              "flex-shrink-0 ml-4 p-1 rounded-full",
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200",
              isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
            )}
            onClick={handleClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {showProgress && (
          <div className="h-1 mt-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full", styles.progressColor)}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}