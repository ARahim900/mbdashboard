import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Component error:", error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      return this.props.fallback || (
        <div className="p-4 animate-in fade-in duration-300">
          <Alert variant="destructive" className="border-red-200 dark:border-red-900">
            <AlertTitle className="text-red-600 dark:text-red-400 font-medium">
              Something went wrong
            </AlertTitle>
            <AlertDescription className="mt-2 text-sm text-red-600/90 dark:text-red-400/90">
              <p>There was an error rendering this component.</p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-2 text-xs">
                  <summary className="cursor-pointer">Error details</summary>
                  <pre className="mt-2 whitespace-pre-wrap text-xs overflow-auto max-h-[300px] p-2 bg-red-50 dark:bg-red-900/10 rounded">
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </AlertDescription>
            <Button 
              onClick={this.resetErrorBoundary}
              className="mt-3 bg-red-100 hover:bg-red-200 text-red-700 border-none flex items-center gap-2"
              size="sm"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Try again</span>
            </Button>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}