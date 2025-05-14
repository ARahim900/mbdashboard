// Color Palette for the dashboard
export const COLORS = {
  primary: '#4E4456', // Main purple
  primaryLight: '#F4F2F5', // Lighter shade for backgrounds/hovers
  primaryDark: '#3A3340',  // Darker shade for text/active states
  accentYellow: '#FBBF24', // Yellow for electricity
  accentGreen: '#10B981',  // Green for STP/success
  accentRed: '#F87171',    // Red for negative trends
  textLight: '#E5E7EB',    // Light text for dark backgrounds
  textDark: '#374151',     // Dark text for light backgrounds
  textMuted: '#6B7280',    // Muted text
  borderLight: '#E5E7EB',  // Light border color
  borderDark: '#4B5563',   // Dark border color
  bgDark: '#111827',       // Slightly darker than gray-900 for main bg
  bgDarkElevated: '#1F2937', // gray-800 for elevated surfaces like cards/modals
  bgDarkSidebar: '#4E4456', // Fixed sidebar color regardless of theme
};

// CSS variable generator for consistent theming
export const generateCssVariables = (isDark = false) => {
  return {
    '--color-primary': COLORS.primary,
    '--color-primary-light': isDark ? COLORS.primaryDark : COLORS.primaryLight,
    '--color-primary-dark': COLORS.primaryDark,
    '--color-accent-yellow': COLORS.accentYellow,
    '--color-accent-green': COLORS.accentGreen,
    '--color-accent-red': COLORS.accentRed,
    '--color-text': isDark ? COLORS.textLight : COLORS.textDark,
    '--color-text-muted': COLORS.textMuted,
    '--color-border': isDark ? COLORS.borderDark : COLORS.borderLight,
    '--color-bg': isDark ? COLORS.bgDark : 'white',
    '--color-bg-elevated': isDark ? COLORS.bgDarkElevated : 'white',
    '--color-bg-sidebar': COLORS.primary, // Always use primary color for sidebar
    '--color-card-shadow': isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)',
  };
};

// Apply theme to document root
export const applyTheme = (isDark = false) => {
  const theme = generateCssVariables(isDark);
  const root = document.documentElement;
  
  // Apply each CSS variable to the root element
  Object.entries(theme).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Toggle dark class
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};