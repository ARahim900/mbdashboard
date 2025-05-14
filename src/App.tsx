import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme, ThemeContext } from "@/lib/theme-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Loader2 } from "lucide-react";
import Index from "./pages/Index";

// Lazy load other pages for better performance
const WaterSystem = lazy(() => import("./pages/WaterSystem"));
const ElectricitySystem = lazy(() => import("./pages/ElectricitySystem"));
const StpPlant = lazy(() => import("./pages/StpPlant"));
const ContractorTracker = lazy(() => import("./pages/ContractorTracker"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Enhanced loading component with subtle animation
const LoadingPage = () => {
  // Using direct context for initial loading since useTheme hook might not be available yet
  const context = React.useContext(ThemeContext);
  const isDarkMode = context?.isDarkMode || false;
  
  return (
    <div className={`flex flex-col items-center justify-center h-screen ${
      isDarkMode ? 'bg-[#111827] text-white' : 'bg-white text-gray-800'
    }`}>
      <Loader2 className="h-12 w-12 animate-spin text-[#4E4456]" aria-hidden="true" />
      <p className="mt-4 font-medium">Loading...</p>
    </div>
  );
};

// Route-level error boundary component
const RouteErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  // Use location to get current route information for better error context
  const location = useLocation();
  
  return (
    <ErrorBoundary 
      onReset={() => {
        // You could redirect to home or reload the page on error
        window.location.href = '/';
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

// Create query client with optimized options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnMount: 'always',
      suspense: false, // Don't use React Suspense for data fetching
    },
  },
});

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={
        <RouteErrorBoundary>
          <Index />
        </RouteErrorBoundary>
      } />
      <Route path="/water" element={
        <RouteErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <WaterSystem />
          </Suspense>
        </RouteErrorBoundary>
      } />
      <Route path="/electricity" element={
        <RouteErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <ElectricitySystem />
          </Suspense>
        </RouteErrorBoundary>
      } />
      <Route path="/stp" element={
        <RouteErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <StpPlant />
          </Suspense>
        </RouteErrorBoundary>
      } />
      <Route path="/contractor" element={
        <RouteErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <ContractorTracker />
          </Suspense>
        </RouteErrorBoundary>
      } />
      <Route path="*" element={
        <RouteErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            <NotFound />
          </Suspense>
        </RouteErrorBoundary>
      } />
    </Routes>
  );
};

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;