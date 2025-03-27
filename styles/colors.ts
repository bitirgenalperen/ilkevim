/**
 * Application Color Palette and Gradients
 * 
 * This file contains centralized color definitions for the entire application.
 * Import these values when styling components instead of hardcoding colors.
 */

// Primary color palette
export const colors = {
  // Teal colors
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    900: '#134e4a',
    950: '#042f2e',
  },
  
  // Emerald colors
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
  },
  
  // Slate colors for text and backgrounds
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Gray colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // White and black
  white: '#ffffff',
  black: '#000000',
};

// Gradients
export const gradients = {
  // Background gradients
  background: {
    primary: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    page: 'bg-gradient-to-b from-gray-50 via-white to-gray-50/50',
    tealLight: 'bg-gradient-to-b from-teal-50 to-white',
    tealEmerald: 'bg-gradient-to-br from-teal-50 to-emerald-50',
  },
  
  // Text gradients (use with bg-clip-text text-transparent)
  text: {
    tealEmerald: 'bg-gradient-to-r from-teal-600 to-emerald-600',
    white: 'bg-gradient-to-r from-white to-gray-300',
    teal: 'bg-gradient-to-r from-teal-600 to-teal-500',
  },
  
  // Button gradients
  button: {
    tealEmerald: 'bg-gradient-to-r from-teal-600 to-emerald-600',
    tealEmeraldHover: 'hover:from-teal-700 hover:to-emerald-700',
  },
  
  // Card and icon gradients
  card: {
    teal: 'from-teal-500 to-teal-400',
    tealDark: 'from-teal-600 to-teal-500',
    tealEmerald: 'from-teal-500 to-emerald-400',
    emeraldTeal: 'from-emerald-500 to-teal-400',
  },
};

// Common UI element color combinations
export const ui = {
  // Buttons
  button: {
    primary: {
      base: 'bg-teal-600 text-white',
      hover: 'hover:bg-teal-700',
    },
    outline: {
      base: 'border-teal-200 text-teal-700',
      hover: 'hover:bg-teal-50 hover:border-teal-300',
    },
  },
  
  // Text colors
  text: {
    primary: 'text-teal-600',
    hover: 'hover:text-teal-700',
    dark: 'text-teal-900',
    light: 'text-teal-700',
    body: 'text-slate-600',
    heading: 'text-teal-950',
  },
  
  // Badges
  badge: {
    primary: {
      base: 'bg-teal-500 text-white',
      hover: 'hover:bg-teal-600',
    },
    outline: {
      base: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    tag: {
      base: 'bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20',
    },
  },
  
  // Active states
  active: {
    tab: 'bg-teal-50 text-teal-700',
    menu: 'bg-white text-teal-600',
  },
};

// Form element colors
export const form = {
  focus: 'focus:border-teal-500 focus:ring-teal-500',
  switch: 'data-[state=checked]:bg-teal-600',
  checkbox: 'data-[state=checked]:bg-teal-600',
};

// Border colors
export const borders = {
  light: 'border-teal-100',
  medium: 'border-teal-200',
}; 