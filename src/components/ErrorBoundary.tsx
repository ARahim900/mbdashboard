import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useTheme } from "@/lib/theme-context";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallbackComponent?: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

const DefaultErrorFallback = ({ 
  error, 
  resetError 
}: { 
  error: Error | null; 
  resetError: () => void;
}) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`error-container p-4 rounded-lg shadow-md ${
      isDarkMode 
        ? 'bg-red-900/20 border border-red-800' 
        : 'bg-red-50 border border-red-200'
    }`}>
      <div className="flex items-start">
        <AlertCircle className={`h-5 w-5 mr-2 flex-shrink-0 ${
          isDarkMode ? 'text-red-400' : 'text-red-600'
        }`} />
        <div>
          <h2 className={`font-medium ${
            isDarkMode ? 'text-red-400' : 'text-red-600'
          }`}>
            Something went wrong
          </h2>
          {error && (
            <p className={`mt-1 text-sm ${
              isDarkMode ? 'text-red-300' : 'text-red-500'
            }`}>
              {error.message}
            </p>
          )}
          <button 
            className={`mt-3 px-3 py-1.5 rounded flex items-center text-sm font-medium ${
              isDarkMode 
                ? 'bg-red-800/50 text-red-200 hover:bg-red-800/70' 
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
            onClick={resetError}
            aria-label="Retry"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { 
    hasError: false, 
    error: null,
    errorInfo: null 
  };
  
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    // Log the error
    console.error("Component error:", error, errorInfo);
    
    // Here you could send to an error tracking service like Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
    // }
  }
  
  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    
    // Call custom reset handler if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };
  
  render() {
    const { children, fallbackComponent } = this.props;
    const { hasError, error } = this.state;
    
    if (hasError) {
      // Use custom fallback if provided, otherwise use default
      if (fallbackComponent) {
        return fallbackComponent;
      }
      
      return <DefaultErrorFallback error={error} resetError={this.resetError} />;
    }
    
    return children;
  }
}