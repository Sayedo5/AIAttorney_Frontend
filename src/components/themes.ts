// Theme definitions matching React Native structure
export const colors = {
  primary: 'hsl(160 81% 30%)',
  primaryLight: 'hsl(160 60% 95%)',
  primaryGlow: 'hsl(160 81% 40%)',
  
  background: 'hsl(0 0% 100%)',
  backgroundSecondary: 'hsl(160 20% 98%)',
  foreground: 'hsl(220 20% 15%)',
  
  card: 'hsl(0 0% 100%)',
  cardForeground: 'hsl(220 20% 15%)',
  
  muted: 'hsl(160 10% 96%)',
  mutedForeground: 'hsl(220 10% 50%)',
  
  border: 'hsl(160 15% 90%)',
  input: 'hsl(160 15% 92%)',
  
  destructive: 'hsl(0 84% 60%)',
  success: 'hsl(142 76% 36%)',
  warning: 'hsl(38 92% 50%)',
  info: 'hsl(199 89% 48%)',
  
  // Status colors
  pending: 'hsl(38 92% 50%)',
  ongoing: 'hsl(199 89% 48%)',
  decided: 'hsl(142 76% 36%)',
  disposed: 'hsl(220 10% 50%)',
};

export const darkColors = {
  primary: 'hsl(160 70% 45%)',
  primaryLight: 'hsl(160 30% 15%)',
  primaryGlow: 'hsl(160 70% 50%)',
  
  background: 'hsl(220 25% 10%)',
  backgroundSecondary: 'hsl(220 22% 12%)',
  foreground: 'hsl(0 0% 95%)',
  
  card: 'hsl(220 22% 14%)',
  cardForeground: 'hsl(0 0% 95%)',
  
  muted: 'hsl(220 18% 18%)',
  mutedForeground: 'hsl(220 10% 55%)',
  
  border: 'hsl(220 15% 22%)',
  input: 'hsl(220 18% 18%)',
  
  destructive: 'hsl(0 62% 50%)',
  success: 'hsl(142 70% 40%)',
  warning: 'hsl(38 90% 55%)',
  info: 'hsl(199 85% 55%)',
  
  pending: 'hsl(38 90% 55%)',
  ongoing: 'hsl(199 85% 55%)',
  decided: 'hsl(142 70% 40%)',
  disposed: 'hsl(220 10% 55%)',
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
};

export const borderRadius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
};

export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
};

export const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

export type ThemeColors = typeof colors;
export type Theme = 'light' | 'dark';
