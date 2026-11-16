/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#171717', // Charcoal
        graphite: '#303030',
        paper: '#F4F0E9', // Warm Ivory
        surface: '#FFFFFF',
        accent: '#B69A70', // Champagne Gold
        // Darker gold for small text on ivory (WCAG AA).
        'accent-deep': '#7E6540',
        muted: '#77736D', // Architectural Grey — large text and decoration only on ivory
        'muted-strong': '#5E5A55', // Architectural Grey, darkened for small text (WCAG AA)
        line: '#E3DDD2',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: { technical: '0.18em' },
      maxWidth: { page: '1440px' },
    },
  },
  plugins: [],
};
