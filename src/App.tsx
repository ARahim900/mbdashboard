import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme-context";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";

// Lazy load other pages for better performance
const WaterSystem = lazy(() => import("./pages/WaterSystem"));
const ElectricitySystem = lazy(() => import("./pages/ElectricitySystem"));
const StpPlant = lazy(() => import("./pages/StpPlant"));
const ContractorTracker = lazy(() => import("./pages/ContractorTracker"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component for suspense fallback
const LoadingPage = () => (
  <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Create query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/water" element={
                <Suspense fallback={<LoadingPage />}>
                  <WaterSystem />
                </Suspense>
              } />
              <Route path="/electricity" element={
                <Suspense fallback={<LoadingPage />}>
                  <ElectricitySystem />
                </Suspense>
              } />
              <Route path="/stp" element={
                <Suspense fallback={<LoadingPage />}>
                  <StpPlant />
                </Suspense>
              } />
              <Route path="/contractor" element={
                <Suspense fallback={<LoadingPage />}>
                  <ContractorTracker />
                </Suspense>
              } />
              <Route path="*" element={
                <Suspense fallback={<LoadingPage />}>
                  <NotFound />
                </Suspense>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ErrorBoundary>
);

export default App;