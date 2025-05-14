import React, { createContext, useContext, useState, useEffect } from 'react';
import { applyTheme } from '@/lib/colors';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

// Create context with default values
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Custom hook for accessing theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if dark mode is stored in localStorage, or use system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('darkMode');
    
    if (storedValue !== null) {
      return storedValue === 'true';
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    localStorage.setItem('darkMode', String(newValue));
  };
  
  // Apply theme when dark mode changes
  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode]);
  
  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only apply if user hasn't explicitly set a preference
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches);
      }
    };
    
    // Add listener for system preference changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    // Fallback for older browsers
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};